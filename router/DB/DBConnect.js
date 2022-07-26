var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    port: '3308',
    user: 'user3',
    password: 'kim199513!!',
    database: 'logintest',
    connectionLimit:30,
});

pool.on('acquire', function(connection){
    console.log('Connection %d acquired', connection.threadId);
})

pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});

function getConnections(callback) {
    pool.getConnection(function(err, conn){
        if(!err){
            callback(conn);
        }
        else{
            console.log(err);
        }
    })
}

module.exports = getConnections;