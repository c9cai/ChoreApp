//firebase
var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var ref = firebase.database().ref();
var invites_ref = ref.child('invites');
var home_ref = ref.child('homes');
var user_ref = ref.child('users');

exports.sendInvites = function(req, res) {
    var current_user = req.session.current_user;

    if (current_user == null)
        res.render('login');
    else {
        var emails = req.body.emails;
        var homeName = current_user['homeName'];

        //update invites
        invites_ref.once("value", function (snapshot) {
            var data = snapshot.val();

            var updateInvite;
            for (email in emails) {
                var authEmail = emails[email].split('.').join('');


                if(data == null) {//null invites key
                    console.log("null invite key");
                    updateInvite = {};
                    updateInvite[authEmail] = [homeName];
                    invites_ref.update(updateInvite);
                } else {
                    console.log("user has no invites");
                    if (data[authEmail] == null) {//user has no invites
                        updateInvite = {};
                        updateInvite[authEmail] = [homeName];
                        invites_ref.update(updateInvite);
                    } else {//user already has invites
                        console.log("user already has invites");
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
            var homeUpdate = data.concat(emails);
            current_home_ref.set(homeUpdate);
        });

        //initialize people invited
        user_ref.once("value", function(snapshot) {
           var user_data = snapshot.val();
           for (var email in emails) {
               var authEmail = emails[email].split('.').join('');

               if (user_data[authEmail] == null) {//nonexistent user
                   var userUpdate = {};
                   userUpdate[authEmail] = {
                       "email": email,
                       "rating": 61,
                   };

                   user_ref.update(userUpdate);
               }
           }
        });

        //update current user's set up
        var authEmail = current_user['email'].split('.').join('');
        var cu_ref = user_ref.child(authEmail);
        cu_ref.once("value", function(snapshot) {
            var data = snapshot.val();
            data['setup'] = "choose_chores";
            cu_ref.set(data);
        });
        req.session.current_user['setup'] = "choose_chores";
    }

    res.redirect('choose_chores');
}

exports.acceptInvite  = function (req, res) {
    var current_user = req.session.current_user;

    for (var home in req.body) {
        var homeName = req.body[home];
    }

    var updateHome = {};
    updateHome['homeName'] = homeName;
    req.session.current_user['homeName'] = homeName;

    var authEmail = current_user['email'].split('.').join('');
    var cuUserRef = user_ref.child(authEmail);
    cuUserRef.update(updateHome);

    res.redirect('preferences');
}