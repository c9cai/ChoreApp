//local files
var current_user = require("../json/current_user.json");

exports.viewLogin = function(req, res) {
    if (current_user['current_user'] == null)
        res.render('login');
    else {
        res.redirect("/home");
    }
};