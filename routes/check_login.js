var user_data = require("../json/users.json");
var chore_data = require("../json/chore_schedule.json");

exports.checkLogin = function(req, res) {
    var username = req.params.username;
    var password = req.params.password;
    var check = false;

    //check valid username password
    if (username != null && password != null) {

        if (user_data[username + "_" + password] != null) {
            check = true;
            chore_data['current_user'] = user_data[username + "_" + password];
            res.redirect("/home");
        }
    } else {
        res.render('login');
    }

    if (!check)
        res.render('login');
};