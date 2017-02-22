var user_data = require("../json/users.json");
var chore_data = require("../json/chore_schedule.json");

exports.viewChores = function(req, res) {
    if (chore_data['current_user'] != null) {


        rendData = {};
        rendData["users"] = {};

        //get the rating of current user for the rating bar at top
        var username = chore_data['current_user']['username'];
        var password = chore_data['current_user']['password'];
        rendData['rating'] = user_data[username + "_" + password]['rating'];
        rendData['username'] = username;

        currentUser = chore_data['current_user']['username'];
        for (var user in chore_data) {
            if (chore_data[user]['username'] != currentUser) {
                rendData["users"][user] = chore_data[user];
            }
        }

        res.render('roommate_chores', rendData);
    }
    else {
        res.render('login');
    }
};
