var mysql = require('mysql');
const { promisify } = require('util');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

pool.getConnection(function (err, connection) {
  // if (err) throw err; // not connected!
  //    console.error('Database Error');
  // Use the connection

  if (connection) {
    connection.release();
  }
  console.log('Mysql Conected..')

  // connection.query('SELECT something FROM sometable', function (error, results, fields) {
  //   When done with the connection, release it.
  //   connection.release();

  //   // Handle error after the release.
  // if (err) throw err;

  //   // Don't use the connection here, it has been returned to the pool.
  // });
});

//  Convierte a promesa
pool.query = promisify(pool.query);

module.exports = pool;
