var user_data = require("../json/users.json");
var chore_data = require("../json/chore_schedule.json");

exports.viewPreferences = function(req, res) {
	if (chore_data['current_user'] != null) {

	    var username = chore_data['current_user']['username'];
	    var password = chore_data['current_user']['password'];
	    var rendData = {};
	    rendData['rating'] = user_data[username + "_" + password]['rating'];
	    rendData['username'] = username;
	    
	    res.render('preferences', rendData);
	}
	else {
		res.render('login');
	}
};
