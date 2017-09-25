var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'openbounty.cj4r07ust5tr.us-east-1.rds.amazonaws.com',
  user     : 'ob',
  password : 'pass',
  database : "openbounty"
});

var query = function() {
  connection.query(q, function(err, rows) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, rows);
    }
  })

}

module.exports = connection;
