const fs = require('fs');
const path = require('path');

const getPath = fileName => path.join(__dirname, 'public', 'newPub', `${fileName}.json`);

const getUser = (user) => {
  let userDetails = '';
  const data = fs.readFileSync(getPath(user), {encoding: 'UTF-8'});
  userDetails = JSON.parse(data);
  return userDetails;
};
const saveUser = (user, data) => {
  fs.unlinkSync(getPath(user));
  fs.writeFile(getPath(user), JSON.stringify(data), (err) => {
    if (err) console.log(err);
  });
};

exports.getPath = getPath;
exports.getUser = getUser;
exports.saveUser = saveUser;
