'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    
    $('#add_chore_button').on('click', function(e) {
        e.preventDefault();
        console.log("made it to add chore button clicked");

        $('#chores').append('<div class="row">' +
                    '<span class="glyphicon glyphicon-remove remove-chore"></span>' +
                    '<input type="text" class="chore_name"/>' +
                    '<input type="text" class="chore_description"/>' +
                    '<label>Every</label><input type="text" class="chore_frequency"/><label>Days</label>' +
                    '</div><br>');
    });

    $('#chores').on('click', ".remove-chore", function(e) {
        e.preventDefault();
        console.log("made it to remove clicked");
        $(this).parent().remove();
    });
    
})

function count() {
    var selected = [];      
    $('#chores').each(function() {
        var newChore = {};
        newChore['choreName'] = $(this).find("#chore_name").val();
        newChore['description'] = $(this).find("#chore_description").val();
        newChore['frequency'] = $(this).find("#chore_frequency").val();
        selected.push(newChore);
    });

    alert(selected.join('\n'));
    $("#saveinput").val(selected);
}

