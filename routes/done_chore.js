//firebase
var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var userRef = firebase.database().ref("users");

//local files
var current_user = require("../json/current_user.json");

exports.doneChore = function(req, res) {
    var category = req.body.category;
    var index = req.body.index;
    var redirect = req.body.redirect;
    var user = req.body.user;

    if (user == "current_user") {
        var email = current_user['current_user']['email'];
        var email = email.replace(".","");

        //move chore to complete section
        var cuRef = userRef.child(email);
        cuRef.once("value", function(snapshot) {
            var cu_data = snapshot.val();
            var chore = cu_data[category][index];
            cu_data["completed"].push(chore);
            cu_data[category].splice(index,index+1);
            cuRef.set(cu_data);
        });

        //reload home page
        res.redirect(redirect);
    }
};