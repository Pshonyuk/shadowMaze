const storage = require("./storage"),
	MapEditor = require("./MapEditor"),
	SoundList = require("./SoundList");
require("../styles/main.scss");
require("./actions");


storage.setItem({
	"mapEditor": new MapEditor({
		mapContainer: document.querySelector(".map-container")
	}),
	"soundList": new SoundList({
		sourcePath: "/home/helmer/m/",
		listContainer: document.querySelector(".sound-list")
	})
});