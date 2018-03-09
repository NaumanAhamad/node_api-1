const express = require('express');
const fs = require('fs');
const path = require('path');
const helpers = require('./helpers.js');
const router = express.Router({ mergeParams: true });

router.get('/', function(req, res) {
  let userName = req.params.fullname;
  let userDetails = JSON.parse(helpers.getUsersData(userName));
  res.render('userDetails.hbs', { user: userDetails });
});

router.put('/', function(req, res) {
  let userName = req.params.fullname;
  let reqData = req.body;
  let userData = JSON.parse(helpers.getUsersData(userName));
  userData.company = reqData.company;
  userData.email = reqData.email;
  userData.phone = reqData.phone;
  userData.age = reqData.age;
  helpers.saveFile(userName, userData);
  res.end();
});

router.delete('/', function(req, res) {
  fs.unlink(helpers.getPath(req.params.fullname), function(err) {
    if (err) console.log(err);
  });
  res.sendStatus(200);
});

module.exports = router;
