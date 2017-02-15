var user_data = require("../json/users.json");
var chore_data = require("../json/chore_schedule.json");

exports.checkLogin = function(req, res) {
    var username = req.params.username;
    var password = req.params.password;
    var check = false;

    //check valid username password
    if (username != null && password != null) {

        for (var users in user_data['users']) {

            //login successful
            if ((user_data['users'][users]['username'] == username) && (user_data['users'][users]['password'] == password)) {
                check = true;
                user_data['current_user'] = {"username":"brian"};
                res.redirect("/home");

                break;
            }
        }
    } else {
        res.render('login');
    }

    if (!check)
        res.render('login');
};