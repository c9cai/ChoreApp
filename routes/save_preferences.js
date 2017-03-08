var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;

var userRef = firebase.database().ref('users');


exports.savePreferences = function(req, res) {
    var current_user = req.session.current_user;

	var uname = current_user['email'].split('.').join('');
	var saveString = req.body.save;
	var newString = saveString.split('[]=').join(' ');
	saveString = newString.split('-').join(' ');
	var data = saveString.split('&');

	firebase.database().ref('users/' + uname + '/preferences').set(data);

    //update current user's set up
    var authEmail = current_user['email'].split('.').join('');
    var cu_ref = userRef.child(authEmail);
    cu_ref.once("value", function(snapshot) {
        var data = snapshot.val();
        data['setup'] = null;
        cu_ref.set(data);
    });
    req.session.current_user['setup'] = null;

	res.redirect('/home');
};