var data = require("../json/users.json");
var chore_data = require("../json/users.json");

exports.viewLogin = function(req, res) {
    var username = req.params.username;
    var password = req.params.password;
    var check = false;

    if (username != null && password != null) {
        for (var users in data) {
            for (var userData in data[users]) {

                if ((data[users][userData]['username'] == username)
                    && (data[users][userData]['password'] == password)) {
                    check = true;
                    res.render('home', chore_data);
                }
            }
        }
    } else {
        res.render('login');
    }

    if (!check)
        res.render('login');
};