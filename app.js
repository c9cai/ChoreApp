
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var home = require('./routes/home');
var no_home = require('./routes/home');
var add_members = require('./routes/add_members');
var choose_chores = require('./routes/choose_chores');
var roommate_chores = require('./routes/roommate_chores');
var scores = require('./routes/scores');
var preferences = require('./routes/preferences');
var settings = require('./routes/settings');
var login = require('./routes/login');
var check_login = require('./routes/check_login');
var done_chore = require('./routes/done_chore');
var logout = require('./routes/logout');
var firebase = require('./routes/firebase');
var save_preferences = require('./routes/save_preferences');
var signup = require('./routes/signup');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', login.viewLogin);
app.get('/home', home.viewHome);
app.get('/no_home', home.viewNoHome);
app.get('/add_members', add_members.viewAddMembers);
app.get('/choose_chores', choose_chores.viewChores);
app.get('/roommate_chores', roommate_chores.viewChores);
app.get('/scores', scores.viewScores);
app.get('/scoreData', scores.jsonScores);
app.get('/preferences', preferences.viewPreferences);
app.get('/settings', settings.viewSettings);
app.get('/login', login.viewLogin);
app.get('/homeData', home.jsonHome);
app.post('/check_login', check_login.checkLogin);
app.post('/done_chore', done_chore.doneChore);
app.post('/logout', logout.logOut);
app.post('/save_preferences', save_preferences.savePreferences);
app.post('/choose_chores_save', choose_chores.saveChores);
app.post('/sign_up', signup.createUser);
app.post('/create_home', home.createHome);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
