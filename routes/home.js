//firebase
var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var userRef = firebase.database().ref("users");

//local files
var current_user = require("../json/current_user.json");

exports.viewHome = function(req, res) {
    if (current_user['current_user'] != null) {
        var email = current_user['current_user']['email'];
        var email = email.replace(".","");

        userRef.on("value", function(snapshot) {
            var user_data = snapshot.val();

            if (user_data[email] != null)
                res.render('home', user_data[email]);
            else
                res.render("login");

        });
    } else {
        res.render('login');
    }
};

exports.jsonHome = function(req, res) {
    res.json(current_user);
};


//Can be deleted when the viewHome function is updated to reroute to no_home when appropriate
exports.viewNoHome = function(req, res) {
    var username = current_user['current_user']['username'];
    var password = current_user['current_user']['password'];
    var rendData = {};
    rendData['username'] = username;

    res.render('no_home', rendData);
};