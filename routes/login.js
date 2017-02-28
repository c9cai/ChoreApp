exports.viewLogin = function(req, res) {
    if (req.session.current_user == null)
        res.render('login');
    else {
        if (req.session.current_user['setup'] != null)
            res.redirect(req.session.current_user['setup']);

        res.redirect("/home");
    }
};