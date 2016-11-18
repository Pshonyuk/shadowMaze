require("../styles/main.scss");

const path = nodeRequire("path"),
	ProjectManager = require("./ProjectManager");


window.vex.defaultOptions.className = "vex-theme-os";
window.projectManager = new ProjectManager({
	modules: [
		{
			name: "addLevelDialog",
			module: require("./modules/AddLevelDialog"),
			params: {
				button: document.querySelector(".add-level"),
				workPath: ProjectManager.query("workPath")
			}
		},
		{
			name: "levelsList",
			module: require("./modules/LevelslList"),
			params: {
				listContainer: document.querySelector(".levels-list"),
				levels: ProjectManager.query("levels")
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
				sourcePath: ProjectManager.query("sourcePath"),
				fileInput: document.getElementById("sound-dialog"),
				button: document.querySelector(".add-sound")
			}
		},
		{
			name: "soundList",
			module: require("./modules/SoundList"),
			params: {
				listContainer: document.querySelector(".sound-list"),
				sourcePath: ProjectManager.query("sourcePath")
			}
		}
	]
});