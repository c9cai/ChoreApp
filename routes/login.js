var chore_data = require("../json/chore_schedule.json");

exports.viewLogin = function(req, res) {
    if (chore_data['current_user'] == null)
        res.render('login');
    else {
        res.redirect("/home");
    }
};