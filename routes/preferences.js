var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
/*
firebase.database().ref('users').once('value').then(function(snapshot) {
  user_data = snapshot.val();
  console.log(user_data);
});*/

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





exports.viewPreferences = function(req, res) {
    var current_user = req.session.current_user;

	var data = [];
	var choreCount = 0;
	var count = 1;
	var name;
	var rating;

	if (current_user != null) {

		for (user in user_data) {
        //console.log(user);
      if (user == current_user['email'].split('.').join(''))  {
      	//var homeName = user_data[user]['homeName'];
      	//console.log(homeName);
      	rating = user_data[user]['rating'];
      	name = user_data[user]['firstName'];
      	for (chore in user_data[user]['preferences']) {
      		console.log(user_data[user]['preferences'][chore]);
      		data.push(user_data[user]['preferences'][chore].split(" ").join("-"));
      	}
      }
    }

    var rendData = {};
    rendData['chores'] = data;
    rendData['name'] = name;
    rendData['rating'] = rating;   
    res.render('preferences', rendData);
	}
	else {
		res.render('login');
	}
};
