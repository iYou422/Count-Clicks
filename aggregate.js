var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';
mongo.connect(url, function(err, db) {
  if (err) throw err;
  var collection = db.collection('prices');
  collection.aggregate([{
      $match: {
        size: process.argv[2]
      }
    },
    {
      $group: {
        _id: 'Average',
        average: {
          $avg: '$price'
        }
      }
    }
  ]).toArray(function(err, results) {
    if (err) throw err;
    console.log(results[0].average.toFixed(2));
    db.close();

  });

  //   db.close()
});

// var mongo = require('mongodb').MongoClient
// var size = process.argv[2]

// var url = 'mongodb://localhost:27017/learnyoumongo'

// mongo.connect(url, function(err, db) {
//   if (err) throw err
//   var prices = db.collection('prices')
//   prices.aggregate([{
//     $match: {
//       size: size
//     }
//   }, {
//     $group: {
//       _id: 'total',
//       total: {
//         $avg: '$price'
//       }
//     }
//   }]).toArray(function(err, results) {
//     if (err) throw err
//     if (!results.length) {
//       throw new Error('No results found')
//     }
//     var o = results[0]
//     console.log(Number(o.total).toFixed(2))
//     db.close()
//   })
// })