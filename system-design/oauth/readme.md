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

Trying to get access to gmail contact in a 3rd party app.
1. Open App & click login with gmail
2. App redirects to **account.google.com** the authorization server
3. on this server user puts user and password(remember this is google authorization server)
4. next step is for the user to read and allow access to specific resources for the app that initiated this process
5. once click allow a successfull screen will be shown
6. redirect to the app with an access token to be used in further communication with google services


## OpenID Connect
**OAuth** - access the APIs(giving the app a way to make the api calls)
**OpenID Connect** - used for identification(tell the application about the user authenticated) 

**OpenID** is not a new protocol, is just a small addition to **OAuth**

## Types of tokens
- **ACCESS Token** (OAuth) - read by API
- **ID Token** (OpenID) - read by App

## Roles in OAUTH

- 🤵 User (Resource Owner)
- 💻 Device (User agent)
- 🎛 Application (Client)
- 🕋 OAuth Server (Authorization server aka the token factory)
- ⚙️ API (Resource Server)

! In the specs you will find the naming from paranthesys.


## OAuth Client

The goal of the client is to *obtain the access token* and *use it* to *access the resources* ( APIs requests)

### OAuth flows
This describes ways to obtain the token. So we have categories: 

- Authorization Code (web, mobile, Single Page Applications)
- Device flow (CLI, browserless devices)
- Client Credentials (server-to-server)
- ~~Implicit~~ (deprecated and unsecure) - this was a shortcut of authorization code, it was an workaround for browsers not having [CORS(cross origin resource sharing)](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS&ved=2ahUKEwis4tb4irKKAxX4ERAIHXXNK50QFnoECBcQAQ&usg=AOvVaw2xmyG8mpAqKyMiOwPBDkob)
- ~~Password~~ (deprecated and unsecure) - it was used to exchange the password for a token, being used in the past from migration of the apps that was storing user passwords to OAuth using the tokens

#### Authorization Code
Uses the redirect flow where the user is redirected to the authorization server and the ask for password and allow access and after thats done it gets redirect back to the app.

```mermaid
sequenceDiagram
    participant UserAgent
    participant Application
    participant OAuthServer
    participant API

    UserAgent->>+Application: Login
    rect rgb(191, 223, 255)
    Note over UserAgent, OAuthServer: Front channel
    Application->>+OAuthServer: Authorization request
    Note over OAuthServer, Application: Follow the login flow by entering user credential, approving access
    OAuthServer->>-Application: Authorization code response
    Note over OAuthServer, Application: the authorization code response is short unique string used to obtain tokens
    rect rgb(203, 143, 225)
    Note over UserAgent, OAuthServer: Back channel
    Application->>+OAuthServer: Token request using authorization code
    OAuthServer->>-Application: Token response
```
![Authorization Code](authorization-code.png)

**Back channel**: sent from client to server (http request from client to server, so request cannot be tampered with)

**Front channel**: Passing data via browser's address bar(the user, or malicious software can modify the request and the response)

> Interception Front channel: /redirect?code=XXXX (bad actor being able to see and take the CODE=XXXX)

> Injection Front channel: /redirect?code=XXX (bad actor modifies the code sent via redirect)

!! To prevent **injection** use **PKCE**

**PKCE**: Proof-key for code exchange
This is basically a secret hash generated(usually on the client based on a sequence of numbers) used in the flow so that initially is presented to OAuth server the hash and second at token exchange you present the sequence of numbers to OAuth sever where the hash is recalculated and validated to be the same as initially was presented. 

![PKCE](PKCE.png)

#### Device flow
- Scan your QR code from your device to login and authorize
- Enter activation code provided by entering for example nba.com/activate where you basically introduce your credentials

> All flows returns the **ACCESS TOKEN**

### Types of clients

- ⛓ Confidential Clients - application running on a server(this can keep strings secrets since runs in a safe environment)
- 🖥 Public Clients - application can't keep string secrets (browsers, mobile) like javascript/single page apps("view source"), native apps:

## Hands-on OAuth for web applications

Information needed:
- client_id: lLGYhM9fIHcEDaSGWzfVdpQMKWmKIPQs
- client_secret: xasdada221as231asdas
- state(just a random string): 1234567
- code_verifier(the secret): 4fb9d850b177fbe6f8cf7b63482bd3107a607d17f35b67d9d26cc796
- code_challenge(the hash of the secret): ByT0TtV2x-7gj7BltYYohefsc50dqztWv5ath7_wdBM
- code_challenge_method: tells the authorization server how hash was generated

### 1. Authorization
This first part is done in browser in the front channel. It requires user to login(use credential) and the URL will look like below.

```bash
https://dev-3nu78hainebrds5f.us.auth0.com/authorize?
  response_type=code&
  client_id={YOUR_CLIENT_ID}&
  state={RANDOM_STRING}&
  redirect_uri=https://example-app.com/redirect&
  code_challenge={YOUR_CODE_CHALLENGE}&
  code_challenge_method=S256
```

> One of the mandatory fields is **response_type=code**. This tells to the Authorization server please generate me a code valid that i will be use on the next step (token exchange)

> When the redirect comes in place you can check the **state** if matches the thing you initially sent 

> Redirect URL has to be registered/allowed on the Authorization Server

> Even in spec the **redirect_url** is not required in practice many Authorization Servers requires this parameter

> Redirect URL will look like this containing the **code** and **state**:

```bash
https://example-app.com/redirect?code=iU0W0Syb7_Wv6TddKU_02lQNETSpbvOK828tptLrBZ17T&state=12345667
```

> In this flow can be observed that first(authorize part) with **PKCE feature** we've sent the hash of the secret generated(in pair with the hash algorithm it was obtained) on the client side and after(token exchange part) the secret itself it is sent to the Authorization server for the validation to prevent inpersonification 


### 2. Token exchange
To be noticed that this request is done on the back channel and reaches the **token** endpoint. 

Also notice that the **client_secret** is included. 

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

## Token exchange in back channel

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
> Who is logged in? 

This helps you as OAuth flow doesnt offer any information about the user logged in.

> This is the part that introduces **ID Token** that offer information about the user logged in

To do that just add in the authorization flow a new scope.
That new scope will be **scope=openid**

## authorization in browser
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

## token exchange in backchanel
This will remain the same(as the one from refresh) but the response will include the id token that will include only few information like: **sub**(user id) and **sid**(session id). This token contains also information about issuer(**iss**) of the token and the audience(**aud** client id).

> If you want to extend the info provided in ID Token add new scope like **email** so that email will be part of that token. 

> Other relevant scope in OAuth is **profile**

> All this scopes are specific to the authoriation server.

References:
[OAuth](https://www.oauth.com)
[OAuth School](http://oauth.school/)
[OAuth playground](oauth.com/playground)
[How to do a sequence diagram in readme file](https://mermaid.js.org/syntax/sequenceDiagram.html)