var mongo = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/learnyoumongo";

mongo.connect(url, function(err, db) {
  if (err) console.error(err);
  db.collection('parrots').find({
    age: {
      $gt: parseInt(process.argv[2])
    }
  }).toArray(function(err, doc) {
    if (err) console.error(err);
    console.log(doc);
  });
  db.close();
});

// var mongo = require('mongodb').MongoClient
// var age = process.argv[2]

// var url = 'mongodb://localhost:27017/learnyoumongo'

// mongo.connect(url, function(err, db) {
//   if (err) throw err
//   var parrots = db.collection('parrots')
//   parrots.find({
//     age: {
//       $gt: +age
//     }
//   }).toArray(function(err, docs) {
//     if (err) throw err
//     console.log(docs)
//     db.close()
//   })
// })