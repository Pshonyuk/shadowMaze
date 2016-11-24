const path = require("path"),
	NWB = require('nwjs-builder');

NWB.commands.nwbuild(path.resolve("."), {
	"platforms": "linux64",
	"outputDir": path.resolve("./build/bin"),
	"version": "0.18.8"
	// "withFfmpeg": true,
	// "production": true
}, (err) => {
	if(err) return console.error(err);
	console.log("Done!!");
});