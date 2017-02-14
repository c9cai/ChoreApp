var data = require("../json/chore_schedule.json");

exports.viewHome = function(req, res) {
    rendData = {};

    for (var users in data) {

        for (var userdata in data[users]) {
            if (data[users][userdata]['name'] == "Alia") {
                rendData["overdue"] = data[users][userdata]['overdue'];
                rendData["today"] = data[users][userdata]['today'];
                rendData["upcoming"] = data[users][userdata]['upcoming'];
                rendData["completed"] = data[users][userdata]['completed'];
            }
        }
    }

    res.render('home', rendData);
};
