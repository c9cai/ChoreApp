var user_data = require("../json/users.json");
var chore_data = require("../json/chore_schedule.json");

exports.viewSettings = function(req, res) {
    var rendData = {};
    rendData["users"] = [];
    currentUser = chore_data['current_user']['username'];

    for (var user in user_data) {
    	if (user_data[user]['username'] != currentUser) {
    		rendData["users"].push(user_data[user]['username']);
    	}
    }
    res.render('settings', rendData);
};
