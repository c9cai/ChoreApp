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
    var choreName = [];
    var choreDescription = [];
    var frequency = [];
    var selected = [];
    
    $("input.chore_name").each(function() {
        choreName.push($(this).val());
    });
    $("input.chore_description").each(function() {
        choreDescription.push($(this).val());
    });
    $("input.chore_frequency").each(function() {
        frequency.push($(this).val());
    });

    //alert(choreName.join('\n'));
    //alert(choreDescription.join('\n'));
    //alert(frequency.join('\n'));
    selected.push(choreName);
    selected.push(choreDescription);
    selected.push(frequency);
    alert(selected.join('\n'));

    $("#saveinput").val(selected);
}
