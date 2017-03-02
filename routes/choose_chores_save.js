var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;


var user_data = [];
var chore_data = [];

var ref = firebase.database().ref('users');
ref.on("value", function (snapshot) {
    user_data = snapshot.val();
});

var ref2 = firebase.database().ref('defaultChores');
ref2.on('value', function (snapshot) {
    chore_data = snapshot.val();
});


exports.saveChores = function (req, res) {
    var current_user = req.session.current_user;

    var data = req.body.saveinput;
    var newString = data.split('-').join(' ');
    var fin = newString.split(',');
    var uname = current_user['email'].replace(".", "");

    var home = user_data[uname]['homeName'];
    var storeRef = firebase.database().ref('chores/' + home).set(fin);

    if (current_user != null) {

        res.render('custom_chores');
    }
    else {
        res.render('login');
    }


};