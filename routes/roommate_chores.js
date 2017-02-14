var data = require("../json/chore_schedule.json");

exports.viewChores = function(req, res) {
    //console.log(data);
    res.render('roommate_chores', data);
};
