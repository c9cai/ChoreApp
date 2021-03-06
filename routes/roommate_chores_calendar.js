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

            console.log(current_email);
            for (var user in users) {
                var email = users[user].replace(".", "");
                console.log(email);
                if (current_email != email) {
                    rendData['users'][email] = user_data[email];
                }
            }

            console.log(rendData);
            console.log(rendData['users']["brianchao@gmailcom"]['overdue']);

            var count = 0;
            for (user in rendData['users']) {
                if (user != current_email) {
                    console.log(user);
                    for (chore in rendData['users'][user]['overdue']) {
                        var dd = rendData['users'][user]['overdue'][count].duedate;
                        var newDate = dd.split('/');
                        var toRet = newDate[2] + '-' + newDate[0] + '-' + newDate[1];
                        rendData['users'][user]['overdue'][0].duedate = toRet;
                        count++;
                    }
                    count = 0;
                    for (chore in rendData['users'][user]['today']) {
                        var dd = rendData['users'][user]['today'][count].duedate;
                        var newDate = dd.split('/');
                        var toRet = newDate[2] + '-' + newDate[0] + '-' + newDate[1];
                        rendData['users'][user]['today'][0].duedate = toRet;
                        count++;
                    }
                    count = 0;
                    for (chore in rendData['users'][user]['upcoming']) {
                        var dd = rendData['users'][user]['upcoming'][count].duedate;
                        var newDate = dd.split('/');
                        var toRet = newDate[2] + '-' + newDate[0] + '-' + newDate[1];
                        rendData['users'][user]['upcoming'][0].duedate = toRet;
                        count++;
                    }
                   
                }
                count = 0;
            }

            res.render('roommate_chores_calendar',rendData);
        });
    }
    else {
        res.render('login');
    }
};
