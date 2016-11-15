module.exports = {
	getOffset: (el) => {
		const bodyRect = document.body.getBoundingClientRect(),
			elRect = el.getBoundingClientRect();

		return {
			top: elRect.top - bodyRect.top,
			left: elRect.left - bodyRect.left
		}
	}
};