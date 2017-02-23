//firebase
var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var user_ref = firebase.database().ref("users");

//local files
var current_user = require("../json/current_user.json");

exports.createUser = function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    var rendData;

    if (firstName == '' || lastName == '' || email == '' || password == '') {
        rendData = {"error2": "<p class=\"alert alert-warning\">Please fill out all fields</p>"};
        res.render('login', rendData);
    } else {
        user_ref.once("value", function (snapshot) {
            var user_data = snapshot.val();
            var authEmail = email.split('.').join('');

            if (user_data[authEmail] != null) {
                rendData = {"error2": "<p class=\"alert alert-warning\">Email already being used</p>"};
                res.render('login', rendData);
            } else {
                var userUpdate = {};
                userUpdate[authEmail] = {
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "password": password,
                    "rating": 61
                };

                current_user['current_user'] = userUpdate[authEmail];
                user_ref.update(userUpdate);

                res.redirect('home');
            }
        });
    }
}