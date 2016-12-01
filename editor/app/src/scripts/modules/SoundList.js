const EventsController = require("../libs/EventsController"),
	fs = nodeRequire("fs"),
	path = nodeRequire("path"),
	helper = require("../libs/helper");


class SoundList {
	static get defaults(){
		return {
			listContainer: null
		};
	}

	static getItemTemplate(title, src){
		return `<li>
			<a href="#">
				<span class="text">${ title }</span>
				<span class="play"></span>
				<audio src="file://${ path.resolve(path.join(src, title)) }"></audio>
			</a>
			<div class="timeline">
				<span class="progress"></span>
			</div>
		</li>`
	}

	constructor(params, projectManager){
		this._params = Object.assign({}, SoundList.defaults, params);
		this.projectManager = projectManager;
		this._attachEvents()._updateSounds()._watch();
	}

	get sourcePath(){
		return this.projectManager.sourcePath;
	}

	get listContainer(){
		return this._params.listContainer;
	}

	get sounds(){
		return this._sounds;
	}

	_onClick(e){
		let timeline;
		if(e.target.classList.contains("play")){
			const currentAudio = this._activeAudio,
				audio = e.target.closest("li").querySelector("audio");

			if(currentAudio) currentAudio.pause();
			if(audio !== currentAudio){
				audio.play();
			}
		} else if (timeline = e.target.closest(".timeline")){
			const audio = e.target.closest("li").querySelector("audio"),
				clickPos = e.pageX - helper.getOffset(timeline).left,
				percent = clickPos / timeline.clientWidth;

			audio.currentTime = Math.round(audio.duration * percent);
		}
	}

	_onPlay(e){
		const root = e.target.closest("li"),
			audio = e.target.closest("li").querySelector("audio");

		root.classList.add("played");
		this._activeAudio = audio;
	}

	_onPause(e){
		const root = e.target.closest("li");

		root.classList.remove("played");
		this._activeAudio = null;
	}

	_onTimeupdate(e){
		const audio = e.target,
			el = audio.closest("li").querySelector(".progress"),
			duration =  audio.duration;

		if (duration > 0) {
			const progress = (audio.currentTime / duration) * 100;
			el.style.width = progress + "%";
			if(progress === 100){
				audio.pause();
				audio.currentTime = 0;
			}
		}
	}

	_attachEvents(){
		const ec = this._ec = new EventsController();

		this._onClick = this._onClick.bind(this);
		this._onTimeupdate = this._onTimeupdate.bind(this);
		this._onPlay = this._onPlay.bind(this);
		this._onPause = this._onPause.bind(this);

		ec.add(this.listContainer, "click", this._onClick);
		ec.add(this.listContainer, "timeupdate", this._onTimeupdate, true);
		ec.add(this.listContainer, "play", this._onPlay, true);
		ec.add(this.listContainer, "pause", this._onPause, true);
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
		if(this._activeAudio) this._activeAudio.pause();
		this._ec.destroy();
		this.listContainer.innerHTML = "";
	}
}


Object.assign(SoundList, {
	soundFormats: ["ogg", "wav"]
});


module.exports = SoundList;