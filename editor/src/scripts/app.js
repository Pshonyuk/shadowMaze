const storage = require("./storage"),
	MapEditor = require("./MapEditor");
require("../styles/main.scss");
require("./actions");


storage.setItem("mapEditor", new MapEditor({
	mapContainer: document.querySelector(".map-container")
}));