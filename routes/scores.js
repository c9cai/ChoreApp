var data = require("../json/users.json");

exports.viewScores = function(req, res) {
    //console.log(data);
    res.render('scores', data);
};
