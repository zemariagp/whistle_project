window.addEventListener('load', () => {
	const $canvas = document.querySelector('canvas');
	const context = $canvas.getContext('2d');

	const myGame = new Game(context, {
		getCurrentPitch: updatePitch
	});
});