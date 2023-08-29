require('dotenv').config();
const ConnectionFactory = require('./connectionFactory');

const factory = new ConnectionFactory();
const iccache = factory.create(process.env.iccache);
const iestore = factory.create(process.env.iestore);

console.log(iccache.connectionInfo());
console.log(iestore.connectionInfo());
iccache.connect();
iestore.disconnect();
