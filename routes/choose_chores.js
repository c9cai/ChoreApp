var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var userRef = firebase.database().ref("users");
var choreRef = firebase.database().ref('defaultChores');
var homeRef = firebase.database().ref('homes');


var user_data;
var chore_data;
var home_data;

userRef.on("value", function (snapshot) {
    user_data = snapshot.val();
});

choreRef.on('value', function (snapshot) {
    chore_data = snapshot.val();
});

homeRef.on('value', function (snapshot) {
    home_data = snapshot.val();
});

exports.viewChores = function (req, res) {
    var current_user = req.session.current_user;

    if (current_user != null) {

        var email = current_user['email'];
        email = email.split('.').join('');
        var rendData = {};


        if (user_data[email] != null) { //there is a user logged in
            rendData['firstName'] = user_data[email]['firstName'];
            rendData['homeName'] = user_data[email]['homeName'];
        }

        else { //there is no user logged in
            res.render("login");
        }


        rendData["defaultChores"] = chore_data;

        res.render('choose_chores', rendData);

    } else {
        res.render('login');
    }

};

//SOMEBODY HELP ME WRITE THIS PLEASE
exports.saveChores = function (req, res) {
    var current_user = req.session.current_user;

    var dbData;
    var toStore = [];
    var data = req.body.saveinput;
    console.log(data);
    var dataArray = data.split(",");
    var dataLen = dataArray.length / 3;
    console.log(dataLen);

    var uname = current_user['email'].split('.').join('');
    var home = user_data[uname]['homeName'];

    //set chores for home
    for (i = 0; i < dataLen; i++) {
        dbData = {};

        var count = 1;
        for (person in home_data[home]) {
            dbData[count] = home_data[home][person];
            count++;
        }

        dbData["choreName"] = dataArray[i];
        dbData["description"] = dataArray[i + dataLen];
        dbData["frequency"] = dataArray[i + dataLen * 2];
        firebase.database().ref('chores/' + home + "/" + dataArray[i]).set(dbData);
    }

    //set default preferences for users
    var defaultPreferences = dataArray.splice(0,dataLen);
    homeRef.child(home).once("value", function(snapshot) {
        var homeData = snapshot.val();

        for (var u in homeData) {
            var user = homeData[u].split('.').join('');

            firebase.database().ref('users/' + user + "/preferences/").set(defaultPreferences);
        }
    });

    if (current_user != null) {
        //update current user's set up
        var authEmail = current_user['email'].split('.').join('');
        var cu_ref = userRef.child(authEmail);
        cu_ref.once("value", function(snapshot) {
            var data = snapshot.val();
            data['setup'] = "preferences";
            cu_ref.set(data);
        });
        req.session.current_user['setup'] = "preferences";

        res.redirect('create_schedule');
    }
    else {
        res.render('login');
    }


};
