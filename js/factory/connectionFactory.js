const IEStoreConnection = require('./iestoreConnection');
const ICCacheConnection = require('./iccacheConnection');

class ConnectionFactory {
    create(type) {
        switch (type) {
            case 'iccache':
                return new IEStoreConnection();
            case 'iestore':
                return new ICCacheConnection();
            default:
                return new Error('Connection not supported');
        }
    }
}

module.exports = ConnectionFactory;
