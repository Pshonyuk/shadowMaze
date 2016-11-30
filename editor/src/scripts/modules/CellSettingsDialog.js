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
					<input type="radio" ${!params.role || params.role === "default" ? "checked" : ""} name="role" value="default">
					default
				</label>
				<label>
					<input type="radio" ${params.role === "start" ? "checked" : ""} name="role" value="start">
					start
				</label>
				<label>
					<input type="radio" ${params.role === "finish" ? "checked" : ""} name="role" value="finish">
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

	static _clearCellsRole(role, data) {
		if(!data || !role || role === "default") return data;
		data.data.forEach((row) => {
			row && row.forEach((cell) => {
				if(cell.role === role) cell.role = "default";
			});
		});

		return data;
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

	_getSoundList(cellData) {
		const soundList = this.projectManager.modules.get("soundList").sounds || [],
			splitter = "</option><option>";
		let tpl = "", soundIndex;

		if(!cellData.sound || cellData.sound === "none" || (soundIndex = soundList.indexOf(cellData.sound)) === -1) {
			tpl = (soundList).join(splitter);
			return tpl ? `<option>${tpl}</option>` : "";
		} else if (soundIndex !== -1) {
			tpl += `<option>${soundList.slice(0, soundIndex).join(splitter)}`;
			tpl = `${tpl.substr(0, tpl.length - 1)} selected>${soundList.slice(soundIndex, 1)}</option>`;
			if(soundIndex < soundList.length - 1) {
				tpl += `${soundList.slice(soundIndex + 1).join(splitter)}</option>`;
			}
			return tpl;
		}
		return "";
	}

	_onClick(){
		let cellCoords = this.projectManager.modules.get("mapEditor")._selectedCell;
		if(!cellCoords) return;

		cellCoords = Object.assign({}, cellCoords);
		let levelData = deepcopy(this.projectManager.activeLevelData),
			cellData = levelData.data[cellCoords.row][cellCoords.column];

		vex.dialog.buttons.YES.text = "Save";

		this._tmID = setTimeout(() => {
			vex.dialog.open({
				className: CellSettingsDialog.MODAL_CLASSNAME,
				input: CellSettingsDialog.getModalContent(cellData, this._getSoundList(cellData)),
				callback: (data) => {
					if(data) {
						levelData = CellSettingsDialog._clearCellsRole(data.role, levelData);
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