const EventsController = require("../EventsController");


module.exports = function () {
	const ec = new EventsController();

	ec.add(window, "popstate", (e) => {
		const state = e.state;
		if(state && state.action && state.data){
			let stateEvent = new Event("changestate", {
				bubbles: true
			});
			stateEvent.action = state.action;
			stateEvent.state = state.data;
			window.dispatchEvent(stateEvent);
		}
	});

	return {
		pushState(action, data= {}){
			window.history.pushState({
				action,
				data
			}, null);
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