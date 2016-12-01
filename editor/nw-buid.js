const NwBuilder = require("nw-builder"),
	path = require("path"),
	glob = require("simple-glob"),
	rmdir = require("rmdir"),
	zipFolder = require("zip-folder");


const nw = new NwBuilder({
	files: glob([
		"./package.json",
		"./app/index.html",
		"./app/assets/**/**",
		"./app/node_modules/**/**",
		"./app/dist/**"
	]),
	platforms: ["linux64", "win64"],
	flavor: "normal",
	buildDir: path.resolve("./bin"),
	cacheDir: path.resolve("./bin/cache"),
	zip: true
});


nw.on("log",  console.log);
nw.build().then(function () {
	const paths = [
		path.resolve("./bin/shadowMaze-Editor/linux64"),
		path.resolve("./bin/shadowMaze-Editor/win64"),
	];

	paths.forEach((binPath) => {
		zipFolder(binPath, binPath + ".zip", function(err) {
			if(err) {
				console.log('oh no!', err);
			} else {
				console.log('Zip success', binPath);
			}
			rmdir(binPath);
		});
	});
}).catch(function (error) {
	console.error(error);
});