//firebase
var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var userRef = firebase.database().ref("users");
var homeRef = firebase.database().ref("homes");

exports.viewAddMembers = function (req, res) {
    var current_user = req.session.current_user;

    if (current_user != null) {
        var email = current_user['email'];
        email = email.split('.').join('');
        rendData = {};


        userRef.once("value", function (snapshot) {
            var user_data = snapshot.val();

            if (user_data[email] != null) { //there is a user logged in
                rendData['firstName'] = user_data[email]['firstName'];
                rendData['homeName'] = user_data[email]['homeName'];

                res.render('add_members', rendData);
            }

            else { //there is no user logged in
                res.render("login");
            }
        });
    } else {
        res.render('login');
    }

};