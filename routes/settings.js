var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;


var user_data = [];
var chore_data = [];
var homes_data = [];

var ref = firebase.database().ref('users');
ref.on("value", function (snapshot) {
    user_data = snapshot.val();
});

var ref2 = firebase.database().ref('chores');
ref2.on('value', function (snapshot) {
    chore_data = snapshot.val();
});

var home_ref = firebase.database().ref('homes');
home_ref.on('value', function (snapshot) {
    homes_data = snapshot.val();
});


exports.viewSettings = function (req, res) {
    var current_user = req.session.current_user;

    var data = [];
    var rating;
    var name;

    if (current_user != null) {
        if (req.session.current_user['setup'] != null)
            res.redirect(req.session.current_user['setup']);

        var homeName = current_user['homeName'];
        var home_data = homes_data[homeName];
        console.log(home_data);

        //loop through each user in home
        for (user in home_data) {
            var authEmail = home_data[user].split('.').join('');

            if (user_data[authEmail]['firstName'] == null)
                continue;

            //get first and last name of user
            var first = user_data[authEmail]['firstName'];
            var last = user_data[authEmail]['lastName'];
            data.push(first + ' ' + last);

            //set rating and firstname of current user
            if (authEmail == current_user['email'].split('.').join('')) {
                rating = user_data[authEmail]['rating'];
                name = user_data[authEmail]['firstName'];
            }
        }

        var rendData = {};
        rendData["users"] = data;
        rendData['chores'] = chore_data[homeName];
        rendData['rating'] = rating;
        rendData['name'] = name;

        if (rating > 80) {
            rendData['hero_category'] = "hero";
        }
        else if (rating > 60) {
            rendData['hero_category'] = "sidekick";
        }
        else if (rating > 40) {
            rendData['hero_category'] = "civilian";
        }
        else if (rating > 20) {
            rendData['hero_category'] = "minion";
        }
        else {
            rendData['hero_category'] = "villian";
        }

        res.render('settings', rendData);
    }
    else {
        res.render('login');
    }
};
