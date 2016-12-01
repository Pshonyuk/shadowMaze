const EventsController = require("../libs/EventsController"),
	path = nodeRequire("path"),
	fs = nodeRequire("fs");


class LevelsList {
	static get defaults(){
		return {
			listContainer: null
		}
	}

	static getItemTemplate(title){
		return `<li data-name="${ title }">
			<a href="#">
				<span class="text">${ title }</span>
				<span class="remove"></span>
			</a>
		</li>`
	}


	constructor(params, projectManager) {
		this._params = Object.assign({}, LevelsList.defaults, params);
		this.projectManager = projectManager;
		this
			._attachEvents()
			._render();
	}

	get levels(){
		return this.projectManager.levels;
	}

	get listContainer(){
		return this._params.listContainer;
	}

	_attachEvents(){
		const  listContainer = this.listContainer,
			ec = this._ec = new EventsController();

		this._onUpdateGameData = this._onUpdateGameData.bind(this);
		this._showActiveLevel = this._showActiveLevel.bind(this);
		this._onItemClick = this._onItemClick.bind(this);

		ec.add(window, "update-game-data", this._onUpdateGameData);
		ec.add(window, "update-active-level", this._showActiveLevel);
		ec.add(listContainer, "click", this._onItemClick);
		return this;
	}

	_onUpdateGameData(e){
		this._params.levels = e.gameData.levels.slice(0);
		this._render();
	}

	_onItemClick(e){
		const projectManager = this.projectManager,
			liElement = e.target.closest("li");

		if(!liElement) return;
		const name = (liElement.getAttribute("data-name") || "").toLowerCase().trim();

		if(e.target.classList.contains("remove")){
			let levels = this.levels,
				index;

			if(name && (index = levels.indexOf(name)) !== -1){
				fs.unlink(path.join(projectManager.workPath, `${name}.json`), (err) => {
					if(err){
						console.error(err);
						return;
					}
					levels.splice(index, 1);
					projectManager.levels = levels;
				});
			}
		} else {
			projectManager.activeLevel = name;
		}
	}

	_showActiveLevel(){
		const activeLevel = projectManager.activeLevel,
			listContainer = this.listContainer,
			activeItem = listContainer.querySelector("li.active");

		if(activeItem) activeItem.classList.remove("active");
		if(activeLevel){
			const newActiveItem = listContainer.querySelector(`li[data-name='${activeLevel}']`);
			if(newActiveItem) newActiveItem.classList.add("active");
		}

		return this;
	}

	_render(){
		const levels = this.levels || [],
			listContainer = this.listContainer;

		listContainer.innerHTML = "";
		for(let level of levels){
			listContainer.insertAdjacentHTML("beforeend", LevelsList.getItemTemplate(level));
		}
		this._showActiveLevel();

		return this;
	}

	destroy(){
		this._ec.destroy();
		return null;
	}
}


module.exports = LevelsList;