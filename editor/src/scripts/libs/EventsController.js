class EventsController {
	constructor() {
		if(!(this instanceof EventsController)){
			return new EventsController();
		}
		this._events = Object.create(null);
	}

	add(el, type, handler, phrase = false) {
		el.addEventListener(type, handler, !!phrase);
		(this._events[type] || (this._events[type] = [])).push({
			el,
			type,
			handler
		});
		return this;
	}

	remove(type) {
		if(this._events[type]){
			const events = this._events[type];
			for(let event of events){
				event.el.removeEventListener(event.type, event.handler);
			}
			delete this._events[type];
		}
		return this;
	}

	destroy() {
		const events = this._events;
		for(let key in events){
			this.remove(key);
		}
		this._events = null;
		return null;
	}
}


module.exports = EventsController;