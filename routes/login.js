exports.viewLogin = function(req, res) {
    if (req.session.current_user == null)
        res.render('login');
    else {
        res.redirect("/home");
    }
};