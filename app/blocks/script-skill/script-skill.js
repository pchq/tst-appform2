const positions = [2, 150, 375, 768];
const rangeContainer = document.querySelector('.script-skill__range');
const meter = rangeContainer.querySelector('.script-skill__meter');
const value = rangeContainer.querySelector('.script-skill__value');


const getPosition = (newPos) => positions.reduce((actual, current, i) => {
	return (Math.abs(newPos - positions[actual]) < Math.abs(newPos - current)) ? actual : i;}, 0
);

const setPosition = (i) => {
	meter.style.left = positions[i] + 'px';
};

const getLeftCoords = (elem) => {
	const box = elem.getBoundingClientRect();
	return box.left + pageXOffset;
};

export default () => {
	document.addEventListener('DOMContentLoaded', () => {
		setPosition(value.value);
	});

	meter.onmousedown = function (e) {
		const shiftX = e.pageX - getLeftCoords(meter);

		document.onmousemove = function (evt) {
			let newPos = evt.pageX - shiftX - getLeftCoords(rangeContainer);

			const rightEdge = rangeContainer.offsetWidth - meter.offsetWidth;

			if (newPos < 0) {
				newPos = 0;
			}
			if (newPos > rightEdge) {
				newPos = rightEdge;
			}
			meter.style.left = newPos + 'px';
			value.value = getPosition(newPos);

		};

		document.onmouseup = function () {
			setPosition(value.value);
			document.onmousemove = document.onmouseup = null;
		};

		return false;
	};

	meter.ondragstart = function () {
		return false;
	};
};
