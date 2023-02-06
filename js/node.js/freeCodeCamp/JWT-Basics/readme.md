# JWT Basic

> jwt.io

Playing with JWT basics.

This make use of npm packages:

-   http-status-codes
-   jsonwebtoken

## JWT

> xxxx.yyyy.zzzz

There are 3 parts: headers, payload, signature

### `Header` has two parts:

-   type of token, which is JWT
-   signing alghoritm being used, such as HMAC, SHA256 or RSA

```
{
    "alg": "HS256",
    "typ": "JWT"
}
```

> This json is `Based64Url` encoded to form the first part of JWT.

### `Payload` contains the claims:

-   _registered claims_ : set of predifined claims which are not mandatory but recommened: eg. `iss`(issuer), `exp`(expiration time), `sub`(subject), `aud`(audience), ...

-   _public claims_: can be defined at will by the user of JWTS. To avoid collisions should be defined in the IANA JSON Web Token Registry

-   _private claims_: custom claims created to share information between parties that agree on using and are neighter registerd or public claims

```
{
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true
}
```

> This json is `Based64Url` encoded to form the first part of JWT.

### `Signature`

To create this signature part you have to take the _encoded header_, the _encoded payload_, a _secret_, the _alghorithm_ specified in the header and sign that.

```
HMACSHA256(
    base64UrlEncode(header)+ "." +
    base64UrlEncode(payload),
    secret)
```

! `secret` must be stored on the server

## Login route

App ----- login request ---------> NodeServer
App <--- Response + Signed JWT --- NodeServer

## Dashboard route

App --- Request + Signed JWT ---> NodeServer
App <---------- Response -------- NodeServer
