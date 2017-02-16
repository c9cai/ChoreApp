var current_user_data = require("../json/current_user.json");

exports.viewLogin = function(req, res) {

    console.log("viewLogin");

    if (!Object.keys(current_user_data).length)
        res.render('login');
    else {
        res.redirect("/home");
    }
};