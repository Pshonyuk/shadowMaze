const EventsController = require("../libs/EventsController"),
	deepcopy = require("deepcopy"),
	Mousetrap = require("mousetrap"),
	gui = nodeRequire("nw.gui"),
	GameWorld = require("../../../../../game/client/src/core/World");


class Runner {
	static get defaults() {
		return {
			el: null
		}
	}

	static get windowTemplate() {
		return `
		<style>
			html,body,canvas { margin: 0; padding: 0; width: 100%; height: 100%; font-size: 0; }
    	</style>
		<canvas id="game-scene"></canvas>
		<script>
			
		</script>
		`;
	}


	constructor(params, projectManajer) {
		this._params = Object.assign({}, Runner.defaults, params);
		this.projectManager = projectManajer;

		this._attachEvents();
	}

	get el() {
		return this._params.el;
	}

	_createWindow(cb) {
		if(this._win) this._win.close();
		this._win = null;
		gui.Window.open ("about:blank", { fullscreen: true }, (win) => {
			this._win = win;
			win.window.document.body.innerHTML = Runner.windowTemplate;
			win.window.onkeydown = (e) => {
				if(e.keyCode === 27) win.close();
			};
			if(typeof cb === "function") cb(win.window);
		});
		return this;
	}

	_attachEvents() {
		const ec = this._ec = new EventsController();

		this._runGame = this._runGame.bind(this);
		ec.add(this.el, "click", this._runGame);
		Mousetrap.bind(["f9"], this._runGame);
		return this;
	}

	_runGame() {
		if(this._gameWorld) this._gameWorld.destroy();

		this._createWindow((win) => {
			this._gameWorld = new GameWorld({
				canvas: win.document.getElementById("game-scene"),
				mapData: deepcopy(this.projectManager.activeLevelData)
			});
		});

		return this;
	}

	destroy() {
		if(this._gameWorld) this._gameWorld.destroy();
		this._ec.destroy();
		Mousetrap.unbind(["f9"]);
		return null;
	}
}


module.exports = Runner;