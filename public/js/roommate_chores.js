'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});


function onClick() {
	ga("send", "event", "clickCount", "click");
}
/*
 * Function that is called when the document is ready.
 */
