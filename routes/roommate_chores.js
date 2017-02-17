var chore_data = require("../json/chore_schedule.json");

exports.viewChores = function(req, res) {
    rendData = {};
    rendData["users"] = {};

    currentUser = chore_data['current_user']['username'];
    for (var user in chore_data) {
    	if (chore_data[user]['username'] != currentUser) {
    		rendData["users"][user] = chore_data[user];
    	}
    }

    res.render('roommate_chores', rendData);
};
