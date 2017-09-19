var mongo = require('mongodb').MongoClient;

var url = "mongodb://0.0.0.0:27017/learnyoumongo";
mongo.connect(url, function(err, db) {
  if (err) console.error(err);
  db.collection('parrots').count({
    age: {
      $gt: +process.argv[2]
    }
  }, {
    _id: false
  }, function(err, count) {
    console.log(count);
    db.close();
  });
});