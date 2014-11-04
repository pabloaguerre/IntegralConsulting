var express = require('express'),
	path = require('path'),
    http = require('http'),
	dbMngr = require('./routes/db-manager'),
	JSON_LIMIT = '16mb'; // UI supports 15MB so error message will be displayer if limit is reached
 
var app = express();

app.configure(function () {
	app.set('port', process.env.PORT || 8080);
	app.use(express.logger('dev')); // 'default', 'short', 'tiny', 'dev' 
	app.use(express.json({limit: JSON_LIMIT})); // limit above body parser always
	app.use(express.urlencoded({limit: JSON_LIMIT}));
	app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/offers', dbMngr.findOffers);
app.get('/offers/:id', dbMngr.findOfferById);
app.post('/offers', dbMngr.addOffer);
app.put('/offers/:id', dbMngr.updateOffer);
app.delete('/offers/:id', dbMngr.removeOffer);

app.get('/job-applications', dbMngr.findJobApplications);
app.get('/job-applications/:id', dbMngr.findJobApplicationById);
app.post('/job-applications', dbMngr.addJobApplication);
app.put('/job-applications/:id', dbMngr.updateJobApplication);
app.delete('/job-applications/:id', dbMngr.removeJobApplication);

app.get('/messages', dbMngr.findMessages);
app.get('/messages/:id', dbMngr.findMessageById);
app.post('/messages', dbMngr.addMessage);
app.put('/messages/:id', dbMngr.updateMessage);
app.delete('/messages/:id', dbMngr.removeMessage);

http.createServer(app).listen(app.get('port'), '10.240.255.213', function () {
    console.log("Express server listening on port " + app.get('port'));
});