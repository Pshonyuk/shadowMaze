const EventsController = require("../libs/EventsController"),
	MouseTRap = require("mousetrap"),
	Howl = require("howler");


class Game {

}


class Runner {
	static get defaults() {
		return {
			el: null
		}
	}


	constructor(params, projectManajer) {
		this._params = Object.assign({}, Runner.defaults, params);
		this.projectManager = projectManajer;

		this._attachEvents();
	}

	get el() {
		return this._params.el;
	}

	_attachEvents() {
		this._ec = new EventsController();
		return this;
	}

	_runGame() {
		this._game = new Game();
		return this;
	}

	destroy() {
		this._ec.destroy();
		return null;
	}
}


module.exports = Runner;