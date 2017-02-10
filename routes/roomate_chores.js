var data = require("../json/users.json");

exports.viewChores = function(req, res) {
    //console.log(data);
    res.render('roomate_chores', data);
};
