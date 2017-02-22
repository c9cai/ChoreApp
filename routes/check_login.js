//firebase
var firebase = require('firebase').initializeApp({
    serviceAccount: "./ChoreApp-d6f6f8302527.json",
    databaseURL: "https://choreapp-ed3c0.firebaseio.com"
});

var userRef = firebase.database().ref("users");

//local files
var current_user = require("../json/current_user.json");

exports.checkLogin = function(req, res) {
    var username = req.body.username.replace(".","");
    var password = req.body.password;
    var check = false;

    console.log("check login");

    userRef.on("value", function(snapshot) {
        var user_data = snapshot.val();

        if (user_data[username] != null) {
            if (user_data[username]['password'] == password) {
                check = true;
                current_user['current_user'] = user_data[username];

                console.log("login success");
                res.redirect("/home");
            } else
                res.render('login');
        } else
            res.render('login');
    });
};