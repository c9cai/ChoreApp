'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function () {

    $('#add_housemate_button').on('click', function (e) {
        e.preventDefault();
        console.log("made it to add housemate button clicked");
        var housemate_email = $('#housemate_email').val();
        console.log(housemate_email);

        if (housemate_email != null && housemate_email != undefined) {
            $('#invitees').append('<p><input type="hidden" name="emails[]" value="' + housemate_email + '">' +
                '<span class="glyphicon glyphicon-remove remove-invitee"></span>' +
                housemate_email + '</input></p>');
            $('#housemate_email').val('');
        }
    });

    $('#invitees').on('click', ".remove-invitee", function (e) {
        e.preventDefault();
        console.log("made it to remove clicked");
        $(this).parent().remove();
    });


})

