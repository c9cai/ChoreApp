var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;


exports.savePreferences = function(req, res) {
    var current_user = req.session.current_user;

	var uname = current_user['email'].split('.').join('');
	var saveString = req.body.save;
	var newString = saveString.split('[]=').join(' ');
	saveString = newString.split('-').join(' ');
	var data = saveString.split('&');

	var ref = firebase.database().ref('users/' + uname + '/preferences').set(data);

	res.redirect('/home');
};