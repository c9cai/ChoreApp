//firebase
var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;

var userRef = firebase.database().ref("users");

//local files
var current_user = require("../json/current_user.json");

exports.checkLogin = function (req, res) {
    var username = req.body.username.split('.').join('');
    var password = req.body.password;
    var check = false;

    userRef.once("value", function (snapshot) {
        var user_data = snapshot.val();

        if (user_data[username] != null) {
            if (user_data[username]['password'] == password) {
                check = true;

                req.session.current_user = user_data[username];
                if (req.session.current_user['setup'] != null)
                    res.redirect(req.session.current_user['setup']);

                res.redirect("/home");
            } else
                res.render('login');
        } else {
            var rendData = {"error1": "<p class=\"alert alert-warning\">Invalid Login</p>"};
            res.render('login', rendData);
        }
    });
};