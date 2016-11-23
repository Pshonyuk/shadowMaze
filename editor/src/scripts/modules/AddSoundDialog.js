const EventsController = require("../libs/EventsController"),
	helper = require("../libs/helper"),
	path = nodeRequire("path");


class AddSoundDialog {
	static get defaults(){
		return {
			fileInput: null,
			button: null
		}
	}


	constructor(params, projectManager){
		this._params = Object.assign({}, AddSoundDialog.defaults, params);
		this.projectManager = projectManager;
		this._attachEvents();
	}

	get sourcePath(){
		return this.projectManager.sourcePath;
	}

	get fileInput(){
		return this._params.fileInput;
	}

	get button(){
		return this._params.button;
	}

	_attachEvents(){
		const ec = this._ec = new EventsController();

		this._onClick = this._onClick.bind(this);
		this._onChange = this._onChange.bind(this);

		ec.add(this.button, "click", this._onClick);
		ec.add(this.fileInput, "change", this._onChange);
		return this;
	}

	_onClick(){
		const ev = new MouseEvent("click");
		this.fileInput.dispatchEvent(ev);
	}

	_onChange(){
		const fileInput = this.fileInput,
			files = fileInput.files,
			types = fileInput.getAttribute("accept").split(","),
			sourcePath = this.sourcePath;

		for(let file of files){
			if(types.indexOf(file.type)){
				helper.copyFile(file.path, path.join(sourcePath, file.name), (err) => {
					if(err) console.error(err);
				});
			}
		}
	}

	destroy(){
		this._ec.destroy();
		return null;
	}
}


module.exports = AddSoundDialog;