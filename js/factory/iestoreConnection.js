const Connection = require('./connection');

class IEStoreConnection extends Connection {
    construct() {
        this.super();
    }

    connectionInfo() {
        return 'Im IEStore connection';
    }
}

module.exports = IEStoreConnection;
