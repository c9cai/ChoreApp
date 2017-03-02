var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;


var user_data = [];
var chore_data = [];
var home_data = [];

var ref = firebase.database().ref('users');
ref.on("value", function (snapshot) {
    user_data = snapshot.val();
});

var ref2 = firebase.database().ref('defaultChores');
ref2.on('value', function (snapshot) {
    chore_data = snapshot.val();
});

var homeRef = firebase.database().ref('homes');
homeRef.on('value', function (snapshot) {
    home_data = snapshot.val();
});


exports.saveCustomChores = function (req, res) {
    var current_user = req.session.current_user;

    var data = req.body.saveinput;
    console.log(data);

    var newString = data.split('-').join(' ');
    var fin = newString.split(',');
    var uname = current_user['email'].replace(".", "");

    var prevData = [];

    for (home in home_data) {
        if (home == user_data[uname]['homeName']) {
            console.log(home);
            console.log(user_data[uname]['homeName']);
            prevData = home_data[home];
        }
    }

    var home = user_data[uname]['homeName'];
    console.log(prevData);
    console.log(fin);
    var storeRef = firebase.database().ref('chores/' + home).set(prevData.concat(fin));

    if (current_user != null) {
        var email = current_user['email'];
        email = email.replace(".", "");
        if (user_data[email] != null)
            res.render('home', user_data[email]);
        else
            res.render("login");
    }
};

