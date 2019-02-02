const autosize = (element) => {
	setTimeout(() => {
		element.style.cssText = 'height:auto';
		element.style.cssText = 'height:' + element.scrollHeight + 'px';
	}, 0);
};

export default () => {
	document.addEventListener('DOMContentLoaded', () => {
		const textareas = document.querySelectorAll('.js-textarea');
		[...textareas].forEach(item => {
			item.innerText = item.dataset.value;
			item.removeAttribute('data-value');
			autosize(item);
			item.addEventListener('keydown', () => autosize(item));
		});

	});
};
