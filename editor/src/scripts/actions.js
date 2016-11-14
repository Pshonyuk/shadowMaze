const EventsController = require("./EventsController"),
	history = require("./history"),
	rootEl = document.querySelector(".main-actions"),
	ec = new EventsController();


//history
ec.add("history::back", rootEl.querySelector(".undo"), "click", () => {
	history.back();
});

ec.add("history::forward", rootEl.querySelector(".redo"), "click", () => {
	history.forward();
});

//clear editorData
ec.add("editorData::clear", rootEl.querySelector(".clear"), "click", () => {
	window.mapEditor.editorData = null;
});