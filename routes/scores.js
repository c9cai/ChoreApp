var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;

var userdata = []
var homes_data = []

firebase.database().ref('users').once('value').then(function(snapshot) {
  user_data = snapshot.val();
  //console.log(user_data);
});

var home_ref = firebase.database().ref('homes');
home_ref.on('value', function (snapshot) {
    homes_data = snapshot.val();
});

exports.viewScores = function(req, res) {
    var current_user = req.session.current_user;
    
    if (current_user != null) {

        var home_data = [];
        var email_data = [];  //this will be filled with a list of all the emails in the current user's home
        var data = [];
        var rendData = {};

        /*find the home of the current user */
        var homeName = current_user['homeName'];
        var home_data = homes_data[homeName];
        
        //loop through each user in home
        for (user in home_data) {
            var authEmail = home_data[user].split('.').join('');
            email_data.push(authEmail);
        }

        //add the current user to data first so that it will be the first user in the list
        var current_email = current_user['email'].split('.').join('');
        data.push(user_data[current_email]);
        if (user_data[current_email]['rating'] > 80) {
            rendData['hero_category'] = "hero";
        }
        else if (user_data[current_email]['rating'] > 60) {
            rendData['hero_category'] = "sidekick";
        }
        else if (user_data[current_email]['rating'] > 40) {
            rendData['hero_category'] = "civilian";
        }
        else if (user_data[current_email]['rating'] > 20) {
            rendData['hero_category'] = "minion";
        }
        else {
            rendData['hero_category'] = "villian";
        }

        //add the other users of the house to data
        for (var i = 0; i < email_data.length; i++) {
            if (email_data[i] != current_email) {
                data.push(user_data[email_data[i]]);
            }
        }

        
        rendData['users'] = data;
        console.log(rendData);

        res.render('scores', rendData);
    }
    else {
        res.render('login');
    }
  	
};

exports.jsonScores = function(req, res) {
    var current_user = req.session.current_user;

    //res.json(user_data);
};
 