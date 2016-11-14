const EventsController = require("./EventsController");


module.exports = function () {
	const _subscribes = Object.create(null),
		ec = new EventsController();
	let uid = 0;

	ec.add("history::popState", window, "popstate", (e) => {
		const state = e.state,
			handler = state && state.handlerName && _subscribes[state.handlerName];

		if(handler){
			handler.call(null, state.data);
		}
	});

	return {
		subscribe(name, callback){
			if(_subscribes[name]){
				throw new Error("Duplicate name.");
			}
			_subscribes[name] = callback;
			return this;
		},

		unsubscribe(name){
			delete _subscribes[name];
			return this;
		},

		pushState(data, handlerName){
			window.history.pushState({
				data,
				handlerName
			}, uid++);
			return this;
		},

		back(){
			window.history.back();
			return this;
		},

		forward(){
			window.history.forward();
			return this;
		},

		clear(){
			return this;
		}
	};
}();