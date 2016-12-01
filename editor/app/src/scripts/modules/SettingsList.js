const EventsController = require("../libs/EventsController");


class SettingsList {
	static get defaults() {
		return {
			listContainer: null
		}
	}


	constructor(params, projectManager) {
		this._params = Object.assign({}, SettingsList.defaults, params);
		this.projectManager = projectManager;

		this._attachEvents();
	}

	get listContainer() {
		return this._params.listContainer;
	}

	_attachEvents() {
		const ec = this._ec = new EventsController();

		this._onActiveLevel = this._onActiveLevel.bind(this);
		this._onSelectCell = this._onSelectCell.bind(this);

		ec.add(window, "update-active-level", this._onActiveLevel);
		ec.add(window, "editor-select-cell", this._onSelectCell);
		return this;
	}

	_onSelectCell(e){
		const hidden = "" + !e.cellData,
			cellSettingsItem = this.listContainer.querySelector("[data-settings='cell']");

		cellSettingsItem.setAttribute("data-hidden", hidden);
	}

	_onActiveLevel() {
		const hidden = "" + !this.projectManager.activeLevel,
			items = this.listContainer.children;

		for(let item of items) {
			item.setAttribute("data-hidden", hidden);
		}
	}

	destroy() {
		this._ec.destroy();
		return null;
	}
}


module.exports = SettingsList;