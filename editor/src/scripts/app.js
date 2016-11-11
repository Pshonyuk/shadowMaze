require("../styles/main.scss");
const MapEditor = require("./MapEditor");

window.mapEditor = new MapEditor({
	mapContainer: document.querySelector(".map-container")
});