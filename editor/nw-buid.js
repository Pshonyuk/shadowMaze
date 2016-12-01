const NwBuilder = require("nw-builder"),
	path = require("path"),
	glob = require("simple-glob");


const nw = new NwBuilder({
	files: glob([
		"./package.json",
		"./index.html",
		"./assets/**/**",
		"./dist/**"
	]),
	platforms: ["linux64", "win64"],
	flavor: "normal",
	buildDir: path.resolve("../bin"),
	cacheDir: path.resolve("../bin/cache"),
	zip: false
});


nw.on("log",  console.log);
nw.build().then(function () {
	console.log("all done!");
}).catch(function (error) {
	console.error(error);
});