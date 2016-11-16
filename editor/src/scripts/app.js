const path = nodeRequire("path"),
	storage = require("./storage"),
	MapEditor = require("./MapEditor"),
	SoundList = require("./SoundList");

require("../styles/main.scss");
require("./actions");


storage.setItem("gamePath", "/home/helmer/game");
storage.setItem({
	"mapEditor": new MapEditor({
		mapContainer: document.querySelector(".map-container")
	}),
	"soundList": new SoundList({
		sourcePath: path.join(storage.getItem("gamePath"), "source"),
		listContainer: document.querySelector(".sound-list")
	})
});