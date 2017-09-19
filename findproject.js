var mongo = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/learnyoumongo";

mongo.connect(url, function(err, db) {
  if (err) console.error(err);
  db.collection('parrots').find({
    age: {
      $gt: +process.argv[2]
    }
  }, {
    _id: false
  }).toArray(function(err, doc) {
    if (err) console.error(err);
    console.log(doc);
  });
  db.close();
});