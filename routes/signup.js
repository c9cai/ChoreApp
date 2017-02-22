//firebase
var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var user_ref = firebase.database().ref("users");

exports.createUser = function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;

    user_ref.once("value", function (snapshot) {
        var user_data = snapshot.val();
        var authEmail = email.replace(".", "");

        if (user_data[authEmail] != null) {
            rendData = {"error": "<p class=\"alert alert-warning\">Email already being used</p>"};
            res.render('login', rendData);
        } else {
            var userUpdate = {};
            userUpdate[authEmail] = {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password
            };
            user_ref.update(userUpdate);

            res.render('login');
        }
    });
}