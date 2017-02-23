var current_user = require("../json/current_user.json");

var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;


var user_data = [];
var chore_data = [];

var ref = firebase.database().ref('users');
ref.on("value",function(snapshot) {
    user_data = snapshot.val();
});

var ref2 = firebase.database().ref('defaultChores');
ref2.on('value',function(snapshot) {
    chore_data = snapshot.val();
});



exports.viewChores = function(req, res) {

    var data = {};

    if (current_user['current_user'] != null) {

        for (category in chore_data) {
            if (category == 'Bathroom') {
                var temp = chore_data[category];
                for (chore in chore_data[category]) {
                    temp[chore] = chore_data[category][chore].split(" ").join("-")
                }
                data['Bathroom'] = temp;
            } else if (category == 'Kitchen') {
                var temp = chore_data[category];
                for (chore in chore_data[category]) {
                    temp[chore] = chore_data[category][chore].split(" ").join("-")
                }
                data['Kitchen'] = temp;
            } else {
                var temp = chore_data[category];
                for (chore in chore_data[category]) {
                    temp[chore] = chore_data[category][chore].split(" ").join("-")
                }
                data['LivingRoom'] = temp;
            }
        }
        //console.log(data);

        res.render('choose_chores', data);
    }
    else {
        res.render('login');
    }


};
