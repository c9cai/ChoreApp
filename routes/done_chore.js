//firebase
var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var userRef = firebase.database().ref("users");

exports.doneChore = function (req, res) {
    var current_user = req.session.current_user;

    var category = req.body.category;
    var index = req.body.index;
    var redirect = req.body.redirect;
    var user = req.body.user;

    var email = current_user['email'];
    email = email.replace(".", "");

    //move chore to complete section
    var cuRef = userRef.child(email);
    cuRef.once("value", function (snapshot) {
        var cu_data = snapshot.val();
        if (cu_data['completed'] == null)
            cu_data['completed'] = [];
        var chore = cu_data[category][index];
        cu_data["completed"].push(chore);
        cu_data[category].splice(index, 1);
        cu_data["rating"] += 3;
        cuRef.set(cu_data);
    });

    //reload home page
    res.redirect(redirect);
};