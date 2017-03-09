//firebase
var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var ref = firebase.database().ref();

exports.viewChores = function (req, res) {
    var current_user = req.session.current_user;

    if (current_user != null) {
        if (req.session.current_user['setup'] != null)
            res.redirect(req.session.current_user['setup']);

        var rendData = {};
        rendData['users'] = {};

        var current_email = current_user['email'];
        current_email = current_email.split('.').join('');
        var homeName = current_user['homeName'];
        rendData['firstName'] = current_user['firstName'];
        var users = [];

        ref.once("value", function(snapshot) {
            var data = snapshot.val();
            var home_data = data['homes'];
            var user_data = data['users'];

            rendData['rating'] = user_data[current_email]['rating'];
            if (rendData['rating'] > 80) {
                rendData['hero_category'] = "hero";
            }
            else if (rendData['rating'] > 60) {
                rendData['hero_category'] = "sidekick";
            }
            else if (rendData['rating'] > 40) {
                rendData['hero_category'] = "civilian";
            }
            else if (rendData['rating'] > 20) {
                rendData['hero_category'] = "minion";
            }
            else {
                rendData['hero_category'] = "villian";
            }


            for (var user in home_data[homeName]) {
                users.push(home_data[homeName][user]);
            }

            for (var user in users) {
                var email = users[user].split(',').join('');
                console.log(email);
                if (current_email != email) {
                    rendData['users'][email] = user_data[email];
                }
            }
            res.render('roommate_chores',rendData);
        });
    }
    else {
        res.render('login');
    }
};
