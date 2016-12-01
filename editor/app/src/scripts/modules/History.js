const Mousetrap = require("mousetrap"),
	deepcopy = require("deepcopy"),
	EventsController = require("../libs/EventsController");


class History {
	static get defaults() {
		return {
			undoEl: null,
			redoEl: null
		}
	}

	constructor(params, projectManager) {
		this._params = Object.assign({}, History.defaults, params);
		this.projectManager = projectManager;
		this.undo = this.undo.bind(this);
		this.redo = this.redo.bind(this);
		this._onPopState = this._onPopState.bind(this);

		this._attachEvents();
	}

	get undoEl() {
		return this._params.undoEl;
	}

	get redoEl() {
		return this._params.redoEl;
	}

	undo() {
		window.history.back();
		return this;
	}

	redo() {
		window.history.forward();
		return this;
	}

	clear() {
		window.location.reload(true);
		return this;
	}

	_pushState(action) {
		return () => {
			if(this._freeze) return;
			window.history.pushState({
				action,
				data: deepcopy(this.projectManager[action])
			}, null);
		}
	}

	_attachEvents() {
		const ec = this._ec = new EventsController();

		ec.add(this.undoEl, "click", this.undo);
		ec.add(this.redoEl, "click", this.redo);
		ec.add(window, "popstate", this._onPopState);
		ec.add(window, "update-active-level", this._pushState("activeLevel"));
		ec.add(window, "update-active-level-data", this._pushState("activeLevelData"));
		ec.add(window, "update-game-data", this._pushState("gameData"));

		Mousetrap.bind(["ctrl+z"], this.undo);
		Mousetrap.bind(["ctrl+y"], this.redo);
		return this;
	}

	_onPopState(e) {
		const state = e.state,
			action = state && state.action;

		this._freeze = true;
		switch(action) {
			case "activeLevel":
				this.projectManager.activeLevel = state.data;
				break;

			case "activeLevelData":
				this.projectManager._updateActiveLevelData(state.data);
				break;

			case "gameData":
				this.projectManager._updateGameData(state.data);
				break;
		}

		this._freeze = false;
	}

	destroy() {
		this._ec.destroy();
		Mousetrap.unbind(["ctrl+z", "ctrl+y"]);
		this.clear();
		return null;
	}
}



module.exports = History;