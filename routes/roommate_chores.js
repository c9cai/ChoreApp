var chore_data = require("../json/chore_schedule.json");

exports.viewChores = function(req, res) {
    console.log(chore_data);
    res.render('roommate_chores', chore_data);
};
