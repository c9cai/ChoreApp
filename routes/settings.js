var user_data = require("../json/users.json");
var chore_data = require("../json/chore_schedule.json");

exports.viewSettings = function(req, res) {
    var rendData = {};
    rendData["users"] = [];

    //get the rating of current user for rating bar
    var username = chore_data['current_user']['username'];
    var password = chore_data['current_user']['password'];
    rendData['rating'] = user_data[username + "_" + password]['rating'];



    currentUser = chore_data['current_user']['username'];

    for (var user in user_data) {
    	if (user_data[user]['username'] != currentUser) {
    		rendData["users"].push(user_data[user]['username']);
    	}
    }
    res.render('settings', rendData);
};
