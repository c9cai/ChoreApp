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

            if (user_data[email] != null) { //there is a user logged in
                if (user_data[email]['homeName'] != null) { 
                    //the user belongs to a house
                    res.render('home', user_data[email]);
                }
                else {
                    //the user does not belong to a house yet
                    res.redirect('no_home');
                }
            }

            else { //there is no user logged in
                res.render("login");
            }
        });
    } else {
        res.render('login');
    }

};

exports.jsonHome = function(req, res) {
    res.json(current_user);
};

exports.viewNoHome = function(req, res) {
    if (current_user['current_user'] != null) {
        var email = current_user['current_user']['email'];
        email = email.replace(".","");

        userRef.once("value", function(snapshot) {
            var user_data = snapshot.val();

            if (user_data[email] != null) { //there is a user logged in
                if (user_data[email]['homeName'] == null) { 
                    //the user does not belong to a house yet
                    res.render('no_home', user_data[email]);
                }
                else {
                    //the user belongs to a house
                    res.redirect('home');
                }
            }

            else { //there is no user logged in
                res.render("login");
            }
        });
    } else {
        res.render('login');
    }
};



exports.createHome = function(req, res) {
    var rendData = {};
    rendData['firstName'] = current_user['current_user']['firstName'];

    var homeName = req.body.homeName;
    if (homeName == '')//null home name
        res.render('no_home', rendData);
    else {
        homeRef.once("value", function(snapshot) {
           var home_data = snapshot.val();

           if (home_data[homeName] != null) //home name taken
               res.render('no_home', rendData);
           else {//create home
               var updateHome = {};
               var email = current_user['current_user']['email'];
               var authEmail = email.replace(".","");
               updateHome[homeName] = [email];
               homeRef.update(updateHome);

               current_user['current_user']['homeName'] = homeName;

               var cuRef = userRef.child(authEmail);
               cuRef.set(current_user['current_user']);

               res.redirect('add_members');
           }
        });
    }
};
