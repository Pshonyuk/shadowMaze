const path = nodeRequire("path"),
	ProjectManager = require("./ProjectManager");

require("../styles/main.scss");

// require("./actions");
// storage.setItem({
// 	"mapEditor": new MapEditor({
// 		mapContainer: document.querySelector(".map-container")
// 	}),



window.projectManager = new ProjectManager({
	modules: [
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