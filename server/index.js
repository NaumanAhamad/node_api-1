const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const _ = require('lodash');
const engines = require('consolidate');
const app = express();
const helpers = require('./helpers.js');

const port = process.env.PORT || 4000;

app.use(function(req, res, next) {
  console.log(`Requested Url: ${req.url} Requested Method: ${req.method}`);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(cors());

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('veiw engine', 'hbs');

app.get('/users', function(req, res) {
  // let buffer = '';
  // users.forEach(function(user) {
  //   buffer += `<a href="/user/${user.name.full}">${user.name.full}</a><br>`;
  // });

  //using template engine below and using user.json
  // let users = [];
  // let userData = fs.readFileSync('./user.json', 'UTF-8');
  // JSON.parse(userData).forEach(function(user) {
  //   user.name.full = _.startCase(user.name.first + ' ' + user.name.last);
  //   users.push(user);
  // });
  // res.render('index.hbs', { users });

  let Users = [];
  var buffer = '';
  fs.readdir('./newPub', function(err, files) {
    if (err) console.log(err);
    files.forEach(function(file) {
      var data = fs.readFileSync(`./newPub/${file}`, 'UTF-8');
      Users.push(JSON.parse(data));
    });
  });
  res.render('index.hbs', { users: Users });
  Users = [];
});

// adding regular expresssion routes
// app.get(/David.*/, function(req, res, next) {
//   console.log('David is Here');
//   next();
// });
// app.get(/Benton.*/, function(req, res, next) {
//   console.log('Benton is Here');
//   next();
// });*/

function verifyUser(req, res, next) {
  var fp = helpers.getPath(req.params.name);
  fs.exists(fp, function(yes) {
    if (yes) {
      next();
    } else {
      res.redirect('/error/' + req.params.name);
    }
  });
}

app.get('*.json', function(req, res) {
  console.log(req.path);

  res.end();
});

app.get('/users/data/:fullname', function(req, res) {
  let userName = req.params.fullname;
  res.json(JSON.parse(helpers.getUsersData(userName)));
  // res.send(helpers.getUsersData(userName));
});

app.get('/users/:name', verifyUser, function(req, res) {
  let username = req.params.name;
  res.render('user.hbs', { username });
});

app.get('/error/:name', function(req, res) {
  res.send(`User ${req.params.name} not Found`);
});

const userName = require('./userName.js');
app.use('/users/details/:fullname', userName);

const server = app.listen(port, function(req, res, next) {
  console.log(`App is listening to Port : ${server.address().port}`);
});
