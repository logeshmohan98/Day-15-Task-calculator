document.addEventListener('DOMContentLoaded', function() {
	const output = document.getElementById('output');
	const buttons = document.querySelectorAll('#buttons .button');
	let currentOperator = null;
	let currentValue = null;
	let previousValue = null;

	function clear() {
		output.textContent = '0';
		currentOperator = null;
		currentValue = null;
		previousValue = null;
	}

	function calculate() {
		const x = parseFloat(previousValue);
		const y = parseFloat(currentValue);

		if (currentOperator === '+') {
			return x + y;
		} else if (currentOperator === '-') {
			return x - y;
		} else if (currentOperator === '*') {
			return x * y;
		} else if (currentOperator === '/') {
			return x / y;
		} else if (currentOperator === '%') {
			return x % y;
		}
	}

	function updateOutput(value) {
		if (output.textContent === '0' || currentValue === null) {
			output.textContent = value;
		} else {
			output.textContent += value;
		}

		currentValue = output.textContent;
	}

	function handleButtonClick(event) {
		const button = event.target;

		if (button.classList.contains('number')) {
			updateOutput(button.textContent);
		} else if (button.classList.contains('operator')) {
			if (previousValue === null) {
				previousValue = currentValue;
				currentValue = null;
			} else if (currentValue !== null) {
				previousValue = calculate();
				currentValue = null;
				output.textContent = previousValue;
			}

			currentOperator = button.textContent;
		} else if (button.classList.contains('equals')) {
			if (previousValue !== null && currentValue !== null) {
				output.textContent = calculate();
				previousValue = null;
				currentValue = output.textContent;
			}
		} else if (button.classList.contains('clear')) {
			clear();
		}
	}

	function handleKeyDown(event) {
		const key = event.key;

		if (/[0-9.]/.test(key)) {
			event.preventDefault();
			updateOutput(key);
		} else if (/[\+\-\*\/\%]/.test(key)) {
			event.preventDefault();
			if (previousValue === null) {
				previousValue = currentValue;
				currentValue = null;
			} else if (currentValue !== null) {
				previousValue = calculate();
				currentValue = null;
				output.textContent = previousValue;
			}

			currentOperator = key;
		} else if (key === 'Enter') {
			event.preventDefault();
			if (previousValue !== null && currentValue !== null) {
				output.textContent = calculate();
				previousValue = null;
				currentValue = output.textContent;
			}
		} else if (key === 'Escape') {
			event.preventDefault();
			clear();
		}
	}

	buttons.forEach(function(button) {
		button.addEventListener('click', handleButtonClick);
	});

	document.addEventListener('keydown', handleKeyDown);
});