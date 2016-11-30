const EventsController = require("../libs/EventsController"),
	deepcopy = require("deepcopy"),
	vex = window.vex;


class CellSettingsDialog {
	static get defaults(){
		return {
			el: null
		}
	}

	static getModalContent(params = {}, soundList){
		return `
			<section data-hidden="${!params.track}">
				<h3>cell role</h3>
				<label>
					<input type="radio" checked name="role" value="default">
					default
				</label>
				<label>
					<input type="radio" name="role" value="start">
					start
				</label>
				<label>
					<input type="radio" name="role" value="finish">
					finish
				</label>
			</section>
			<section>
				<h3>sound</h3>
				<label>
					<select name="sound">
						<option>none</option>
						${soundList || ""}
					</select>
				</label>
			</section>
			
		`
	}


	constructor(params, projectManager){
		this._params = Object.assign({}, CellSettingsDialog.defaults, params);
		this.projectManager = projectManager;
		this._attachEvents();
	}

	get el(){
		return this._params.el;
	}

	_attachEvents() {
		const ec = this._ec = new EventsController();

		this._onClick = this._onClick.bind(this);
		ec.add(this.el, "click", this._onClick);
		return this;
	}

	_getSoundList() {
		const list = (this.projectManager.modules.get("soundList").sounds || []).join("</option><option>");
		return list ? `<option>${list}</option>` : "";
	}

	_onClick(){
		let cellCoords = this.projectManager.modules.get("mapEditor")._selectedCell;
		if(!cellCoords) return;

		cellCoords = Object.assign({}, cellCoords);
		const levelData = deepcopy(this.projectManager.activeLevelData),
			cellData = levelData.data[cellCoords.row][cellCoords.column];

		vex.dialog.buttons.YES.text = "Save";

		this._tmID = setTimeout(() => {
			vex.dialog.open({
				className: CellSettingsDialog.MODAL_CLASSNAME,
				input: CellSettingsDialog.getModalContent(cellData, this._getSoundList()),
				callback: (data) => {
					if(data) {
						Object.assign(cellData, data);
						this.projectManager._updateActiveLevelData(levelData);
					}
				}
			});
		}, 0);
	}

	destroy(){
		if(this._dialog) this._dialog.close();
		clearTimeout(this._tmID);
		this._ec.destroy();
		return null;
	}
}


Object.assign(CellSettingsDialog, {
	MODAL_CLASSNAME: "vex-theme-os cell-settings-modal"
});


module.exports = CellSettingsDialog;