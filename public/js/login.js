'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	
	initializePage();

	//carousel css
    $(".login-carousel").slick({
        slidesToShow: 5,
        centerMode: false,
        infinite: true,
        responsive: [
            {
              breakpoint: 600,
              settings: {
                centerMode: false,
                slidesToShow: 1,
                arrows: false,
                infinite: true,
                initialSlide: 2,
                autoplay: true,
                autoplaySpeed: 4000,
              }
            },
            {
              breakpoint: 480,
              settings: {
                centerMode: false,
                slidesToShow: 1,
                arrows: false,
                infinite: true,
                initialSlide: 2,
                autoplay: true,
                autoplaySpeed: 4000,
              }
            }
        ]
    });
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log(" login Javascript connected!");
}
