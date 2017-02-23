var current_user = require("../json/current_user.json");

var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var userRef = firebase.database().ref("users");
var choreRef = firebase.database().ref('defaultChores');


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

        //get the default chores to render
        choreRef.once('value',function(snapshot) {
            var chore_data = snapshot.val();
            console.log(chore_data);
            rendData["defaultChores"] = chore_data;
        });

        res.render('choose_chores', rendData);
    }
    else {
        res.render('login');
    }
};


//SOMEBODY HELP ME WRITE THIS PLEASE
exports.saveChores = function(req, res) {
      var data = req.body.saveinput;
      console.log(data);
      // var newString = data.split('-').join(' ');
      // var fin = newString.split(',');
      //   var uname = current_user['current_user']['email'].replace(".","");

      //   var home = user_data[uname]['homeName'];
      //   var storeRef = firebase.database().ref('chores/' + home).set(fin);

    if (current_user['current_user'] != null) {

        res.render('home');
    }
    else {
        res.render('login');
    }


};
