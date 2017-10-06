var express = require('express');
var requestHandler = require('./requestHandlers');
var router = express.Router();

router.route('/handlelogin').post(requestHandler.login);
// router.post('/handlelogin', requestHandler.login);

router.post('/handlesignup', requestHandler.signup);

router.get('/handlematch', requestHandler.getMatches);

router.get('/gamesapi', requestHandler.getGamesFromAPI);

module.exports = router;



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