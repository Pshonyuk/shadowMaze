const EventsController = require("../libs/EventsController");


class AddLevelDialog {
	static get defaults(){
		return {
			button: null
		}
	}

	static getModalContent(){
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

		return this;
	}

	_attachEvents(){
		const ec = this._ec = new EventsController();

		this._onClick = this._onClick.bind(this);
		ec.add(this.button, "click", this._onClick);
		return this;
	}

	_onClick(){
		vex.dialog.open({
			message: 'What planet did the aliens come from?',
			input: [
				'<input name="username" type="text" placeholder="Username" required />',
				'<input name="password" type="password" placeholder="Password" required />'
			].join(''),
			callback: function (value) {
				console.log(value)
			}
		})
	}

	destroy(){
		this._ec.destroy();
		this._modal.destroy();
		return null;
	}
}


module.exports = AddLevelDialog;