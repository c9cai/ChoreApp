var user_data = require("../json/users.json");
var chore_data = require("../json/chore_schedule.json");

exports.viewLogin = function(req, res) {

    if (user_data['current_user'] == null)
        res.render('login');
    else {
        res.redirect("/home");
    }
};