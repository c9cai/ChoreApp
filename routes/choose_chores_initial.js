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

exports.viewChores = function(req, res) {
    if (current_user['current_user'] != null) {
        /*

        var username = chore_data['current_user']['username'];
        var password = chore_data['current_user']['password'];
        var rendData = {};
        rendData['username'] = username;

        //CHANGE THIS TO THE NAME OF THE HOUSE FROM "Create a house" FORM
        rendData['house_name'] = "Best house ever";

        rendData['default_chores'] = [];
        rendData['default_chores'].push({'name':'Wash Dishes'});
        rendData['default_chores'].push({'name':'Take out Trash'});
        rendData['default_chores'].push({'name':'Check Mail'});
        rendData['default_chores'].push({'name':'Sweep Patio'});*/

        res.render('choose_chores_initial');
    }
    else {
        res.render('login');
    }


};
