var chore_data = require("../json/chore_schedule.json");
var user_data = require("../json/users.json");

exports.viewChores = function(req, res) {
    var username = chore_data['current_user']['username'];
    var password = chore_data['current_user']['password'];
    var rendData = {};
    rendData['username'] = username;

    //CHANGE THIS TO THE NAME OF THE HOUSE FROM "Create a house" FORM
    rendData['house_name'] = "Best house ever";

    rendData['default_chores'] = [];
    rendData['default_chores'].push({'name':'Wash Dishes'});
    rendData['default_chores'].push({'name':'Take out Trash'});
    rendData['default_chores'].push({'name':'Check Mail'});
    rendData['default_chores'].push({'name':'Sweep Patio'});

    res.render('choose_chores', rendData);


};
