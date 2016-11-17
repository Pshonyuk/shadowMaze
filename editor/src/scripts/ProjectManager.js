const fs = nodeRequire("fs"),
	path = nodeRequire("path"),
	traverse = nodeRequire("traverse"),
	privateQueryKey = {};


class ProjectManager {
	static get defaults(){
		return {
			workPath: "./game",
			sourceDirName: "source",
			entryPoint: "data.js",
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

		this
			._prepareFileSystem()
			._loadModules();
	}

	get workPath(){
		return this._params.workPath;
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
			sourcePath = this.sourcePath,
			entryPoint = this.entryPoint;

		if(!fs.existsSync(workPath)) {
			fs.mkdirSync(workPath);
		}

		if(!fs.existsSync(sourcePath)){
			fs.mkdirSync(sourcePath);
		}

		if(!fs.existsSync(entryPoint)){
			this._createEntryPoint();
		} else {
			this._updateGameData();
		}

		return this;
	}

	_createEntryPoint(){
		fs.writeFile(this.entryPoint, JSON.stringify({levels: []}), (err) => {
			if(err) {
				console.error(err);
				return;
			}

			this._updateGameData();
		});

		return this;
	}

	_updateGameData(){
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