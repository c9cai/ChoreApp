//firebase
var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var ref = firebase.database().ref();
var userRef = firebase.database().ref("users");
var homeRef = firebase.database().ref("homes");

exports.viewHome = function (req, res) {
    var current_user = req.session.current_user;

    if (current_user != null) {
        if (req.session.current_user['setup'] != null)
            res.redirect(req.session.current_user['setup']);

        var email = current_user['email'];
        email = email.split('.').join('');

        var cuRef = userRef.child(email);

        cuRef.once("value", function (snapshot) {
            var user_data = snapshot.val();

            //BEGIN update chore schedule
            /*
            var todayDate = new Date();
            var today = user_data['today'];
            if (today == null)
                var i = -1;
            else
                var i = today.length - 1;
            while (i >= 0) {
                var duedate_string = today[i]['duedate'];
                var parts = duedate_string.split('/');
                var duedate = new Date(parts[2],parts[0]-1,parts[1]);

                var timeDiff = todayDate.getTime() - duedate.getTime();
                var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

                //chore is now overdue
                if (diffDays > 0) {
                    if (user_data['overdue'] == null)
                        user_data['overdue'] = [];

                    user_data['overdue'].push(today[i]);

                    user_data['rating'] -= 5;
                    if (user_data['rating'] < 0)
                        user_data['rating'] = 0;

                    user_data['today'].splice(i, 1);
                }

                i--;
            }

            var upcoming = user_data['upcoming'];
            if (upcoming == null)
                i = -1;
            else
                i = upcoming.length - 1;
            while (i >= 0) {
                var duedate_string = upcoming[i]['duedate'];
                var parts = duedate_string.split('/');
                var duedate = new Date(parts[2],parts[0]-1,parts[1]);

                var timeDiff = todayDate.getTime() - duedate.getTime();
                var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

                //chore is now overdue
                if (diffDays > 0) {
                    if (user_data['overdue'] == null)
                        user_data['overdue'] = [];

                    user_data['overdue'].push(upcoming[i]);

                    user_data['rating'] -= 5;
                    if (user_data['rating'] < 0)
                        user_data['rating'] = 0;

                    user_data['upcoming'].splice(i, 1);
                }

                //chore is now today
                if (diffDays == 0) {
                    if (user_data['today'] == null)
                        user_data['today'] = [];

                    user_data['today'].push(upcoming[i]);

                    user_data['upcoming'].splice(i, 1);
                }

                i--;
            }

            cuRef.set(user_data);
            */
            //END update chore schedule

            //set user's rating
            if (user_data['homeName'] != null) {
                //the user belongs to a house

                var rendData = user_data;

                if (user_data['rating'] > 80) {
                    rendData['hero_category'] = "hero";
                }
                else if (user_data['rating'] > 60) {
                    rendData['hero_category'] = "sidekick";
                }
                else if (user_data['rating'] > 40) {
                    rendData['hero_category'] = "civilian";
                }
                else if (user_data['rating'] > 20) {
                    rendData['hero_category'] = "minion";
                }
                else {
                    rendData['hero_category'] = "villian";
                }
                res.render('home', rendData);
            } else {
                //the user does not belong to a house yet
                res.redirect('no_home');
            }
        });
    } else {
        res.render('login');
    }

};

exports.jsonHome = function (req, res) {
    res.json(current_user);
};

exports.viewNoHome = function (req, res) {
    var current_user = req.session.current_user;

    if (current_user != null) {
        var email = current_user['email'];
        email = email.split('.').join('');

        ref.once("value", function (snapshot) {
            var data = snapshot.val();
            var user_data = data['users'];
            var invites_data = data['invites'];

            if (user_data[email] != null) { //there is a user logged in
                if (user_data[email]['homeName'] == null) { //the user does not belong to a house yet
                    //user's invites
                    if (invites_data != null)
                        if (invites_data[email] != null)
                            user_data[email]['invites'] = invites_data[email];

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


exports.createHome = function (req, res) {
    var current_user = req.session.current_user;

    var rendData = {};
    rendData['firstName'] = current_user['firstName'];

    var homeName = req.body.homeName;
    if (homeName == '')//null home name
        res.render('no_home', rendData);
    else {
        homeRef.once("value", function (snapshot) {
            var home_data = snapshot.val();

            if (home_data[homeName] != null) //home name taken
                res.render('no_home', rendData);
            else {//create home
                var updateHome = {};
                var email = current_user['email'];
                var authEmail = email.replace(".", "");
                updateHome[homeName] = [email];
                homeRef.update(updateHome);

                current_user['homeName'] = homeName;

                current_user['setup'] = "add_members";
                var cuRef = userRef.child(authEmail);
                cuRef.set(current_user);

                req.session.current_user = current_user;
            }
        });

        res.redirect('add_members');
    }
};
