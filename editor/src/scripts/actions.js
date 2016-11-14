const EventsController = require("./EventsController"),
	storage = require("./storage"),
	history = require("./history"),
	Mousetrap = require("mousetrap"),
	rootEl = document.querySelector(".main-actions"),
	ec = new EventsController();


//history
ec.add(rootEl.querySelector(".undo"), "click", () => {
	history.back();
});

ec.add(rootEl.querySelector(".redo"), "click", () => {
	history.forward();
});

Mousetrap.bind(["ctrl+z"], () => {
	history.back();
});

Mousetrap.bind(["ctrl+y"], () => {
	history.forward();
});


//clear editorData
ec.add(rootEl.querySelector(".clear"), "click", () => {
	const mapEditor = storage.getItem("mapEditor");
	if(mapEditor){
		mapEditor.editorData = null;
	}
});