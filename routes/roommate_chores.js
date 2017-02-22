//firebase
var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var ref = firebase.database().ref();

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

        ref.once("value", function(snapshot) {
            var data = snapshot.val();
            var home_data = data['homes'];
            var user_data = data['users'];

            rendData['rating'] = user_data[email]['rating'];

            for (var user in home_data[homeName]) {
                users.push(home_data[homeName][user]);
            }

            for (var user in users) {
                email = users[user].replace(".", "");
                console.log(email);
                rendData['users'][email] = user_data[email];
            }

            res.render('roommate_chores',rendData);
        });
    }
    else {
        res.render('login');
    }
};
