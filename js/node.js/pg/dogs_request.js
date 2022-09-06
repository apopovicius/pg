const https = require('https');

const option = {
    hostname: 'dog.ceo',
    port: 443,
    path: '/api/breeds/list/all',
    method: 'GET',
};

const req = https.request(option, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', (received_data) => {
        process.stdout.write(received_data);
    });
});

req.on('error', (err) => {
    console.log(err);
});

req.end();
