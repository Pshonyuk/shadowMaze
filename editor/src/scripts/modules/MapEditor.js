const EventsController = require("../libs/EventsController"),
	path = nodeRequire("path"),
	fs = nodeRequire("fs");


class MapEditor {
	static get defaults() {
		return {
			mapContainer: null
		}
	}

	constructor(params = {}, projectManager) {
		this._params = Object.assign(Object.create(null), MapEditor.defaults, params);
		this.projectManager = projectManager;

		this._generateEditorData();

		this._createCanvas()
			._createSoundImg()
			._positioningCanvas()
			._attachEvents();

		const render = () => {
			this._renderGrid();
			this._renderGridRAFId = requestAnimationFrame(render);
		};

		render();
	}

	get mapContainer() {
		return this._params.mapContainer;
	}

	get size() {
		return this._size;
	}

	get editorData() {
		return this._editorData;
	}

	set editorData(val) {
		this._editorData = val;
		if(val) this._size = val.length;
		this._generateEditorData();
	}

	get cellData() {
		return this._cellData;
	}

	get soundImg() {
		return this._soundImg;
	}

	_createSoundImg() {
		this._soundImg = new Image();
		this._soundImg.src = "../../assets/img/sound.svg";
		return this;
	}

	_updateLevelData(){
		if(this.projectManager.activeLevel){
			let levelData = Object.assign({}, this.projectManager.activeLevelData);
			levelData.data = Object.assign([], this.editorData);
			this.projectManager._updateActiveLevelData(levelData);
		}
		return this;
	}

	_generateEditorData() {
		if(!this.projectManager.activeLevel){
			return this;
		}

		const editorData = (this.editorData || (this._editorData = [])),
			size = this._size = Math.max(MapEditor.mapSize, +this.size || 0);

		editorData.length = size;
		for(let i = 0; i < size; i++){
			if(!editorData[i]) editorData[i] = [];
			editorData[i].length = size;
			for(let j = 0; j < size; j++){
				if(!editorData[i][j]){
					editorData[i][j] = {};
				}
			}
		}

		this._updateSelectedCell(null);
		return this;
	}

	_attachEvents() {
		const ec = this._eventsController = new EventsController(),
			mapContainer = this.mapContainer;

		this._onChangeState = this._onChangeState.bind(this);
		this._onResize = this._onResize.bind(this);
		this._onMouseMove = this._onMouseMove.bind(this);
		this._onMouseLeave = this._onMouseLeave.bind(this);
		this._onMouseDown = this._onMouseDown.bind(this);
		this._onMouseUp = this._onMouseUp.bind(this);
		this._onChangeActiveLevelData = this._onChangeActiveLevelData.bind(this);
		this._onChaneActiveLevel = this._onChaneActiveLevel.bind(this);

		ec.add(window, "changestate", this._onChangeState);
		ec.add(window, "resize", this._onResize);
		ec.add(mapContainer, "mousemove", this._onMouseMove);
		ec.add(mapContainer, "mouseleave", this._onMouseLeave);
		ec.add(mapContainer, "mousedown", this._onMouseDown);
		ec.add(window, "mouseup", this._onMouseUp);
		ec.add(window, "contextmenu", this._onContextMenu);
		ec.add(window, "update-active-level-data", this._onChangeActiveLevelData);
		ec.add(window, "update-active-level", this._onChaneActiveLevel);

		return this;
	}

	_createCanvas() {
		const cnv = this._cnv = document.createElement("canvas");

		this.mapContainer.appendChild(cnv);
		this._ctx = cnv.getContext("2d");
		return this;
	}

	_positioningCanvas(){
		const cnv = this._cnv,
			cnvStyle = cnv.style,
			mapContainer = this.mapContainer,
			wContainer = mapContainer.clientWidth,
			hContainer = mapContainer.clientHeight,
			size = this.size,
			freeSpace = MapEditor.cellSpacing * (size - 1),
			sizeCanvas = Math.floor((Math.min(wContainer, hContainer)  - freeSpace) / size) * size + freeSpace;

		mapContainer.style.position = "relative";
		cnvStyle.position = "absolute";
		cnv.width = sizeCanvas;
		cnv.height = sizeCanvas;
		cnvStyle.left = (wContainer - sizeCanvas) / 2 + "px";
		cnvStyle.top = (hContainer - sizeCanvas) / 2 + "px";
		return this;
	}

	_getGridData(){
		const cnv = this._cnv,
			cnvW = cnv.width,
			cnvH = cnv.height,
			size = this.size,
			cellSpacing = MapEditor.cellSpacing,
			cellSize = Math.floor((cnvW - cellSpacing * (size - 1)) / size),
			cellSpace = cellSpacing + cellSize;

		return {
			cnvW,
			cnvH,
			cellSize,
			cellSpace,
			cellSpacing
		}
	}

	_getCellByEvent(e){
		const cnv = this._cnv,
			pos = cnv.getBoundingClientRect(),
			cnvW = cnv.width,
			cnvH = cnv.height,
			x = e.pageX - pos.left,
			y = e.pageY - pos.top;

		if(x >= 0 && x <= cnvW && y >= 0 && y <= cnvH){
			const gridData = this._getGridData(),
				column = Math.floor(x / gridData.cellSpace),
				leftRange = column * gridData.cellSpace,
				rightRange = leftRange + gridData.cellSize;

			if(leftRange <= x && rightRange >= x){
				const row = Math.floor(y / gridData.cellSpace),
					topRange = row * gridData.cellSpace,
					bottomRange = topRange + gridData.cellSize;

				if(topRange <= y && bottomRange >= y){
					return { column, row }
				}
			}
		}

		return null;
	}

	_updateSelectedCell(cellData) {
		const currentCellData = this._selectedCell || {},
			ev = new Event("editor-select-cell", { bubbles: true });

		this._selectedCell = ev.cellData = cellData && (cellData.row === currentCellData.row && cellData.column === currentCellData.column) ? null : cellData;
		document.dispatchEvent(ev);
	}

	_onChangeState(e){
		switch (e.action){
			case "editorData":
				this.editorData = e.state;
				this._updateLevelData();
				break;
		}
	}

	_onResize(){
		this._positioningCanvas();
	}

	_onContextMenu(e){
		e.preventDefault();
	}

	_onMouseDown(e){
		if(e.button === 2){
			const cellData = this._getCellByEvent(e);
			this._mouseRightButton = true;
			if(cellData) {
				const cell = this.editorData[cellData.row][cellData.column];
				e.preventDefault();
				cell.track = !e.ctrlKey;
			}
		} else if (e.button === 0) {
			this._updateSelectedCell(this._getCellByEvent(e));
		}
	}

	_onMouseUp(e){
		if(e.button === 2){
			this._mouseRightButton = false;
			this._updateLevelData();
		}
	}

	_onMouseMove(e){
		const cellData = this._getCellByEvent(e);

		if(this._mouseRightButton && cellData){
			const cell = this.editorData[cellData.row][cellData.column];
			cell.track = !e.ctrlKey;
		}

		this.hoverData = cellData;
	}

	_onMouseLeave(){
		this.hoverData = null;
	}

	_onChangeActiveLevelData(){
		let activeLevelData = this.projectManager.activeLevelData;
		this.editorData = activeLevelData && activeLevelData.data;
		this._positioningCanvas();
	}

	_onChaneActiveLevel(){
		const cnv = this._cnv;
		cnv.style.opacity = this.projectManager.activeLevel ? "" : "0";
	}

	_renderGrid() {
		if(!this.projectManager.activeLevel) return;
		const ctx = this._ctx,
			size = this.size,
			gridData = this._getGridData(),
			cellSpace = gridData.cellSpace,
			cellSize = gridData.cellSize,
			editorData = this.editorData;

		ctx.fillStyle = MapEditor.colors.bg;
		ctx.fillRect(0, 0, gridData.cnvW, gridData.cnvH);

		for(let i = 0; i < size; i++){
			for(let j = 0; j < size; j++){
				const cellData = editorData[i][j],
					soundName = cellData.sound && cellData.sound.name && cellData.sound.name !== "none",
					role = cellData.role,
					x = j * cellSpace,
					y = i * cellSpace;

				if(cellData.track){
					ctx.fillStyle = MapEditor.colors.track;
				}else{
					ctx.fillStyle = MapEditor.colors.cell;
				}

				ctx.fillRect(x, y, cellSize, cellSize);

				if(role && role !== "default") {
					const firstLetter = role.substr(0, 1).toUpperCase();
					ctx.fillStyle = MapEditor.colors[`${role}Text`];
					ctx.font = `italic normal 700 ${Math.floor(cellSpace * 0.6)}px sans-serif`;
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.fillText(firstLetter, x + cellSize / 2, y + cellSize / 2);
				}

				if(soundName) {
					const img = this.soundImg,
						m = (cellSpace * 0.32) / Math.max(img.height, img.width),
						w = Math.round(img.width * m),
						h = Math.round(img.height * m),
						xImg = x + cellSize - w - MapEditor.cellSpacing * 2,
						yImg = y + cellSize - h - MapEditor.cellSpacing * 2;
					ctx.drawImage(this.soundImg, xImg,  yImg, w, h);
				}
			}
		}

		[
			[this.hoverData, "hover"],
			[this._selectedCell, "selected"]
		].forEach((item) => {
			if(!item[0]) return;
			const lineWidth = MapEditor.cellSpacing * 2,
				x = item[0].column * cellSpace + lineWidth / 2,
				y = item[0].row * cellSpace + lineWidth / 2;

			ctx.strokeStyle = MapEditor.colors[item[1]];
			ctx.lineWidth = lineWidth;
			ctx.beginPath();
			ctx.rect(x, y, cellSize - lineWidth, cellSize - lineWidth);
			ctx.stroke();
		});

		return this;
	}

	destroy(){
		cancelAnimationFrame(this._renderGridRAFId);
		this._eventsController.destroy();
		this._soundImg = null;
		return null;
	}
}



Object.assign(MapEditor, {
	cellSpacing: 1,
	mapSize: 25,
	colors: {
		bg: "#777",
		cell: "#ccc",
		hover: "#222",
		track: "#efefef",
		selected: "#3288e6",
		startText: "#009688",
		finishText: "#009688"
	}
});



module.exports = MapEditor;