class MapEditor {
	static get defaults(){
		return {
			mapContainer: null,
			columns: 20,
			rows: 20
		}
	}

	constructor(params = {}){
		this._params = Object.assign(Object.create(null), MapEditor.defaults, params);

		this
			._createCanvas()
			._generateEditorData()
			._renderGrid();
	}

	get mapContainer(){
		return this._params.mapContainer;
	}

	get columns(){
		return this._params.columns;
	}

	set columns(val){
		this._params.columns = val;
		this._renderGrid();
	}

	get rows(){
		return this._params.rows;
	}

	set rows(val){
		this._params.rows = val;
		this._renderGrid();
	}

	get editorData(){
		return this._params.editorData;
	}

	_generateEditorData(){
		const editorData = (this.editorData || (this._params.editorData = []));
		return this;
	}

	_createCanvas(){
		const cnv = this._cnv = document.createElement("canvas"),
			cnvStyle = cnv.style,
			mapContainer = this.mapContainer;

		cnv.width = mapContainer.clientWidth;
		cnv.height = mapContainer.clientHeight;

		mapContainer.style.position = "relative";
		cnvStyle.position = "absolute";
		cnvStyle.left = "0";
		cnvStyle.top = "0";

		mapContainer.appendChild(cnv);
		this._ctx = cnv.getContext("2d");
		return this;
	}

	_renderGrid(){
		const columns = this.columns,
			rows = this.rows,
			cnv = this._cnv,
			ctx = this._ctx,
			vCellSpace = (cnv.width - MapEditor.hCellSpacing) / columns,
			hCellSpace = (cnv.height - MapEditor.vCellSpacing) / rows,
			wCell = vCellSpace - MapEditor.hCellSpacing,
			hCell = hCellSpace - MapEditor.vCellSpacing;

		ctx.fillStyle = MapEditor.bgColor;
		ctx.fillRect(0, 0, cnv.width, cnv.height);
		ctx.fillStyle = MapEditor.cellColor;

		for(let i = 0; i < columns; i++){
			for(let j = 0; j < rows; j++){
				let xPos = i * vCellSpace + MapEditor.vCellSpacing,
					yPos = j * hCellSpace + MapEditor.hCellSpacing;
				ctx.fillRect(xPos, yPos, wCell, hCell);
			}
		}
		ctx.fill();

		return this;
	}
}



Object.assign(MapEditor, {
	vCellSpacing: 1,
	hCellSpacing: 1,
	cellColor: "#ccc",
	bgColor: "#222"
});



module.exports = MapEditor;