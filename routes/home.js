var chore_data = require("../json/chore_schedule.json");
var user_data = require("../json/users.json");

exports.viewHome = function(req, res) {
    if (chore_data['current_user'] != null) {
        var username = chore_data['current_user']['username'];
        var password = chore_data['current_user']['password'];
        var rendData = chore_data[username];
        rendData['rating'] = user_data[username + "_" + password]['rating'];
        res.render('home', rendData);
    } else {
        res.render('login');
    }
};

exports.jsonHome = function(req, res) {
    res.json(chore_data);
};
