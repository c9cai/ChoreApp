'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	
	initializePage();

	//carousel css
    $(".carousel").slick({
        slidesToShow: 4,
        centerMode: true,
        responsive: [
            {
              breakpoint: 600,
              settings: {
                centerMode: true,
                slidesToShow: 2,
                arrows: false,
              }
            },
            {
              breakpoint: 480,
              settings: {
                centerMode: true,
                slidesToShow: 2,
                arrows: false,
              }
            }
        ]
    });

	$("#score-bar").click(function(e) {
		e.preventDefault();
		updateScoreBar(-3);
	});
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
}

function updateScoreBar(change) {
    var elem = document.getElementById("score-bar"); 
    var width = Math.round($("#score-bar").width() / $("#score-bar").parent().width() * 100);
    console.log(width);
    var id = setInterval(frame, 50);
    function frame() {
        if (change == 0 || width == 0) {
            clearInterval(id);
        } else {
        	if (change > 0) {
        		width++;
        		change--;
        	}
            else if (change < 0) {
            	width--;
            	change++;
            }
            elem.style.width = width + '%'; 
            document.getElementById("score-label").innerHTML = width * 1;
        }
    }
}