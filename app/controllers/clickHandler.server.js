'use strict';

function clickHander(db) {
  var clicks = db.collection('clicks');

  this.getClicks = function(req, res) {
    var clickProjection = {'id': false};

    clicks.findOne({}, clickProjection, function(err, result) {
      if (err) throw err;
      
      if (result)
        res.json(result);
      else {
        clicks.insert({'clicks': 0}, function(err) {
          if (err) throw err;

          clicks.findOne({}, clickProjection, function(err, result) {
            if (err) throw err;
            res.json(result);
          });
        });
      }
    });
  };

  this.addClick = function(req, res) {
    clicks.findAndModify({}, {'id': 1}, {$inc: {'clicks': 1}}, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  };
  
  this.resetClicks = function(req, res) {
    clicks.update({}, {'clicks': 0}, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  };
}

module.exports = clickHander;