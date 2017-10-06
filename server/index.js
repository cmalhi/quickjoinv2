var cors = require('cors');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// var Appointment = require('./model/appointments');
//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set 
//it up, or 3001
var nodeEnv = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3001;
var host = process.env.HOST || '0.0.0.0';
//db config
mongoose.connect('mongodb://cmalhi:quickjoinv2@ds013495.mlab.com:13495/quickjoinv2');
//now we should configure the API to use bodyParser and look for 
app.use(cors());
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent appointments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.send({ message: 'API Initialized!'});
 console.log('Api initialized');
});
//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, host, function() {
 console.log(`api running on port ${port}`);
});
//adding the /appointments route to our /api router
router.route('/api/appointments')
 //retrieve all appointments from the database
 .get(function(req, res) {
 //looks at our Appointment Schema
 Appointment.find(function(err, appointments) {
 if (err)
 res.send(err);
 //responds with a json object of our database appointments.
 res.send(appointments)
});
console.log(appointments);
 })
 //post new appointment to the database
 .post(function(req, res) {
 var appointment = new Appointment();
 //body parser lets us use the req.body
  appointment.appointmentTitle = req.body.appointmentTitle;
  appointment.appointmentDate = req.body.appointmentDate;
  appointment.appointmentTime = req.body.appointmentTime;
  appointment.appointmentDescription = req.body.appointmentDescription;
  appointment.appointmentDestination = req.body.appointmentDestination;
  appointment.appointmentOrigin = req.body.appointmentOrigin;
  appointment.travelMode = req.body.travelMode;
appointment.save(function(err) {
 if (err)
 res.send(err);
 res.send({ message: 'Appointment successfully added!' });
 });
 });