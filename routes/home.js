//local files
var current_user = require("../json/current_user.json");

exports.viewHome = function(req, res) {
    if (current_user['current_user'] != null) {
        var email = current_user['current_user']['email'];
        console.log('email');

        //if (make check to see if user is not in a house) {
        //    res.render('no_home');
        //}

        res.render('login');
    } else {
        res.render('login');
    }

};

exports.jsonHome = function(req, res) {
    res.json(current_user);
};


//Can be deleted when the viewHome function is updated to reroute to no_home when appropriate
exports.viewNoHome = function(req, res) {
    var username = current_user['current_user']['username'];
    var password = current_user['current_user']['password'];
    var rendData = {};
    rendData['username'] = username;

    res.render('no_home', rendData);


};