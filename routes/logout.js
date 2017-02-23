//local files
var current_user = require("../json/current_user.json");

exports.logOut = function(req, res) {
  	current_user['current_user'] = null;
  	res.redirect('/login');
};


 