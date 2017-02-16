var chore_data = require("../json/chore_schedule.json");

exports.doneChore = function(req, res) {
    var category = req.body.category;
    var index = req.body.index;
    var redirect = req.body.redirect;
    var user = req.body.user;

    if (user == "current_user") {
        var username = chore_data['current_user']['username'];
        var data = chore_data[username];

        //add chore to completed
        var chore = data[category][index];
        data["completed"].push(chore);

        //remove chore
        data[category].splice(index,index+1);

        //reload home page
        var rendData = chore_data[username];
        res.render('home', rendData);
    }
};