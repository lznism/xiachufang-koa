function dbHandler (sql) {
    const pool = require('../config/db.conf');
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, conn) {
            if (err) {
                reject({code: -1, message: err});
                return;
            }
            conn.query(sql, function (err, results) {
                conn.release();
                if (err) {
                    reject({code: -1, message: err});
                    return;
                }
                resolve({code: 0, data: results[0]});                
            });
        });
    });
}

module.exports = dbHandler;