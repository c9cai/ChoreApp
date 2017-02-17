'use strict';

$(document).ready(function(){    
	console.log("settings.js connected");
	$('#notifications').on('show.bs.collapse', function() {
    	$("#notifications-chevron").addClass('glyphicon-menu-up').removeClass('glyphicon-menu-down');
  	});
	$('#notifications').on('hide.bs.collapse', function() {
    	$("#notifications-chevron").addClass('glyphicon-menu-down').removeClass('glyphicon-menu-up');
  	});


  	$('#feedback').on('show.bs.collapse', function() {
    	$("#feedback-chevron").addClass('glyphicon-menu-up').removeClass('glyphicon-menu-down');
  	});
	$('#feedback').on('hide.bs.collapse', function() {
    	$("#feedback-chevron").addClass('glyphicon-menu-down').removeClass('glyphicon-menu-up');
  	});


  	$('#house-members').on('show.bs.collapse', function() {
    	$("#member-chevron").addClass('glyphicon-menu-up').removeClass('glyphicon-menu-down');
  	});
	$('#house-members').on('hide.bs.collapse', function() {
    	$("#member-chevron").addClass('glyphicon-menu-down').removeClass('glyphicon-menu-up');
  	});
});