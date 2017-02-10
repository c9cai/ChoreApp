var data = require("../json/users.json");

exports.viewPreferences = function(req, res) {
    //console.log(data);
    res.render('preferences', data);
};
