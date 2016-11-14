const EventsController = require("./EventsController"),
	nwGui = nodeRequire('nw.gui'),
	storage = require("./storage"),
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

nwGui.App.registerGlobalHotKey(new nwGui.Shortcut({
	key : "Ctrl+Z",
	active : function() {
		history.back();
	}
}));

// nwGui.App.registerGlobalHotKey(new nwGui.Shortcut({
// 	key : "Ctrl+Y",
// 	active : function() {
// 		history.forward();
// 	}
// }));



//clear editorData
ec.add("editorData::clear", rootEl.querySelector(".clear"), "click", () => {
	const mapEditor = storage.getItem("mapEditor");
	if(mapEditor){
		mapEditor.editorData = null;
	}
});