require('dotenv').config();
const crypto = require('crypto');

const express = require('express');
const app = express();

const { login, verify } = require('./controller/login');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.post('/login', login);
app.get('/verify', verify);

app.listen(3000);

// additional if you want to generate your own key
crypto.subtle
    .generateKey(
        {
            name: 'HMAC',
            hash: { name: 'SHA-256' },
        },
        true,
        ['sign', 'verify']
    )
    .then((key) => {
        crypto.subtle.exportKey('jwk', key).then((exported) => {
            console.log(exported.k);
        });
    });
