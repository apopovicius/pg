const Connection = require('./connection');

class ICCacheConnection extends Connection {
    construct() {
        this.super();
    }

    connectionInfo() {
        return 'Im ICCACHE connection';
    }
}

module.exports = ICCacheConnection;
