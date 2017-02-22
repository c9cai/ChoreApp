var current_user = require("../json/current_user.json");

var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
/*
firebase.database().ref('users').once('value').then(function(snapshot) {
  user_data = snapshot.val();
  console.log(user_data);
});*/
var ref = firebase.database().ref('users');
ref.on("value",function(snapshot) {
	user_data = snapshot.val();
});


firebase.database().ref('chores').once('value').then(function(snapshot) {
  chore_data = snapshot.val();
  //console.log(chore_data);
});

var user_dat = [];
var chore_data = [];



exports.viewPreferences = function(req, res) {

	var data = [];
	var choreCount = 0;
	var count = 1;
	var name;
	var rating;

	if (current_user['current_user'] != null) {

		for (user in user_data) {
        //console.log(user);
      if (user == current_user['current_user']['email'].replace(".",""))  {
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

    console.log(data);
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
