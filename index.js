// index.js
var express = require("express");
var logfmt = require("logfmt");
var http = require('http'); 
var util = require('util');

var app = express();
var API_USER = "ameetmz";
var API_KEY = "muzit13";

//////////////////////////////////////////
var email_from 	= "amehta@muzit.com";
var email_to 	= "amehta+test@muzit.com";
var subject 	= "** Tommy Funderburk would like to connect with you."
var email_text	= "Hello! This is not spam - it is really me, Tommy Funderburk. You may know me from my work with Airplay, Boston, King Of Hearts, Whitesnake, Motley Crue, Jimmy Page, Yes and others."


app.use(logfmt.requestLogger());
app.use(express.bodyParser());
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.send('MUZIT-MAIL in Effect');
});

app.get('/mailer', function(req, res) {
  //res.send('MUZIT-MAIL in Effect');
  res.sendfile('./views/mailer.html');
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});



///////////////////////////


var sendgrid	= require('sendgrid')(API_USER, API_KEY, {api: 'smtp'});
var Email 		= sendgrid.Email;
var email 		= new Email({
  to:       email_to,
  from:     email_from,
  subject:  subject,
  text:     email_text	
});

app.post('/mailer', function(req, res){
    console.log(req.body.email_to);
    console.log(req.body.email_from);

    email.to = req.body.email_to;
    email.from = req.body.email_from || "amehta+noreply@muzit.com";

	sendgrid.send(email, function(err, json) {
	  if (err) { return console.error(err); }
	  console.log(json);
	  res.send("Mail sent to:" + email.to);
	});    
});

var info = {};

app.post('/mailerconfig', function(req, res){

    console.log(req.body);

    info.isp = req.body.isp;
    info.ip = req.body.ip;
    info.timestamp = req.body.timestamp;
    info.port = req.body.port;
    info.title = req.body.title;
    info.target_url = req.body.target_url;


});

