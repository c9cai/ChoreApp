var chore_data = require("../json/chore_schedule.json");
var user_data = require("../json/users.json");

exports.logOut = function(req, res) {
  	chore_data['current_user'] = null;
  	res.redirect('/login');
};


 