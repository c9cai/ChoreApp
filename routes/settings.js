var user_data = require("../json/users.json");

exports.viewSettings = function(req, res) {
    var rendData = {};
    rendData["users"] = [];
    currentUser = user_data['current_user']['username'];

    for (var user in user_data['users']) {
    	if (user_data['users'][user]['username'] != currentUser) {
    		rendData["users"].push(user_data['users'][user]['username']);
    	}
    }
    res.render('settings', rendData);
};
