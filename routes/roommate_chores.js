var chore_data = require("../json/chore_schedule.json");

exports.viewChores = function(req, res) {
    data = [];
    for (user in chore_data) {
        data.push(chore_data[user]);
    }

    rendData = {};
    rendData['users'] = data;

    res.render('roommate_chores', rendData);
};
