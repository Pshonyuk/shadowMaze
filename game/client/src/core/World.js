const BABYLON = require("babylonjs");


class World {
	static get defaults() {
		return {
			canvas: null,
			mapData: null
		}
	}

	constructor(params) {
		this._params = Object.assign({}, World.defaults, params);
		this
			._createEngine()
			._createScene()
			._createMap()
			._runRender();
	}

	get canvas() {
		return this._params.canvas;
	}

	get mapData() {
		return this._params.mapData;
	}

	_createEngine() {
		this._engine = new BABYLON.Engine(this.canvas, false);
		return this;
	}

	_createScene() {
		this._scene = new BABYLON.Scene(this._engine);
		return this;
	}

	_createMap() {
		const scene = this._scene,
			mapData = this.mapData;

		mapData.data.reverse().forEach((row, y) => {
			row.reverse().forEach((cell, x) => {
				if(!cell.track) {
					const box = BABYLON.Mesh.CreateBox(`cell[${x}][${y}]`, 1, scene);
					box.position.x = x;
					box.position.y = y;
				}
			});
		});

		const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 8, 50, BABYLON.Vector3.Zero(), scene),
			light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

		camera.attachControl(this._engine.getRenderingCanvas(), true);
		return this;
	}

	_runRender() {
		this._engine.runRenderLoop(() => {
			this._scene.render();
		});
		return this;
	}

	destroy() {
		this._scene.dispose();
		this._engine.dispose();
		return null;
	}
}


Object.assign(World, {
	SCALE: 10
});

module.exports = World;