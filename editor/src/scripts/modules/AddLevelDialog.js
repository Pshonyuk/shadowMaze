const EventsController = require("../libs/EventsController");
let uid = 0;


class AddLevelDialog {
	static get defaults(){
		return {
			button: null
		}
	}

	static getModalTemplate(id){
		return `

		`
	}


	constructor(params){
		this._params = Object.assign({}, AddLevelDialog.defaults, params);
		this
			._createModal()
			._attachEvents();
	}

	get button(){
		return this._params.button;
	}

	_createModal(){
		const modalId = "add-level-dialog-" + uid++;

		document.body.insertAdjacentHTML("beforeend", AddLevelDialog.getModalTemplate(modalId));
		this._modal = document.getElementById(modalId);
		return this;
	}

	_attachEvents(){
		const ec = this._ec = new EventsController();

		this._onClick = this._onClick.bind(this);
		ec.add(this.button, "click", this._onClick);
		return this;
	}

	_onClick(){

	}

	destroy(){
		this._ec.destroy();
		return null;
	}
}


module.exports = AddLevelDialog;