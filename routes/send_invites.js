//firebase
var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var ref = firebase.database().ref();
var invites_ref = ref.child('invites');
var home_ref = ref.child('homes');

//local files
var current_user = require("../json/current_user.json");

exports.sendInvites = function(req, res) {
    if (current_user['current_user'] == null)
        res.render('login');
    else {
        var emails = req.body.emails;
        var homeName = current_user['current_user']['homeName'];

        //update invites
        invites_ref.once("value", function (snapshot) {
            var data = snapshot.val();

            var updateInvite;
            for (email in emails) {
                var authEmail = emails[email].split('.').join('');

                if(data == null) {//null invites key
                    updateInvite = {};
                    updateInvite[authEmail] = [homeName];
                    invites_ref.update(updateInvite);
                } else {
                    if (data[authEmail] == null) {//user has no invites
                        updateInvite = {};
                        updateInvite[authEmail] = [homeName];
                        invites_ref.update(updateInvite);
                    } else {//user already has invites
                        updateInvite = data[authEmail];
                        updateInvite.push(homeName);

                        var user_invites_ref = invites_ref.child(authEmail);
                        user_invites_ref.set(updateInvite);
                    }
                }
            }
        });

        //update people in home
        var current_home_ref = home_ref.child(homeName);
        current_home_ref.once("value", function(snapshot) {
            var data = snapshot.val();
            var homeUpdate = emails.concat(data);
            current_home_ref.set(homeUpdate);
        });
    }

    res.redirect('choose_chores');
}