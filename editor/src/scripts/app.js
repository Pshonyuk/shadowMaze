require("../styles/main.scss");
const MapEditor = require("./MapEditor");

new MapEditor({
	mapContainer: document.querySelector(".map-container")
});