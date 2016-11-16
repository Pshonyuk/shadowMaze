const fs = nodeRequire("fs");


module.exports = {
	getOffset: (el) => {
		const bodyRect = document.body.getBoundingClientRect(),
			elRect = el.getBoundingClientRect();

		return {
			top: elRect.top - bodyRect.top,
			left: elRect.left - bodyRect.left
		}
	},

	copyFile: (source, target, cb) => {
		let cbCalled = false;
		const rd = fs.createReadStream(source),
			wr = fs.createWriteStream(target);

		rd.on("error", (err) => done(err));
		wr.on("error", (err) => done(err));
		wr.on("close", (ex) => done());
		rd.pipe(wr);

		function done(err) {
			if (!cbCalled) {
				cb(err);
				cbCalled = true;
			}
		}
	}
};