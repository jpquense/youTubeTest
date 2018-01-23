"use strict";

$(runMethods);

function removeValidation() {

	$('.js-term').focus(event => {
	console.log('removeValidation ran');
	
	});
}

function runMethods() {
	removeValidation();
}
