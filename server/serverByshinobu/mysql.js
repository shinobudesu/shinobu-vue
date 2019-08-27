const mysql = require("mysql");

let pool = mysql.createPool({
    connectionLimit: 50,
    host: "localhost",
    user: "root",
    password: "115040",
    database: "shinobu",
    multipleStatements: true //是否允许执行多条sql语句
});

//查询数据
function query(sql, callback) {
    pool.getConnection(function(err, connection) {
        connection.query(sql, function(err, rows) {
            if (err) {
                console.log(err.message);
                callback("err", rows);
            } else {
                callback(err, rows);
            }
            connection.release();
        });
    });
}

//插入数据
function insert(sql, sqlvalues, callback) {
    pool.getConnection(function(err, connection) {
        connection.query(sql, sqlvalues, function(err, rows) {
            if (err) {
                console.log(err.message);
                callback("err", rows);
            } else {
                callback(err, "ok");
            }
            connection.release();
        });
    });
}
module.exports.query = query;
module.exports.insert = insert;
module.exports.pool = pool;