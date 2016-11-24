const fs = nodeRequire("fs"),
	path = nodeRequire("path"),
	traverse = nodeRequire("traverse");


class ProjectManager {
	static get defaults(){
		return {
			workPath: "./game",
			sourceDirName: "source",
			entryPoint: "data.json",
			modules: null
		}
	}


	constructor(params = {}){
		this._params = Object.assign({}, ProjectManager.defaults, params);
		this.modules = new Map();
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
		let gameData = Object.assign({}, this.gameData),
			activeLevel = this.activeLevel;
		gameData.levels = lvs.slice(0).filter((v, i, s) => s.indexOf(v) === i);
		this._updateGameData(gameData);

		if(activeLevel && this.levels.indexOf(activeLevel) === -1){
			this.activeLevel = null;
		}
	}

	get activeLevel(){
		return this._activeLevel;
	}

	set activeLevel(val){
		this._activeLevel = val;
		const ev = new Event("update-active-level", { bubbles: true });
		ev.activeLevel = this.activeLevel;
		document.dispatchEvent(ev);
		this._readLevelData(this._updateActiveLevelData.bind(this));
	}

	get activeLevelData(){
		return this._activeLevelData;
	}

	get levelFilePath(){
		let level = this.activeLevel;
		if(level){
			return path.resolve(path.join(this.workPath, level + ".json"));
		}
		return null;
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
			this.activeLevel = null;
		});

		return this;
	}

	_updateGameData(data){
		this._gameData = data;
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

	_updateActiveLevelData(data){
		this._activeLevelData = data;
		const ev = new Event("update-active-level-data", { bubbles: true });
		ev.activeLevelData = Object.assign({}, this.activeLevelData);
		document.dispatchEvent(ev);
		this._writeLevelData();
		return this;
	}

	_readLevelData(cb){
		const levelFilePath = this.levelFilePath;
		if(!levelFilePath) return typeof cb === "function" && cb(null);

		fs.readFile(levelFilePath, (err, data) => {
			function createException(err) {
				console.error(err);
				if( typeof  cb === "function") cb(null);
				return err;
			}

			if(err) return createException(err);

			try{
				data = JSON.parse(data);
				if(typeof cb === "function") cb(data);
			} catch (err){
				createException(err);
			}
		});
	}

	_writeLevelData(){
		const levelFilePath = this.levelFilePath;
		if(!levelFilePath) return;

		fs.writeFile(levelFilePath, JSON.stringify(this.activeLevelData), (err) => {
			if(err) console.error(err);
		});
	}

	_loadModules(){
		const paramsModules = this.paramsModules;

		for(let paramsModule of paramsModules){
			this.modules.set(paramsModule.name, new paramsModule.module(Object.assign({}, paramsModule.params), this));
		}
		return this;
	}
}


Object.assign(ProjectManager, {

});


module.exports = ProjectManager;