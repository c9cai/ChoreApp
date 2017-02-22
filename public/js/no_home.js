'use strict';

$(document).ready(function(){    
	console.log("no_home.js connected");
	$('#create-house').on('show.bs.collapse', function() {
    	$("#create-house-chevron").addClass('glyphicon-menu-up').removeClass('glyphicon-menu-down');
  	});
	$('#create-house').on('hide.bs.collapse', function() {
    	$("#create-house-chevron").addClass('glyphicon-menu-down').removeClass('glyphicon-menu-up');
  	});


  	$('#find-house').on('show.bs.collapse', function() {
    	$("#find-house-chevron").addClass('glyphicon-menu-up').removeClass('glyphicon-menu-down');
  	});
	$('#find-house').on('hide.bs.collapse', function() {
    	$("#find-house-chevron").addClass('glyphicon-menu-down').removeClass('glyphicon-menu-up');
  	});

});