var data = require("../json/chore_schedule.json");

exports.viewHome = function(req, res) {
    for (var category in data) {
        category_data = data[category];

        for (var chore in category_data) {
            chore_data = category_data[chore];
            if (chore_data['username'] != "Brian")
                delete data[category][chore];
        }
    }

    console.log(data);

    res.render('home', data);
};
