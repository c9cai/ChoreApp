var current_user = require("../json/current_user.json");

var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;


var user_data = [];
var chore_data = [];

var ref = firebase.database().ref('users');
ref.on("value",function(snapshot) {
    user_data = snapshot.val();
});

var ref2 = firebase.database().ref('chores');
ref2.on('value',function(snapshot) {
    chore_data = snapshot.val();
});


exports.viewSettings = function(req, res) {
    data = [];
    var rating;
    var name; 

    if (current_user['current_user'] != null) {
        
        for (user in user_data) {
            //console.log(user);
          var first = user_data[user]['firstName'];
          var last = user_data[user]['lastName'];
          data.push(first + ' ' + last);
          if (user == current_user['current_user']['email'].replace(".",""))  {
            //var homeName = user_data[user]['homeName'];
            //console.log(homeName);
            rating = user_data[user]['rating'];
            name = user_data[user]['firstName'];
          }
        }

        
        var rendData = {};
        rendData["users"] = data;
        rendData['rating'] = rating;
        rendData['name'] = name;

        res.render('settings', rendData);
    }
    else {
            res.render('login');
    }
};
