//firebase
var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var userRef = firebase.database().ref("users");
var homeRef = firebase.database().ref("homes");

//local files
var current_user = require("../json/current_user.json");

exports.viewChores = function (req, res) {

    if (current_user['current_user'] != null) {
        var rendData = {};
        rendData['users'] = {};

        var email = current_user['current_user']['email'];
        email = email.replace(".", "");
        var homeName = current_user['current_user']['homeName'];
        rendData['firstName'] = current_user['current_user']['firstName'];
        var users = [];

        //get users in home
        homeRef.once("value", function (snapshot) {
            var home_data = snapshot.val();

            for (var user in home_data[homeName]) {
                users.push(home_data[homeName][user]);
            }
        });

        //get rating and chores of each user
        userRef.once("value", function (snapshot) {
            var user_data = snapshot.val();
            rendData['rating'] = user_data[email]['rating'];

            for (var user in users) {
                email = users[user].replace(".", "");
                rendData['users'][email] = user_data[email];
            }

            res.render('roommate_chores',rendData);
        });
    }
    else {
        res.render('login');
    }
};
