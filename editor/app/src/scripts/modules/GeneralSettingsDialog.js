const EventsController = require("../libs/EventsController"),
	deepcopy = require("deepcopy"),
	vex = window.vex;


class GeneralSettingsDialog {
	static get defaults(){
		return {
			el: null
		}
	}

	static getModalContent(params = {}, footfallList, soundAisleList){
		return `
			<section>
				<h3>footfall</h3>
				<select name="footfall[name]">
					${footfallList || ""}
				</select>
				<div class="sound-volume">
					<h3>volume</h3>
					<input name="footfall[volume]" type="number" value="${params.footfall ? params.footfall.volume : 100}" min="0" max="100">
				</div>
			</section>
			<section>
				<h3>sound aisle</h3>
				<select name="soundAisle[name]">
					${soundAisleList || ""}
				</select>
				<div class="sound-volume">
					<h3>volume</h3>
					<input name="soundAisle[volume]" type="number" value="${params.soundAisle ? params.soundAisle.volume : 100}" min="0" max="100">
				</div>
			</section>
		`
	}


	constructor(params, projectManager){
		this._params = Object.assign({}, GeneralSettingsDialog.defaults, params);
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

	_getSoundList(soundName) {
		const soundList = this.projectManager.modules.get("soundList").sounds || [],
			splitter = "</option><option>";
		let tpl = "", soundIndex;

		if(!soundName || (soundIndex = soundList.indexOf(soundName)) === -1) {
			tpl = (soundList).join(splitter);
			return tpl ? `<option>${tpl}</option>` : "";
		} else if (soundIndex !== -1) {
			for(let i = 0, l = soundList.length; i < l; i++) {
				if(i === soundIndex) {
					tpl += `<option selected>${soundList[i]}</option>`;
					continue;
				}
				tpl += `<option>${soundList[i]}</option>`;
			}
			return tpl;
		}
		return "";
	}

	_onClick(){
		let levelData = deepcopy(this.projectManager.activeLevelData),
			generalParams = levelData.generalParams || (levelData.generalParams = Object.create(null));

		vex.dialog.buttons.YES.text = "Save";

		this._tmID = setTimeout(() => {
			vex.dialog.open({
				className: GeneralSettingsDialog.MODAL_CLASSNAME,
				input: GeneralSettingsDialog.getModalContent(
					generalParams,
					this._getSoundList(generalParams.footfall && generalParams.footfall.name),
					this._getSoundList(generalParams.soundAisle && generalParams.soundAisle.name)
				),
				callback: (data) => {
					if(data) {
						Object.assign(generalParams, data);
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


Object.assign(GeneralSettingsDialog, {
	MODAL_CLASSNAME: "vex-theme-os general-settings-modal"
});


module.exports = GeneralSettingsDialog;