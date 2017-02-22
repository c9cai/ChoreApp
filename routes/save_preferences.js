var current_user = require("../json/current_user.json");


var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;


exports.savePreferences = function(req, res) {
	var uname = current_user['current_user']['email'].replace(".","");
	var saveString = req.body.save;
	var newString = saveString.split('[]=').join(' ');
	saveString = newString.split('-').join(' ');
	var data = saveString.split('&');
	console.log(data);

	var ref = firebase.database().ref('users/' + uname + '/preferences').set(data);

	res.redirect('/home');
};