export function ValidateEmail(inputText) {
	var mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
	if (inputText.match(mailformat)) {
		console.log('Valid email address!')
		return true
	} else {
		console.log('You have entered an invalid email address!')
		return false
	}
}
