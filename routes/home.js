var chore_data = require("../json/chore_schedule.json");

exports.viewHome = function(req, res) {
    var username = chore_data['current_user']['username'];
    var rendData = chore_data[username];
    res.render('home', rendData);
};

exports.jsonHome = function(req, res) {
    res.json(chore_data);
};
