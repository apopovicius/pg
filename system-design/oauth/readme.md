# OAuth


## Why OAuth?
> OAuth was created to limit/delegate access to data.
### Password anti-pattern
In the past when the new application was launching there was a feature to find out if your friends is using the application as well. For that specific usecase the application was demanding for a user to login with their google/yahoo email and password in order to pick/scrape your address book from that account(provider)

![Faceebok](facebook.png)

**Why this bad?** 
- you give access to your entire account(all data) even if you needed limited access to contacts
- there is no way to revoke that access given
- you fully trust that application to give your credentials

**How to let an 3rd party app access my data without giving it the password?**

Let's think as example of a hotel reception. You as client provides the ID card to receptionist and they give you a card that will **only give you access** to your room not entire hotel.

> **Authorization server**: receptionist

> **Access Token**: access card

> **Resource(API)**: room door

## API Security Concepts

Trying to get access to gmail contact in a 3rd party app.
1. Open App & click login with gmail
2. App redirects to **account.google.com** the authorization server
3. on this server user puts user and password(remember this is google authorization server)
4. next step is for the user to read and allow access to specific resources for the app that initiated this process
5. once click allow a successfull screen will be shown
6. redirect to the app with an access token to be used in further communication with google services

### Roles in OAUTH

- 🤵 User (Resource Owner)
- 💻 Device (User agent)
- 🎛 Application (Client)
- 🕋 OAuth Server (Authorization server aka the token factory)
- ⚙️ API (Resource Server)

! In the specs you will find the naming from paranthesys.

> In the **OAuth** flow the user will only enter password on the **OAuth Server**, so the application will never see the user credentials

### Types of clients/applications
- ⛓ Confidential Clients - application running on a server(this can keep strings secrets since runs in a safe environment)
- 🖥 Public Clients - application can't keep string secrets (browsers, mobile) like javascript/single page apps("view source"), native apps:

### User Consent
The main purpose of the **redirect base method** was to make possible the authorization to happen on OAuthServer instead of app. 
By doing this you gain many security benefits and not only. For example if you want to extend the security of your autorization with MFA in the old flow you would have to change the application, but with this you will only change OAuthServer and it will be available on all types of devices.
**User consent** is telling by OAuthServer to the user what access is granting to the application, this way the user will know what is the access granting.
**User consent** This is used to prevent API calls directly from a tool instead of real application that can initiate this flow, making sure the user is the one consenting and initiating this action.
![Consent](consent.png)

**User consent** is not mandatory. In case of 1st party application this is not mandatory as you already run in a safe environment that you controll.
Also the **User consent** can be disable for other flows if you consider its not necessary.

### OAuth flows
This describes ways to obtain the token. So we have categories: 

- Authorization Code (web, mobile, Single Page Applications)
- Device flow (CLI, browserless devices)
- Client Credentials (server-to-server)
- ~~Implicit~~ (deprecated and unsecure) - this was a shortcut of authorization code, it was an workaround for browsers not having [CORS(cross origin resource sharing)](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS&ved=2ahUKEwis4tb4irKKAxX4ERAIHXXNK50QFnoECBcQAQ&usg=AOvVaw2xmyG8mpAqKyMiOwPBDkob)
- ~~Password~~ (deprecated and unsecure) - it was used to exchange the password for a token, being used in the past from migration of the apps that was storing user passwords to OAuth using the tokens

1. Authorization Code
Uses the redirect flow where the user is redirected to the authorization server and the ask for password and allow access and after thats done it gets redirect back to the app.

![Authorization Code](authorization-code.png)

**Back channel**: sent from client to server (http request from client to server, so request cannot be tampered with)

**Front channel**: Passing data via browser's address bar(the user, or malicious software can modify the request and the response)

> Interception Front channel: /redirect?code=XXXX (bad actor being able to see and take the CODE=XXXX)

> Injection Front channel: /redirect?code=XXX (bad actor modifies the code sent via redirect)

!! To prevent **injection** use **PKCE**

**PKCE**: Proof-key for code exchange
This is basically a secret hash generated(usually on the client based on a sequence of numbers) used in the flow so that initially is presented to OAuth server the hash and second at token exchange you present the sequence of numbers to OAuth sever where the hash is recalculated and validated to be the same as initially was presented. 

![PKCE](PKCE.png)

2. Device flow
- Scan your QR code from your device to login and authorize
- Enter activation code provided by entering for example nba.com/activate where you basically introduce your credentials

> All flows returns the **ACCESS TOKEN**

### Application/Client identity
- **client id** - the unique identifier for a client/application
- **authorization code** - short expiration date coupon to be used by application in backchannel to obtian the real access token.
- **client secret** - this in combination with authorization code makes sure that the **authorization code** was not stolen and it was used by the application that requested this.
- **PCKE** - Proof-key for code exchange is used in mobile app. this cant be deployed with **client secrets** as this gives everyone using application the access to secrets. this doenst offer information about identity of the application, only make sure the same application initiated the authorization flow will obtain the acess token AND NOT OTHER MALICIOUS APP OR ACTOR.
- **redirect_uri** - this is the endpoint where the OAuthServer will send back the authorization code.

### Types of tokens
- **Acces Token** (OAuth) - read by API
- **ID Token** (OpenID) - read by App
- **Refresh Token** (OAuth) - refresh the expired access token 

## OAuth Client
The goal of the client is to *obtain the access token* and *use it* to *access the resources* ( APIs requests)

## OAuth for web applications

> This flow is almost the same for the following types of applications:
- Single page application
- mobile apps
- regular web applications 

Before starting node down some information needed:
- client_id: lLGYhM9fIHcEDaSGWzfVdpQMKWmKIPQs
- client_secret: xasdada221as231asdas
- state(just a random string): 1234567
- code_verifier(the secret): 4fb9d850b177fbe6f8cf7b63482bd3107a607d17f35b67d9d26cc796
- code_challenge(the hash of the secret): ByT0TtV2x-7gj7BltYYohefsc50dqztWv5ath7_wdBM
- code_challenge_method: tells the authorization server how hash was generated

### Step 1. Authorization
> This first part is done in browser in the front channel. It requires user to login(use credential) and the URL will look like below.

```bash
https://dev-3nu78hainebrds5f.us.auth0.com/authorize?
  response_type=code&
  client_id={YOUR_CLIENT_ID}&
  state={RANDOM_STRING}&
  redirect_uri=https://example-app.com/redirect&
  code_challenge={YOUR_CODE_CHALLENGE}&
  code_challenge_method=S256
```

One of the mandatory fields is **response_type=code**. This tells to the Authorization server please generate me a code valid that i will be use on the next step (token exchange)

When the redirect comes in place you can check the **state** if matches the thing you initially sent 

Redirect URL has to be registered/allowed on the Authorization Server

Even in spec the **redirect_uri** is not required in practice many Authorization Servers requires this parameter

Redirect URL will look like this containing the **code** and **state**:

```bash
https://example-app.com/redirect?code=iU0W0Syb7_Wv6TddKU_02lQNETSpbvOK828tptLrBZ17T&state=12345667
```

 It can be observed that first(authorize part) has **PKCE feature**. 
 First we've sent the hash of the secret generated(in pair with the hash algorithm it was obtained) on the client side and after(token exchange part) the secret itself it is sent to the Authorization server for the validation to prevent impersonification 


### Step 2. Token exchange
>This request is done on the back channel and reaches the **token** endpoint. 

Notice that the **client_secret** is included at this step.

Other important thing to be observed is that as mentioned above now we are sending the **code_verifier(secret)** to the Authorizaiton server AND NOT THE INITIAL HASH(for matching). This is basically **PKCE** flow

In this case the **redirect_uri** will represent the endpoint where the token will be returned.

But the most important paramenter is the **code** obtained in the authorization flow

```bash
curl -X POST https://dev-3nu78hainebrds5f.us.auth0.com/oauth/token \
  -d grant_type=authorization_code \
  -d redirect_uri=https://example-app.com/redirect \
  -d client_id={YOUR_CLIENT_ID} \
  -d client_secret={YOUR_CLIENT_SECRET} \
  -d code_verifier={YOUR_CODE_VERIFIER} \
  -d code={YOUR_AUTHORIZATION_CODE}
```

Response looks like this:
```bash
{"access_token":"eyJhbGciOiJSUzI1NiIsI0WCJ9.eyJpc3MiOiJodHRwczovL2Rldi0zbnU3OGhhaW5lYnJkczVmLnVzLmF1dGgwLmNvbS8iLCJzdWIbGUuY29tIiwiaWF0IjoxNzM1NTA0OTMzLCJleHAiOjE3MzU1OTEzMzMsImp0aSI6ImFkZzdUMndkNWtCR1pkZXZmSEM1aXgiLCJjbGllbnRfaWQiOiJsTEdZaE05ZklIY0VEYVNHV3pmVmRwUU1LV21LSVBRcyJ9.Aj8rBa9BgKmi5SKqUFXctCI5rsNnZkLTKtpfMwRe1e_X3gcXz94HP_rPmVQJc5B8YXMPT7j7uRKSJ254QsP_A8ij5g3Cgr-6zRW0r2QDlM-k0C55QasXCt80uzQeoEBk7ehth5LJgS3nLNt_ML2RCWUZuq1Jku9hCbcinIus4FS1CA4Ebkzw8Xz0SDl-I3m3vFDMtg9n49rq68noGRCWwJh0K-KhOB99i52-jdFTBG39F_0sg","expires_in":86400,"token_type":"Bearer"}
```

This access token can be used to make API calls.

## OAuth for Internet Of Things - RFC8628
This is how to authenticate devices that doesnt have browsers or enable to use the OAuth flow, devices such TV, apple TV, chrome cast, etc.
![Device Flow](device-flow.png)

Flow:
- device starts the authorization flow by talking to OAuthServer, getting a set of instructions including the **code**
- show the code to the user of **DEVICE** in plain or via a **QR CODE** containing the link to the authorization server with the code attached
- **USER** of DEVICE uses a phone or computer **to activate that code** and doing authentication here. 
- in this time the **DEVICE** is pooling the OAuthServer for the confirmation that the flow has ended with success and it will get access as soon as **USER** finish the above step(pooling each 5s for the next 5 min)

### Showcase

1. **DEVICE** initiate the authorization

This request is done from the **DEVICE**
```bash
POST https://authorization-server.com/device 

  client_id={YOUR_CLIENT_ID}
  scope=youtube
```

2. This is the response it gets. **DEVICE** uses this information to show to the **USER**
Response
```json
{
  "device_code": "NSD232d2d2ds2asd23085SD",
  "user_code": "BWD_sSD",
  "verification_uri": "http://example.com/device",
  "expires_in":1800,
  "interval": 5
}
```
3. **USER** decide for example to scan the QR code and proceed with the steps by introducing user password and all steps.

4. **DEVICE** is pooling the OAuthServer for a response to see what happen with the authorization flow initiated 
```bash
POST https://authorization-server.com/token 

  grant_type=urn:ietf:params:oauth:grant_type:device_code
  client_id={YOUR_CLIENT_ID}
  device_code=NSD232d2d2ds2asd23085SD
```

> Response pending
```json
{
  "error": "authorization pending"
}
```

5. **DEVICE** finally gets the access token after **USER** finished the flow on his end(other device like PC,phone)
> Response success (after user finish the steps)
```json
{
  "access_token": "RTx4s3ss3sd34sd2sd",
  "expires_in":3600,
  "refresh_token": "KS2sd202d2ds2sdD1"
}
```

[Device Auth Flow](https://auth0.com/docs/get-started/authentication-and-authorization-flow/device-authorization-flow)


## Client Credentials Flow for Service Apps

> This covers Machine to Machine Application type. For this flow you’ll need to select the API you want to allow this application to be able to access. As part of the registration of this type of app you will end up by clicking in authorize to finish creating the machine-to-machine application, then click the Settings tab to see the client ID and secret. 

With the application credentials in hand, you’re ready to get an access token! To do that, you’ll need to use the authorization server’s token endpoint

Since this is a machine-to-machine flow, there is no user involved in the flow so there is no browser involved either. The application can make a direct request to the authorization server’s token endpoint to get an access token. If you’re using curl, replace the placeholder values in the request below with your own. (Make sure to replace the curly brackets, those are just to indicate placeholder values.)

```bash
curl -X POST https://xxxxxx.us.auth0.com/oauth/token \
  -d grant_type=client_credentials \
  -d client_id={YOUR_CLIENT_ID} \
  -d client_secret={YOUR_CLIENT_SECRET}
```

> The important thing to notice here is this **grant_type=client_credentials**. This basically tells the authorization server that we are in a machine to machine oauth flow.

## Refresh Tokens
This is the token used to basically refresh the expired access token. Its usefull in the scenarios when you dont want to ask user to login again(e.g. cron jobs)

> To include also the refresh token in the response of the token endpoint you will need to change the app settings by adding a new **scope**. By doing this basically you will receive the pair of access and refresh token. e.g. in AUTHO website **scope=offline_access**

### Authorization in browser

```bash
https://dev-3nu78hainebrds5f.us.auth0.com/authorize?
  response_type=code&
  client_id={YOUR_CLIENT_ID}&
  state={RANDOM_STRING}&
  scope=offline_access&
  redirect_uri=https://example-app.com/redirect&
  code_challenge={YOUR_CODE_CHALLENGE}&
  code_challenge_method=S256
```
> **scope** appair in the url paramenters now

### Token exchange in back channel

```bash
curl -X POST https://dev-3nu78hainebrds5f.us.auth0.com/oauth/token \
  -d grant_type=refresh_token \
  -d redirect_uri=https://example-app.com/redirect \
  -d client_id={YOUR_CLIENT_ID} \
  -d client_secret={YOUR_CLIENT_SECRET} \
  -d code_verifier={YOUR_CODE_VERIFIER} \
  -d code={YOUR_AUTHORIZATION_CODE}
```

> Observation on the **grant_type=refresh_token** change that initially in the token endpoint was **authorization_code**

## OpenID Connect
**OAuth** - access the APIs(giving the app a way to make the api calls)
**OpenID Connect** - used for identification(tell the application about the user authenticated) 

**OpenID** is not a new protocol, is just a small addition to **OAuth**

> Who is logged in? 

This helps you as OAuth flow doesnt offer any information about the user logged in.

> Remember that **ID Tokens** are always JWT

> This is the part that introduces **ID Token** that offer information about the user logged in

To do that just add in the authorization flow a new scope.
That new scope will be **scope=openid**

### authorization in browser
```bash
https://dev-3nu78hainebrds5f.us.auth0.com/authorize?
  response_type=code&
  client_id={YOUR_CLIENT_ID}&
  state={RANDOM_STRING}&
  scope=offline_access+openid&
  redirect_uri=https://example-app.com/redirect&
  code_challenge={YOUR_CODE_CHALLENGE}&
  code_challenge_method=S256
```

### token exchange in backchanel
This will remain the same(as the one from refresh) but the response will include the id token that will include only few information like: **sub**(user id) and **sid**(session id). This token contains also information about issuer(**iss**) of the token and the audience(**aud** client id who is interpreting it or what audience uses this token).

> If you want to extend the info provided in ID Token add new scope like **email** so that email will be part of that token. 

> Other relevant scope in OAuth is **profile**

> All this scopes are specific to the authoriation server.

### other way to obtain id token
There is an other way to ask Authorization Server for the **ID Token** and thats by changing the **response_type** from *code* to **id_token**. This will ONLY return the **ID Token**
```bash
https://dev-3nu78hainebrds5f.us.auth0.com/authorize?
  response_type=id_token&
  client_id={YOUR_CLIENT_ID}&
  state={RANDOM_STRING}&
  scope=offline_access+openid&
  redirect_uri=https://example-app.com/redirect&
  code_challenge={YOUR_CODE_CHALLENGE}&
  code_challenge_method=S256
```
In this scenario the Authorization server will return the **id token** directly in the redirect uri. As it arrives in front channel and can be seen by everyone this token **SHOULD** always be **VALIDATED**. This looks very similar to **implicit flow**. 

```bash
https://example-app.com/redirect#id_token=eyJ2Sd2sdsd2s2345s2sd&state=12345
```

### hybrid openid connect flows
```bash
https://dev-3nu78hainebrds5f.us.auth0.com/authorize?
  response_type=code+id_token&
  client_id={YOUR_CLIENT_ID}&
  state={RANDOM_STRING}&
  scope=offline_access+openid&
  redirect_uri=https://example-app.com/redirect&
  code_challenge={YOUR_CODE_CHALLENGE}&
  code_challenge_method=S256
```

In this scenario the **code** and **id token** will be received in the **front channel** in the **redirect uri**. The power of this combination is that in the id token it will be present a section called **c_hash** that represents the hash of the code generated and this way you can validate the code was not altered.

> To best recomendation around security is **ALWAYS** use **PKCE** in the **code authorization flow** in combination with code and id_token to validate the code and the hash of the code from the id_token(c_hash)


### validate the id token
In order to validate the token we will need a JWT validation library.
1. validate the signature of the JWT - the identifier of the key used to sign the token and algorithm can be found in the id token sections
```json
{
  "kid":"gaNTZV2234x2s323sxs3",
  "alg":"RS256"
}
```
2. check the *issuer* of the token - to make sure that the token is coming from the server you think its comming from 
```json
{
  "iss":"https://pk-demo.okta.com/oauth"
}
```

3. check the *audience* claim - this tells to who this token is designated and should match your application id

```json
{
  "aud":"XS2ds23sd2S2sd2DD"
}
```

4. check the timestamps for when it was created(**iat**) and where it will expire (**exp**)
```json
{
  "iat": 1602104200,
  "exp": 1602107800
}
```

5. check the **nonce** value if its the one you set in the request. If you use a front channel flow the request for id token **MUST** contain a **nonce** value. This value can be validated when ID Token is received.
```json
{
  "nonce": "ff23522d2ds2e3"
}
```

> After this validation is done you can use the token and see whats inside. Use **sub** to see whats the user id of the token **email** and **name** for other information of the user. Other field you might find is **amr** that tells the app how the user authenticated. In the below example the user used password. There are usecase where the user can use also password and second factor auth or any other combination. Other relevant information is to tell whats the timestamp of the user last login by **auth_time**

```json
{
  "sub":"05s2d2d2xcjjl223",
  "name":"Jhon",
  "amr": [
    "pwd"
  ],
  "auth_time": 1602104250
}
```

## Access Token

At high level there are only 2 types of access tokens:
- **reference token** - random string of char that doesnt mean anything
- **structured** or **self-encoded token** - this token inside of it contains information in some sort of format 

**Reference token** can be implemented in a relational db or hashing algoritm that can be store in memcache or redis.

**structured** you wanna insert information like: 
- user info
- Application
- Expiration & created time
- Scopes
- Authorization server. 

Most popular format for this form of tokens is **JSON WEB TOKEN**

> Remember **ONLY API** reads the **access token**

## JWT Access Token
>(JWT)[https://jwt.io/introduction]

### Structure
> xxxxx.yyyyy.zzzzz

In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are:
- Header
- Payload
- Signature

**Header** and **Payload** is based64 encoded. This means it can be decoded and you can read them in plain json format.

**Header** talks about only the token, which signing algoritm was used and what is th key identifier used to sign this token.

```json
{
  "kid":"ocgR2ds3rfsD",
  "alg": "RS256"
}
```

**Payload** contains the data you actually care about. This data refers in documentations as **claims**

```json
{
  "sub":"05s2d2d2xcjjl223",
  "name":"Jhon",
  "amr": [
    "pwd"
  ],
  "auth_time": 1602104250
}
```

There are three types of claims: 
- *registered* - predefined claims that are not mandatory but recommended(iss, exp, sub, aud, etc )
- *public* -  this can be defined at will by the JWT users. 
- *private* - custom claims created to share infomration between parties that agree on using them and are neighter registered or public claims.


**Signature**
To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

For example if you want to use the HMAC SHA256 algorithm, the signature will be created in the following way:
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

The signature is used to **verify the message wasn't changed along the way**, and, in the case of tokens signed with a private key, it can also verify that the sender of the JWT is who it says it is.

### Token Validation
- remote - by using introspect remote validation server
- locally - by using cypto libraries that decode and validate parts of the token

## Always remember

1. **grant_type** in the token endpoint:
- authorization_code - used in webapp flows to obtain the access token
- refresh_token - used to obtain the refresh token
- client_credentials - used in machine to machine flow to obtain the access token
- device_code - Device Authorization Grant (this is used by devices like TVs)
- pkce - Proof Key for Code Exchange

2. **OAuth Scopes**
Scope is a mechanism in OAuth 2.0 to limit an application's access to a user's account. An application can request one or more scopes, this information is then presented to the user in the consent screen, and the access token issued to the application will be limited to the scopes granted.

3. **JWT vs JWE**
You can always make your JWT token encrypted by activating this feature on your app registered

4. **code vs access_token vs refresh_token vs id_token**
**code** is the unique short string return in browser by the Authorization server so that it can be used in token exchange
Each type of **token** servers a different purpose like: access, identify the user, refresh access

5. **PKCE** - feature to prevent impersonification 
In the authorization flow in browser you will provide the hash of the secret you generated on the client side and in the token flow you provide the secret that you use to obtain that hash.

6. **OpenID** is a feature on top of OAuth to tell you who is the user logged in. 
This is activated by adding the **scope=openid** in the authorization step. As the id token included in the response of the token endpoint is limited you can encrease the **scope** to obtain **email** or **profile** info

7. **redirect_url** is an optional field in the RFC documentation of OAuth but most of the Authorization servers requires this as mandatory being the endpoint where you will receive the **code** on a successul authorization flow.

## OAuth flow duplicated in a mermaid diagram
> This section can be ignored
```mermaid
  sequenceDiagram
    participant UserAgent
    participant Application
    participant OAuthServer

    UserAgent->>+Application: Login

    rect rgb(191, 223, 255)
      Note over UserAgent, OAuthServer: Front channel
      Application->>+OAuthServer: Authorization request
      
      Note over OAuthServer, Application: user enter credential to approve access
      OAuthServer->>-Application: Authorization code response

      Note over OAuthServer, Application: the auth code response is short unique string
    end

    rect rgb(203, 143, 225)
      Note over UserAgent, OAuthServer: Back channel
      Application->>+OAuthServer: Token request using authorization code
      OAuthServer->>-Application: Token response
    end
```



## References:
[OAuth](https://www.oauth.com)
[OAuth docs](https://oauth.net/2/)
[OAuth school](http://oauth.school/)
[OAuth playground](oauth.com/playground)
[How to do a sequence diagram in readme file](https://mermaid.js.org/syntax/sequenceDiagram.html)