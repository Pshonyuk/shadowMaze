const EventsController = require("./EventsController"),
	fs = nodeRequire("fs"),
	path = nodeRequire("path");


class SoundList {
	static get defaults(){
		return {
			sourcePath: null,
			listContainer: null
		};
	}

	static getItemTemplate(title, src){
		return `<li>
			<a href="#">
				<span class="text">${ title }</span>
				<span class="play"></span>
				<audio src="${ path.join("file://", src, title) }"></audio>
			</a>
		</li>`
	}

	constructor(params){
		this._params = Object.assign({}, SoundList.defaults, params);
		this._attachEvents()._updateSounds()._watch();
	}

	get sourcePath(){
		return this._params.sourcePath;
	}

	get listContainer(){
		return this._params.listContainer;
	}

	get sounds(){
		return this._sounds;
	}

	_onClick(e){
		if(e.target.classList.contains("play")){
			const currentAudio = this._activeAudio,
				link = e.target.closest("a"),
				audio = link.querySelector("audio");

			if(currentAudio) {
				currentAudio.pause();
				currentAudio.currentTime = 0;
				currentAudio.closest("a").classList.remove("played");
				this._activeAudio = null;
			}

			if(audio !== currentAudio){
				audio.play();
				link.classList.add("played");
				this._activeAudio = audio;
			}
		}
	}

	_attachEvents(){
		const ec = this._ec = new EventsController();

		this._onClick = this._onClick.bind(this);
		ec.add(this.listContainer, "click", this._onClick);
		return this;
	}

	_updateSounds(){
		fs.readdir(this.sourcePath, (err, files) => {
			if(err) throw err;
			this._sounds = files.filter((fileName) => {
				const extname = path.extname(fileName).toLowerCase().substr(1);
				return SoundList.soundFormats.indexOf(extname) !== -1;
			});
			this._render();
		});
		return this;
	}

	_watch(){
		fs.watch(this.sourcePath, this._updateSounds.bind(this));
		return this;
	}

	_render(){
		const sounds = this.sounds || [],
			sourcePath = this.sourcePath,
			listContainer = this.listContainer;

		listContainer.innerHTML = "";
		for(let sound of sounds){
			listContainer.insertAdjacentHTML("beforeend", SoundList.getItemTemplate(sound, sourcePath));
		}

		return this;
	}

	destroy(){
		if(this._activeAudio) {
			this._activeAudio = null;
			this._activeAudio.pause();
		}

		this._ec.destroy();
		this.listContainer.innerHTML = "";
	}
}


Object.assign(SoundList, {
	soundFormats: ["ogg", "wav"]
});


module.exports = SoundList;