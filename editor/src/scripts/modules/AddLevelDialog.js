const EventsController = require("../libs/EventsController"),
	path = nodeRequire("path"),
	fs = nodeRequire("fs"),
	vex = window.vex;


class AddLevelDialog {
	static get defaults(){
		return {
			button: null,
			workPath: null
		}
	}

	static getModalContent(){
		return `
		<input name="levelName" type="text" placeholder="Name" required/>
		<input name="levelSize" type="text" placeholder="Size"/>
		`
	}


	constructor(params, projectManager){
		this._params = Object.assign({}, AddLevelDialog.defaults, params);
		this.projectManager = projectManager;
		this._attachEvents();
	}

	get button(){
		return this._params.button;
	}

	get workPath(){
		return this._params.workPath;
	}

	_attachEvents(){
		const ec = this._ec = new EventsController();

		this._onClick = this._onClick.bind(this);
		ec.add(this.button, "click", this._onClick);
		return this;
	}

	_onClick(){
		const self = this;
		vex.dialog.buttons.YES.text = "Add";
		this._dialog = vex.dialog.open({
			input: AddLevelDialog.getModalContent(),
			callback: function (data) {
				if(data) self._createLevel(data);
			}
		})
	}

	_createLevel(data){
		if(!data || !data.levelName) return this;
		const name = ("" + data.levelName).trim().toLowerCase(),
			size = +data.levelSize || AddLevelDialog.defaultLevelSize;
		let levels = this.projectManager.levels;

		if(name && levels.indexOf(name) === -1){
			const levelData = { data: new Array(size) };
			fs.writeFile(path.join(this.workPath, `${name}.json`), JSON.stringify(levelData), (err) => {
				if(err){
					console.error(err);
					return;
				}
				levels.push(name);
				this.projectManager.levels = levels;
			});

		}
		return this;
	}

	destroy(){
		if(this._dialog) this._dialog.close();
		this._ec.destroy();
		return null;
	}
}


Object.assign(AddLevelDialog, {
	defaultLevelSize: 25
});


module.exports = AddLevelDialog;