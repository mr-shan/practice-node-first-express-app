const mysql = require('mysql2')

const connectionPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'practice_node_first_express_app',
  password: 'Admin@12345',
  waitForConnections: true,
  connectionLimit: 2,
  maxIdle: 2, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})

module.exports = connectionPool.promise();
