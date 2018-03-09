const MongoCLient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbName = 'testDB';

MongoCLient.connect('mongodb://localhost:27017', (err, client) => {
  const collection = client.db(dbName).collection('Users');
  //   collection.insertOne({ name: 'Nauman', age: '24', gender: 'male' }, (err, res) => {
  //     if (err) console.log(err);
  //     console.log(res.ops);
  //   });

  //   collection.insertMany(
  //     [{ name: 'Nauman', age: '24', gender: 'male' }, { name: 'Harshita', age: '22', gender: 'female' }],
  //     (err, res) => {
  //       if (err) console.log(err);
  //       console.log(res.ops);
  //     }
  //   );

  //   collection
  //     .find({ age: '24' })
  //     .toArray()
  //     .then(
  //       doc => {
  //         console.log(JSON.stringify(doc, null, 2));
  //         client.close();
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     );

  // Delete many
  //   collection.deleteMany({ age: '22' }).then(
  //     result => {
  //       console.log(result);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );

  //Find_one_and_Delete
  //   collection.findOneAndDelete({ name: 'vani' }).then(
  //     result => {
  //       console.log(result);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );

  var objId = new ObjectID('5aa22c587ae94495f7c1eb09');
  collection
    .findOneAndUpdate(
      { _id: objId },
      {
        $set: {
          name: 'Nauman'
        }
      },
      { returnOriginal: false }
    )
    .then(result => {
      console.log(result);
    });

  //   client.close();
});
