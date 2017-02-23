//firebase
var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var userRef = firebase.database().ref("users");
var homeRef = firebase.database().ref("homes");

//local files
var current_user = require("../json/current_user.json");

exports.viewHome = function(req, res) {
    if (current_user['current_user'] != null) {
        var email = current_user['current_user']['email'];
        email = email.replace(".","");

        userRef.once("value", function(snapshot) {
            var user_data = snapshot.val();

            if (user_data[email] != null)
                res.render('home', user_data[email]);
            else
                res.render("login");

            //if (make check to see if user is not in a house) {
            //    res.render('no_home');
            //}
        });
    } else {
        res.render('login');
    }

};

exports.jsonHome = function(req, res) {
    res.json(current_user);
};

exports.viewNoHome = function(req, res) {
    var rendData = {};
    rendData['firstName'] = current_user['current_user']['firstName'];

    res.render('no_home', rendData);
};

exports.createHome = function(req, res) {
    var rendData = {};
    rendData['firstName'] = current_user['current_user']['firstName'];

    var homeName = req.body.homeName;
    if (homeName == '')
        res.render('no_home', rendData);
    else {
        homeRef.once("value", function(snapshot) {
           var home_data = snapshot.val();

           if (home_data[homeName] != null)
               res.render('no_home', rendData);
           else {
               var updateHome = {};
               var email = current_user['current_user']['email'];
               var authEmail = email.replace(".","");
               updateHome[homeName] = [email];
               homeRef.update(updateHome);

               current_user['current_user']['homeName'] = homeName;

               var cuRef = userRef.child(authEmail);
               cuRef.set(current_user['current_user']);

               res.redirect('choose_chores_initial');
           }
        });
    }
};
