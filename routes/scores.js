var chore_data = require("../json/chore_schedule.json");
var user_data = require("../json/users.json");
var user_data2 = require("../json/users2.json")

exports.viewScores = function(req, res) {
		var data = [];
		for (user in user_data) {
			if (user_data[user]['firstName'] == chore_data['current_user']['firstName']) data.push(user_data[user]);
  	}

		for (user in user_data) {
			if (user_data[user]['firstName'] != chore_data['current_user']['firstName']) data.push(user_data[user]);
  	}

  	rendData = {};
  	rendData['users'] = data;
  	res.render('scores', rendData);
  	
};

exports.jsonScores = function(req, res) {
    //res.json(user_data);
};
 