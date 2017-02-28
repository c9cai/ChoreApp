//firebase
var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var ref = firebase.database().ref();

exports.viewChores = function (req, res) {
    var current_user = req.session.current_user;

    if (current_user != null) {
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

            for (var user in home_data[homeName]) {
                users.push(home_data[homeName][user]);
            }

            console.log(current_email);
            for (var user in users) {
                var email = users[user].replace(".", "");
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
