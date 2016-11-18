const fs = nodeRequire("fs"),
	path = nodeRequire("path"),
	traverse = nodeRequire("traverse"),
	privateQueryKey = {};


class ProjectManager {
	static get defaults(){
		return {
			workPath: "./game",
			sourceDirName: "source",
			entryPoint: "data.json",
			modules: null
		}
	}

	static query(key, ...args){
		function func () {
			return typeof this[key] === "function" ? this[key].apply(this, args) : this[key];
		}
		func._queryKey = privateQueryKey;
		return func;
	}


	constructor(params = {}){
		this._params = Object.assign({}, ProjectManager.defaults, params);
		this.modules = new Map();
		this._activeLevel = null;
		this._prepareFileSystem();
	}

	get workPath(){
		return path.resolve(this._params.workPath);
	}

	get sourcePath(){
		return path.join(this.workPath, this._params.sourceDirName);
	}

	get entryPoint(){
		return path.join(this.workPath, this._params.entryPoint);
	}

	get paramsModules(){
		return this._params.modules || [];
	}

	get gameData(){
		return this._gameData;
	}

	get levels(){
		return this.gameData.levels;
	}

	set levels(lvs){
		this.gameData.levels = lvs.slice(0).filter((v, i, s) => s.indexOf(v) === i);
		this._updateGameData();
	}

	get activeLevel(){
		return this._activeLevel;
	}

	set activeLevel(val){
		this._activeLevel = val;
		const ev = new Event("update-active-level", { bubbles: true });
		ev.activeLevel = this.activeLevel;
		document.dispatchEvent(ev);
	}

	_execQueries(){
		const self = this;

		traverse(this.paramsModules).forEach(function (item) {
			if(typeof item === "function" && item._queryKey === privateQueryKey){
				this.update(item.call(self));
			}
		});
		return this;
	}

	_prepareFileSystem() {
		const workPath = this.workPath,
			sourcePath = this.sourcePath;

		if(!fs.existsSync(workPath)) {
			fs.mkdirSync(workPath);
		}

		if(!fs.existsSync(sourcePath)){
			fs.mkdirSync(sourcePath);
		}

		this._readGameData(() => {
			this._loadModules();
		});

		return this;
	}

	_updateGameData(){
		const ev = new Event("update-game-data", { bubbles: true });
		ev.gameData = Object.assign({}, this.gameData);
		document.dispatchEvent(ev);
		this._writeGameData();
		return this;
	}

	_readGameData(cb){
		fs.readFile(this.entryPoint, (err, data) => {
			const createException = (err) => {
				console.error(err);
				this._gameData = { levels: [] };
				this._writeGameData();
				if(cb) cb.call(this, err);
			};

			if(err) {
				createException(err);
				return;
			}

			try {
				this._gameData = JSON.parse(data);
				if(cb) cb.call(this, null);
			} catch (e) {
				createException(e);
			}
		});
		return this;
	}

	_writeGameData(cb){
		fs.writeFile(this.entryPoint, JSON.stringify(this.gameData), (err) => {
			if(err) console.error(err);
			if(cb) cb.call(this, err);
		});
		return this;
	}

	_loadModules(){
		const paramsModules = this.paramsModules;
		this._execQueries();

		for(let paramsModule of paramsModules){
			this.modules.set(paramsModule.name, new paramsModule.module(Object.assign({}, paramsModule.params), this));
		}
		return this;
	}
}


Object.assign(ProjectManager, {

});


module.exports = ProjectManager;