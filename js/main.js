window.addEventListener('load', () => {
	const $canvas = document.querySelector('canvas');
	const context = $canvas.getContext('2d');
	let planetInput = document.getElementById("planets").valueAsNumber;

	const myGame = new Game(context, {
		getCurrentPitch: updatePitch
	}, planetInput);
});