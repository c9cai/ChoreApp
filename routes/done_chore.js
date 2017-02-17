var chore_data = require("../json/chore_schedule.json");
var user_data = require("../json/users.json");

exports.doneChore = function(req, res) {
    var category = req.body.category;
    var index = req.body.index;
    var redirect = req.body.redirect;
    var user = req.body.user;

    if (user == "current_user") {
        var username = chore_data['current_user']['username'];
        var password = chore_data['current_user']['password'];
        var data = chore_data[username];

        //add chore to completed
        var chore = data[category][index];
        data["completed"].push(chore);

        //remove chore
        data[category].splice(index,index+1);

        //upgrade rating
        user_data[username + "_" + password]['rating'] += 3;

        //reload home page
        res.redirect(redirect);
    }
};