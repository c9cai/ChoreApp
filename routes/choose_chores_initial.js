var current_user = require("../json/current_user.json");

var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var userRef = firebase.database().ref("users");
var homeRef = firebase.database().ref("homes");


exports.viewChores = function(req, res) {
    if (current_user['current_user'] != null) {
        var email = current_user['current_user']['email'];
        email = email.replace(".","");
        var rendData = {};

        userRef.once("value", function(snapshot) {
            var user_data = snapshot.val();

            if (user_data[email] != null) { //there is a user logged in
                rendData['firstName'] = user_data[email]['firstName'];
                rendData['homeName'] = user_data[email]['homeName'];
            }

            else { //there is no user logged in
                res.render("login");
            }
        });

        /*
        rendData['default_chores'] = [];
        rendData['default_chores'].push({'name':'Wash Dishes'});
        rendData['default_chores'].push({'name':'Take out Trash'});
        rendData['default_chores'].push({'name':'Check Mail'});
        rendData['default_chores'].push({'name':'Sweep Patio'});*/

        res.render('choose_chores_initial', rendData);
    }
    else {
        res.render('login');
    }


};