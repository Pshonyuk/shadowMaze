require("../styles/main.scss");
require("./actions");
const MapEditor = require("./MapEditor");

window.mapEditor = new MapEditor({
	mapContainer: document.querySelector(".map-container")
});