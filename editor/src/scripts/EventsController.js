class EventsController {
	constructor() {
		if(!(this instanceof EventsController)){
			return new EventsController();
		}
		this._events = Object.create(null);
	}

	add(namespace, el, type, handler) {
		el.addEventListener(type, handler, false);
		this._events[namespace] || (this._events[namespace]  = []);
		this._events[namespace].push({
			el,
			type,
			handler
		});
		return this;
	}

	remove(namespace) {
		const events = this._events[namespace];
		if(events){
			for(let event of events){
				event.el.removeEventListener(event.type, event.handler);
			}
			delete this._events[namespace];
		}
		return this;
	}

	destroy() {
		let events = this._events;
		for(let key in events){
			if(events.hasOwnProperty(key)){
				this.remove(key);
			}
		}
		this._events = null;
		return null;
	}
}


module.exports = EventsController;