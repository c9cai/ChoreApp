var chore_data = require("../json/chore_schedule.json");
var user_data = require("../json/users.json");

exports.viewHome = function(req, res) {
    rendData = {};
    currentUser = user_data['current_user']['username'];
    if (currentUser == null)
        currentUser = "NoUser";

    for (var users in chore_data) {

        for (var userdata in chore_data[users]) {
            if (chore_data[users][userdata]['username'] == currentUser) {
                rendData["overdue"] = chore_data[users][userdata]['overdue'];
                rendData["today"] = chore_data[users][userdata]['today'];
                rendData["upcoming"] = chore_data[users][userdata]['upcoming'];
                rendData["completed"] = chore_data[users][userdata]['completed'];
            }
        }
    }

    res.render('home', rendData);
};
