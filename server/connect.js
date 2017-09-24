var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
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
