// EXTERNAL MODULES //
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var massive = require('massive');

// CONFIG //
var config = require('./config');

// EXPRESS //
var app = module.exports = express();

app.use(express.static(__dirname + './../dist'));
app.use(bodyParser.json());

// MASSIVE //
var massiveUri = config.MASSIVE_URI;
var massiveServer = massive.connectSync({
	connectionString: massiveUri
});
app.set('db', massiveServer);
var db = app.get('db');

var dbSetup = require('./services/dbSetup');
dbSetup.run();

// CONTROLLERS //
var userCtrl = require('./controllers/userCtrl');
var blogCtrl = require('./controllers/blogCtrl');

// SERVICES //
var passport = require('./services/passport');

// POLICIES //
var isAuthed = function(req, res, next) {
	if (!req.isAuthenticated()) return res.status(401)
		.send();
	return next();
};

// Session and passport //
app.use(session({
	secret: "gweriwrb-erfawrg45-oasWsd",
	saveUninitialized: false,
	resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Endpoints //
app.post('/api/login', passport.authenticate('local', {
	successRedirect: '/api/me'
}));
app.get('/api/logout', function(req, res, next) {
	req.logout();
	return res.status(200)
		.send('logged out');
});

// User Endpoints //
app.post('/api/register', userCtrl.register);
app.get('/api/user', userCtrl.read);
app.get('/api/me', isAuthed, userCtrl.me);
app.put('/api/user/current', isAuthed, userCtrl.update);

// Blog Endpoints //
app.post('/api/createBlogEntry', blogCtrl.createBlogEntry);
app.get('/api/getBlogEntries', blogCtrl.readBlogEntries);
app.get('/api/getBlogEntry/:id', blogCtrl.readBlogEntry);

// CONNECTIONS //
var port = config.PORT;
app.listen(port, function() {
	console.log('Listening on port ' + port);
});
