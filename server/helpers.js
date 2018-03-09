const fs = require('fs');
const path = require('path');

function getPath(user) {
  let userPath = path.join('./newPub', `${user}.json`);
  return userPath;
}

function getUsersData(username) {
  var userData = fs.readFileSync(getPath(username), 'UTF-8');
  return userData;
}
function saveFile(username, data) {
  fs.unlink(getPath(username), function(err) {
    if (err) console.log(err);
    fs.writeFileSync(getPath(username), JSON.stringify(data));
  });
}

module.exports.getPath = getPath;
module.exports.getUsersData = getUsersData;
module.exports.saveFile = saveFile;
