exports.logOut = function(req, res) {
    req.session.destroy();
  	res.redirect('/login');
};


 