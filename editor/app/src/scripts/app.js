require("../styles/main.scss");

const path = nodeRequire("path"),
	ProjectManager = require("./ProjectManager");


window.vex.defaultOptions.className = "vex-theme-os";
window.projectManager = new ProjectManager({
	modules: [
		{
			name: "settingsList",
			module: require("./modules/SettingsList"),
			params: {
				listContainer: document.querySelector(".settings-list")
			}
		},
		{
			name: "addLevelDialog",
			module: require("./modules/AddLevelDialog"),
			params: {
				button: document.querySelector(".add-level")
			}
		},
		{
			name: "levelsList",
			module: require("./modules/LevelslList"),
			params: {
				listContainer: document.querySelector(".levels-list")
			}
		},
		{
			name: "mapEditor",
			module: require("./modules/MapEditor"),
			params: {
				mapContainer: document.querySelector(".map-container")
			}
		},
		{
			name: "addSoundDialog",
			module: require("./modules/AddSoundDialog"),
			params: {
				fileInput: document.getElementById("sound-dialog"),
				button: document.querySelector(".add-sound")
			}
		},
		{
			name: "soundList",
			module: require("./modules/SoundList"),
			params: {
				listContainer: document.querySelector(".sound-list")
			}
		},
		{
			name: "history",
			module: require("./modules/History"),
			params: {
				undoEl: document.querySelector(".history.undo"),
				redoEl: document.querySelector(".history.redo")
			}
		},
		{
			name: "cellSettingsDialog",
			module: require("./modules/CellSettingsDialog"),
			params: {
				el: document.querySelector("[data-settings='cell']")
			}
		},
		{
			name: "generalSettingsDialog",
			module: require("./modules/GeneralSettingsDialog"),
			params: {
				el: document.querySelector("[data-settings='general']")
			}
		},
		{
			name: "runner",
			module: require("./modules/Runner"),
			params: {

			}
		}
	]
});