const EventsController = require("../libs/EventsController");


class LevelsList {
	static get defaults(){
		return {
			levels: null,
			listContainer: null
		}
	}

	static getItemTemplate(title){
		return `<li>
			<a href="#">
				<span class="text">${ title }</span>
				<span class="remove"></span>
			</a>
		</li>`
	}


	constructor(params) {
		this._params = Object.assign({}, LevelsList.defaults, params);
		this
			._attachEvents()
			._render();
	}

	get levels(){
		return this._params.levels;
	}

	get listContainer(){
		return this._params.listContainer;
	}

	_attachEvents(){
		const ec = this._ec = new EventsController();
		this._onUpdateGameData = this._onUpdateGameData.bind(this);
		ec.add(window, "update-game-data", this._onUpdateGameData);
		return this;
	}

	_onUpdateGameData(e){
		this._params.levels = e.gameData.levels.slice(0);
		this._render();
	}

	_render(){
		const levels = this.levels || [],
			listContainer = this.listContainer;

		listContainer.innerHTML = "";
		for(let level of levels){
			listContainer.insertAdjacentHTML("beforeend", LevelsList.getItemTemplate(level));
		}

		return this;
	}

	destroy(){
		this._ec.destroy();
		return null;
	}
}


module.exports = LevelsList;