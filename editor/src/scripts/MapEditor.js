const EventsController = require("./EventsController");


class MapEditor {
	static get defaults() {
		return {
			mapContainer: null,
			size: 20
		}
	}

	constructor(params = {}) {
		this._params = Object.assign(Object.create(null), MapEditor.defaults, params);
		this
			._createCanvas()
			._positioningCanvas()
			._attachEvents()
			._generateEditorData();

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
		return this._params.size;
	}

	set size(val) {
		this._params.size = val;
		this._generateEditorData();
	}

	get editorData() {
		return this._params.editorData;
	}

	set editorData(val) {
		this._params.editorData = val;
		if(val) this._params.size = val.length;
		this._generateEditorData();
	}

	_generateEditorData() {
		const editorData = (this.editorData || (this._params.editorData = [])),
			size = this._params.size = Math.max(5, +this.size || 0);

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
		return this;
	}

	_attachEvents() {
		const ec = this._eventsController = new EventsController();

		this._onResize = this._onResize.bind(this);
		this._onMouseMove = this._onMouseMove.bind(this);
		this._onMouseDown = this._onMouseDown.bind(this);
		this._onMouseUp = this._onMouseUp.bind(this);

		ec.add("resize", window, "resize", this._onResize);
		ec.add("mouseMove", window, "mousemove", this._onMouseMove);
		ec.add("mouseDown", window, "mousedown", this._onMouseDown);
		ec.add("mouseUp", window, "mouseup", this._onMouseUp);
		ec.add("contextMenu", window, "contextmenu", this._onContextMenu);
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
				cell.track = !cell.track;
			}
		}
	}

	_onMouseUp(e){
		if(e.button === 2){
			this._mouseRightButton = false;
		}
	}

	_onMouseMove(e){
		const cellData = this._getCellByEvent(e),
			hoverData = this.hoverData;

		if(this._mouseRightButton && cellData && (!hoverData || (hoverData.row !== cellData.row || hoverData.column !== cellData.column))){
			const cell = this.editorData[cellData.row][cellData.column];
			cell.track = !cell.track;
		}

		this.hoverData = cellData;
	}

	_renderGrid() {
		const size = this.size,
			ctx = this._ctx,
			gridData = this._getGridData(),
			cellSpace = gridData.cellSpace,
			cellSize = gridData.cellSize,
			editorData = this.editorData;

		ctx.fillStyle = MapEditor.bgColor;
		ctx.fillRect(0, 0, gridData.cnvW, gridData.cnvH);

		for(let i = 0; i < size; i++){
			for(let j = 0; j < size; j++){
				if(editorData[i][j].track){
					ctx.fillStyle = MapEditor.trackColor;
				}else{
					ctx.fillStyle = MapEditor.cellColor;
				}
				ctx.fillRect(j * cellSpace, i * cellSpace, cellSize, cellSize);
			}
		}

		if(this.hoverData){
			const x = this.hoverData.column * cellSpace,
				y = this.hoverData.row * cellSpace;

			ctx.strokeStyle = MapEditor.hoverColor;
			ctx.lineWidth = MapEditor.cellSpacing * 3;
			ctx.beginPath();
			ctx.rect(x, y, cellSize, cellSize);
			ctx.stroke();
		}
		return this;
	}

	destroy(){
		cancelAnimationFrame(this._renderGridRAFId);
		this._eventsController.destroy();
	}
}



Object.assign(MapEditor, {
	cellSpacing: 1,
	cellColor: "#ccc",
	hoverColor: "#3F51B5",
	trackColor: "#efefef",
	bgColor: "#777"
});



module.exports = MapEditor;