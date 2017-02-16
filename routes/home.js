var current_user_data = require("../json/current_user.json");

exports.viewHome = function(req, res) {
    rendData = current_user_data['chore_data'];
    res.render('home', rendData);
};
