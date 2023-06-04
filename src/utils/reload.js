/* eslint-disable no-restricted-globals */
function reload() {
	setTimeout(() => {
		// Store the current scroll position
		localStorage.setItem("scrollPosition", window.scrollY);

		// Reload the page
		location.reload();
	}, 500);
}

export default reload;
