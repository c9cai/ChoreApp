var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;

var userdata = []

firebase.database().ref('users').once('value').then(function(snapshot) {
  

  user_data = snapshot.val();
  //console.log(user_data);


});

exports.viewScores = function(req, res) {
    var current_user = req.session.current_user;

    //console.log(current_user['email'].replace(".",""));
    
    if (current_user != null) {

      var data = [];
      for (user in user_data) {
        //console.log(user);
        if (user == current_user['email'].split('.').join('')) data.push(user_data[user]);
      }

      for (user in user_data) {
        if (user != current_user['email'].split('.').join('')) data.push(user_data[user]);
      }

      rendData = {};
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
 