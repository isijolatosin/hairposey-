export const triggerProgress = (setTimeleft, setCount, isReload) => {
	const interval = setInterval(() => {
		if (setTimeleft) {
			setTimeleft((oldValue) => {
				const newValue = oldValue + 10;

				if (newValue === 100) {
					clearInterval(interval);
				}

				return newValue;
			});
		}
		if (setCount) {
			setCount((oldValue) => {
				const newValue = oldValue - 1;

				if (newValue === 0) {
					clearInterval(interval);
				}

				return newValue;
			});
		}
	}, 1000);

	if (isReload) {
		window.setTimeout(function () {
			window.location.reload();
		}, 10000);
	}
};
