var current_user = require("../json/current_user.json");

var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var userRef = firebase.database().ref("users");
var choreRef = firebase.database().ref('defaultChores');
var homeRef = firebase.database().ref('homes');


var user_data;
var chore_data;
var home_data;

 userRef.on("value", function(snapshot) {
    user_data = snapshot.val();
});

choreRef.on('value',function(snapshot) {
    chore_data = snapshot.val();
});

homeRef.on('value',function(snapshot) {
    home_data = snapshot.val();
});

exports.viewChores = function(req, res) {
    if (current_user['current_user'] != null) {
        var email = current_user['current_user']['email'];
        email = email.replace(".","");
        var rendData = {};


    if (user_data[email] != null) { //there is a user logged in
        rendData['firstName'] = user_data[email]['firstName'];
        rendData['homeName'] = user_data[email]['homeName'];
    }

    else { //there is no user logged in
        res.render("login");
    }
            


    rendData["defaultChores"] = chore_data;
        

        console.log(rendData);

        res.render('choose_chores', rendData);

    } else {
        res.render('login');
    }

};

//SOMEBODY HELP ME WRITE THIS PLEASE
exports.saveChores = function(req, res) {

      var dbData;
      var toStore = [];
      var data = req.body.saveinput;
      console.log(data);
      var dataArray = data.split(",");
      var dataLen = dataArray.length / 3;
      console.log(dataLen);

      var uname = current_user['current_user']['email'].replace(".","");

      var home = user_data[uname]['homeName'];

      for (i=0;i<dataLen;i++) {


        dbData = {};

        var count = 1;
        for (person in home_data[home]) {
            dbData[count] = home_data[home][person];
            count++;
        }

        dbData["choreName"] = dataArray[i];
        dbData["description"] = dataArray[i+dataLen];
        dbData["frequency"] = dataArray[i + dataLen*2];
        var storeRef = firebase.database().ref('chores/' + home + "/" + dataArray[i]).set(dbData);
        var storeRef2 = firebase.database().ref('users/' + uname + "/preferences/" + dataArray[i]).set(dataArray[i]);

      }

    if (current_user['current_user'] != null) {

        res.redirect('preferences');
    }
    else {
        res.render('login');
    }


};
