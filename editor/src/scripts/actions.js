const path = nodeRequire("path"),
	helper = require("./helper"),
	EventsController = require("./EventsController"),
	storage = require("./storage"),
	history = require("./history"),
	Mousetrap = require("mousetrap"),
	rootEl = document.querySelector(".main-actions"),
	soundFileDlg = document.getElementById("sound-dialog"),
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



//sound-file dialog
ec.add(document.querySelector(".add-sound"), "click", () => {
	const ev = new MouseEvent("click");
	soundFileDlg.dispatchEvent(ev);
});

ec.add(soundFileDlg, "change", (e) => {
	const files = soundFileDlg.files,
		types = soundFileDlg.getAttribute("accept").split(","),
		gamePath = storage.getItem("gamePath");

	if(gamePath){
		const sourcePath = path.join(gamePath, "source");
		for(let file of files){
			if(types.indexOf(file.type)){
				helper.copyFile(file.path, path.join(sourcePath, file.name), (err) => {
					if(err) console.error(err);
				});
			}
		}
	}
});