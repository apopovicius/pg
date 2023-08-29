class Connection {
    constructor() {
        this.host = '';
        this.port = 0;
    }

    connect() {
        console.log('Connecting...');
    }

    disconnect() {
        console.log('Disconnectig...');
    }
}

module.exports = Connection;
