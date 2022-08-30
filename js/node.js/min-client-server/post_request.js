const https = require('https');

const data = JSON.stringify({
    todo: 'Buy the milk',
});

const options = {
    hostname: 'ptsv2.com',
    port: 443,
    path: '/t/aameh-1661781965/post',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
    },
};

const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (err) => {
    console.error(error);
});

req.write(data);
req.end();
