# Authentication

> **Authentication = proving you are who you say you are.**

Your app needs to verify identity before granting access to protected resources. The verification happens through credentials: passwords, tokens, biometric data, or cryptographic signatures.
This is the foundation. If attackers can fake authentication, every other security layer becomes pointless.


## 1. Authentication Methods
There are three main ways to authenticate a user.

### **A. Username/Password** 
Passwords are securely hashed and salted before storage.

### **B. Token-based Authentication** 
- **JWT** (JSON Web Tokens)
- **OAuth 2.0 / OpenID Connect**

### **C. Single Sign-On (SSO)**  
Allows users to log in once and access multiple services automatically.

### Stateless vs Stateful Authentication

> **Stateful Authentication** - the server remembers you.

This is the traditional login with cookies + server sessions where:
- you log in with username/password
- Server creates a session
- Session data is stored on the server (memory, DB, Redis, etc.)
- Client sends a session ID with each request
- Server looks it up every time

**Pros:**
- Simple to understand
- Easy to invalidate sessions (logout everywhere)
- Good control over user sessions

**Cons:**
- Server must store session data
- Harder to scale (need sticky sessions or shared storage)
- More infrastructure (Redis, DB sync)

> **Stateless Authentication** - the server does NOT remember you.

You'll commonly encounter **JWT, OAuth2 access tokens, and API keys** in stateless authentication. Don't worry if these terms aren't familiar yet—I'll cover them in detail.

*How it works (JWT / tokens):*
- You log in
- Server issues a token (e.g., JWT)
- Token contains user info + expiration time
- Client sends the token with every request
- Server validates the token signature; no database lookup needed

**Pros:**
- No server-side session storage
- Easy horizontal scaling (great for microservices)
- Faster per request (no session lookup)

**Cons:**
- Harder to revoke tokens instantly
- Token size is bigger than a session ID
- Security depends heavily on token handling

---

## 2. Hashing and salt
Your database gets breached. Happens all the time. Question is: can attackers use the stolen password data?


### Hash
**Hashing** makes passwords unreadable. You run `password123` through bcrypt and get back:
```
$2b$12$KIXxRVxJH8D.qQP9mHvwL.OjM7PQJZq7xYZ9K8uN6wFp3rL4vZ2Qq
```

It's one-way—no algorithm can reverse this back to `password123`. When users log in, you hash their input and compare hashes.

### Salt
**But there's a problem: same password = same hash.**

Attackers build massive rainbow tables—pre-computed hashes for millions of common passwords. They just look up your hash and boom—they've got your password.

**Enter: Salt.** Before hashing, append random data:
- User A: `password123` + `xK9$mP2q` → hash1
- User B: `password123` + `zL4@nQ8r` → hash2

Now identical passwords produce different hashes. Rainbow tables become useless.

**How to do it right:**
- Unique salt per user (bcrypt/Argon2 handle this automatically)
- High cost factor (12+ for bcrypt) = slower hashing = harder to brute-force
- Never roll your own crypto—use bcrypt or Argon2
```sh
# bcrypt stores everything in one string:
$<algorithm>$<cost>$<salt><hash>
```

---

## 3. 🔑 The Keys 

* **Private Key**: You keep this secret. Only **you** have it.
* **Public Key**: You share this with everyone. Anyone can see it.

Think of it like a mailbox analogy:

* **Public key = your mailbox address** → anyone can put letters in, but…
* **Private key = your mailbox key** → only you can open it.

---

###  **🖆 Digital Signatures (Proving “I sent this”)**

**Goal:** Make sure the message really comes from you and hasn’t been tampered with.

**Logic:**
1. You write a message.
2. You **sign it using your private key**.
* This creates a **digital signature**.
* Only your private key could have created this signature.
3. Anyone who has your **public key** can check the signature.
* They **cannot forge the signature** because they don’t have your private key.
* They can be sure the message is from you and hasn’t been altered.

> Sign = **Private key locks it** → Public key **unlocks your authenticity**.

---

### **🔐 Encryption (Keeping it secret)**

**Goal:** Make sure only the intended recipient can read the message.

**Logic:**

1. You want to send a secret message to Alice.
2. You **encrypt it using Alice’s public key**.
* Public key = anyone can lock a message for Alice.
3. Only Alice can decrypt it using her **private key**.
* Private key = only Alice can unlock it.

> Encrypt = **Public key locks it** → Private key **unlocks the secret**.

---

### **Putting it together (Sign + Encrypt)**

Sometimes, you want **both authenticity and secrecy**:

1. You **sign the message with your private key** → proves it’s from you.
2. You then **encrypt it with the recipient’s public key** → only they can read it.
3. Recipient process:
* Decrypt using their private key → read the message.
* Verify signature using your public key → confirm it’s really from you.

---

### 💡 How to Remember For Life

| Purpose             | Who Uses Private Key? | Who Uses Public Key? | Analogy                                                      |
| ------------------- | --------------------- | -------------------- | ------------------------------------------------------------ |
| Sign (authenticity) | Sender signs          | Anyone verifies      | Lock with private key → anyone unlocks to check              |
| Encrypt (privacy)   | Recipient decrypts    | Sender encrypts      | Lock with recipient’s public key → only recipient can unlock |

> **“Sign with private, prove with public. Encrypt with public, unlock with private.”**

---

## 4. JWT

> JWT (JSON Web Token) is basically a signed package of info that says "I verified this person, here's what I know about them, and I promise I didn't tamper with it". Client sends it on every request, server validates the signature and trusts the data inside.

### **Three parts, three jobs**

1. **Header** - tells you how it's signed. `{ "alg": "HS256", "typ": "JWT" }` means "HMAC with SHA256"
2. **Payload** - the actual data. User ID, email, permissions, whatever you put there. Standard claims are `sub` (subject/user ID), `iss` (issuer), `exp` (expiration)
3. **Signature** - proves nobody messed with it. Only someone with the secret key can create a valid signature

**Example JWT:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

Decode the middle part and you get: `{ "sub": "1234567890", "name": "John Doe", "iat": 1516239022 }`

### **Three types you'll use**

- **Access Token** - the day-to-day worker. Client sends this to call protected endpoints. Short-lived (15m, 1h)
- **ID Token** - carries user identity info. Used by the client itself to know "who am I?" (authentication)
- **Refresh Token** - the long-term player. Client uses this to get a fresh access token without re-logging in. Stored securely (httpOnly cookie or encrypted storage)

### **In practice**

User logs in → server creates access + refresh tokens → client stores them → client sends access token with every request → server validates signature, trusts the payload, grants access

When access token expires → client sends refresh token → server validates it → issues new access token
```javascript
// Sign a JWT
const jwt = require('jsonwebtoken');

const payload = { sub: user.id, name: user.name };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });

// Later, verify it
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### **Token lifecycle**

Access tokens live short (15min - 1h). Refresh tokens live long (days, weeks). Both have `exp` claim so they auto-expire. If you need to kill a token early (logout, permission change), you blacklist it or invalidate in DB (defeats the stateless benefit a bit, but necessary sometimes).

---

## 5. JWT Signing Options

You've got two ways to sign a JWT, and the choice matters for security and scaling.

### A. Symmetric (HMAC) – One secret, everyone knows it

You have a single secret key (like a password). Server signs the JWT with it, and anyone who needs to verify the JWT must know that same secret.

Example: `HS256` (HMAC with SHA256)

*How it works:*
- Server: "I'll sign this JWT with my secret `super_secret_key`"
- Client (or another server): "I'll verify it using the same secret"

*Pros:*
- Simple, fast
- No extra infrastructure

*Cons:*
- Secret has to be shared. If you have multiple servers/services that need to verify tokens, they all need the secret
- If the secret leaks, attacker can forge any JWT they want
- Doesn't scale well for public APIs or third-party integrations

*Use case:* Internal services only. Your backend signs tokens for your frontend, both know the secret, done.
```javascript
// Server A creates and signs
const token = jwt.sign({ sub: user.id }, 'super_secret_key', { expiresIn: '1h' });

// Server B verifies (needs the same secret)
const decoded = jwt.verify(token, 'super_secret_key');
```

---

### B. Asymmetric (RSA/ECDSA) – Private key signs, public key verifies

You have a key pair. Only the server (who has the private key) can sign. Anyone can verify using the public key.

Examples: `RS256` (RSA with SHA256), `ES256` (ECDSA with SHA256)

*How it works:*
- Server: "I'll sign this JWT with my private key" (secret, only you have it)
- Anyone: "I'll verify it using your public key" (shared everywhere)

*Pros:*
- Public key is safe to share. If it leaks, attacker still can't forge JWTs
- Scales for distributed systems, microservices, public APIs
- Third-party services can verify your tokens without you giving them secrets

*Cons:*
- Slightly more complex setup
- Public key management (you need to publish it somewhere)
- Slower than HMAC (asymmetric crypto is more expensive)

*Use case:* Public APIs, OAuth2/OIDC providers, microservices, anything where multiple parties need to verify your tokens.
```javascript
// Server signs with private key
const privateKey = fs.readFileSync('private.pem');
const token = jwt.sign({ sub: user.id }, privateKey, { algorithm: 'RS256', expiresIn: '1h' });

// Client/external service verifies with public key
const publicKey = fs.readFileSync('public.pem');
const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
```

---

**The IdP (Identity Provider) scenario**

When you use a third-party IdP (like Auth0, Google, Microsoft), you're the backend *client* verifying tokens, not the issuer. The IdP signs tokens with their private key. Your backend gets their public key and verifies. Public keys may rotate; that’s why IdPs provide **JWKS endpoints**.

```
User → IdP (signs with private key) → token issued
Your Backend ← (gets public key) → verifies token signature
```

Your backend doesn't sign anything. You just validate the signature and trust the payload. Even if the public key somehow leaks, you're safe—attackers can't forge JWTs because they don't have the IdP's private key.

```js
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
 jwksUri: 'https://idp.com/.well-known/jwks.json'
});

function getKey(header, callback){
 client.getSigningKey(header.kid, function(err, key) {
   const signingKey = key.getPublicKey();
   callback(null, signingKey);
 });
}

jwt.verify(token, getKey, {}, function(err, decoded) {
 if (err) console.log("JWT invalid");
 else console.log(decoded);
});
```

---

### Key Differences

| Aspect            | Symmetric (HS256)                | Asymmetric (RS256/ES256)              |
| ----------------- | -------------------------------- | ------------------------------------- |
| Key type          | Single secret key                | Private key / Public key pair         |
| Who signs         | Your server (or issuer)          | Your server (or issuer)               |
| Who verifies      | Anyone with the secret           | Anyone with the public key            |
| Risk if key leaks | Anyone with secret can forge JWT | Public key leak is safe; cannot forge |
| Typical use case  | Internal services, small scope   | Public clients, 3rd-party IdPs, OIDC  |


### Summary
* **Symmetric JWTs:** backend **must know the secret** from the IdP to validate.
* **Asymmetric JWTs:** backend **only needs the public key**, never the private key.

---

## 6. Token Storage & Transmission
### Where do you keep the token on the client?

Once the server gives you a JWT, you need to stash it somewhere so you can send it with every request. Two main options:

**Local Storage**
- You save the token in browser's `localStorage`
- Easy to access from JavaScript
- Problem: vulnerable to XSS (Cross-Site Scripting). If attacker injects malicious JS, they can steal your token

**HTTP-only Cookies** (better)
- Browser stores the token in a cookie
- JavaScript cannot access it (the `HttpOnly` flag blocks JS)
- Browser automatically sends it with every request
- Protected against XSS attacks
- Need `Secure` flag (only sent over HTTPS) and `SameSite` flag (CSRF protection)

*Bottom line:* Use HTTP-only cookies. They're safer.
```javascript
// Server sets the cookie
res.cookie('accessToken', token, {
  httpOnly: true,    // JS can't read it
  secure: true,      // HTTPS only
  sameSite: 'strict' // CSRF protection
});
```

---

### How do you send the token to the server?

**1. HTTP Authorization Header** (most common)
- Client reads the token from storage
- Sends it in the `Authorization` header: `Authorization: Bearer <token>`
- Server extracts and validates
```javascript
// Client sends
fetch('/api/protected', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Server extracts
const token = req.headers.authorization?.split(' ')[1];
```

**2. HTTP-only Cookie** (automatic)
- Browser sends the cookie automatically with every request
- No JavaScript needed
- Server reads from `req.cookies`

**3. POST request body** (rare)
- You include the token in the JSON body
- Not recommended—less secure, more verbose

---

### Security flags on cookies matter

- `HttpOnly` - JavaScript can't read it (blocks XSS theft)
- `Secure` - only sent over HTTPS (no man-in-the-middle)
- `SameSite=Strict` - cookie only sent to same origin (blocks CSRF)

Without these, your token is exposed.

---

## 7. Authentication Flows

### **The login flow - getting tokens**

1. User enters username + password
2. Server validates (check against hashed password in DB)
3. If valid: server creates access token + refresh token
4. Server sends both back to client
5. Client stores them (httpOnly cookie or secure storage)

From now on, client sends the access token with every API request. Server validates the signature, trusts the payload, grants access.

### **The access token expires - refresh flow**

Access tokens are short-lived (15 min, 1 hour). When it expires, client needs a new one without asking the user to log in again.

1. Client tries to call `/api/protected` with expired access token
2. Server rejects: "token expired"
3. Client sends the refresh token to `/api/refresh`
4. Server validates the refresh token (longer-lived, different rules)
5. Server issues a new access token
6. Client retries the original request

Why separate tokens? Access tokens are short-lived and stateless (fast). Refresh tokens are long-lived and can be blacklisted/invalidated in DB if needed.

### **Logout / revocation - killing tokens**

When user logs out or you need to revoke access immediately:

- Simple approach: delete the cookie/token on client side. But if someone stole the token before logout, they can still use it (until it expires)
- Safer approach: blacklist the refresh token in DB. Next time someone tries to refresh, you check the blacklist and reject
- Nuclear option: blacklist both access and refresh tokens (more DB queries, less scalable, but most secure)
```javascript
// Login
app.post('/login', (req, res) => {
  const user = validateCredentials(req.body);
  const accessToken = jwt.sign({ sub: user.id }, SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ sub: user.id }, REFRESH_SECRET, { expiresIn: '7d' });
  
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
  res.json({ accessToken });
});

// Refresh
app.post('/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const newAccessToken = jwt.sign({ sub: decoded.sub }, SECRET, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
});
```

**Visual flow:**
```
LOGIN:
User → [POST /login with credentials] → Server validates → creates tokens → sends back

REQUEST:
Client → [GET /api/protected + Authorization: Bearer <accessToken>] → Server validates signature → grants access

REFRESH:
Access token expired → Client → [POST /refresh with refreshToken] → Server validates → new accessToken issued

LOGOUT:
User → [POST /logout] → Client clears token → done
```

### Bearer Token

The term "Bearer" has a specific meaning in HTTP authentication.

HTTP supports multiple authentication schemes: **Basic**, **Digest**, **Negotiate**, **Bearer**, etc.

Using `Bearer` explicitly tells the server: "This is a token I hold. Treat it as a bearer token, not username/password."

**What "Bearer" means:**
- A bearer token means "anyone who holds (bears) this token can access the resource"
- It's proof of authorization: the server validates the token itself, not your identity
- Possession of the token is sufficient—no additional credentials needed

**Analogy:** Think of it like a concert ticket. Anyone holding the ticket can enter; you don't need to show ID beyond the ticket itself.

**In practice:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

The header contains three parts:
- `Authorization` → header that signals authentication
- `Bearer` → specifies the authentication type (token-based)
- `eyJh...` → the actual token value

The server extracts the token (everything after "Bearer ") and validates it.

---

## 8. Security Considerations

### **Password Storage**

Never store plain passwords. Ever. Hash them with bcrypt or Argon2, add salt (both do this automatically), and use a high cost factor to slow down brute-force attacks.
```javascript
const bcrypt = require('bcrypt');

// Hash password on registration
const hashedPassword = await bcrypt.hash(password, 12); // cost factor 12

// Verify on login
const isValid = await bcrypt.compare(inputPassword, hashedPassword);
```

High cost factors = slower hashing = harder for attacker to brute-force. 12+ for bcrypt is solid.

---

### **Token Security**

Keep tokens short-lived. Access tokens die in 15 minutes to 1 hour. Refresh tokens live longer but should be rotatable and revocable.

Why? If someone steals a token, it's only useful for a short window. After that, it's useless. Attacker has to steal the refresh token too, which you can revoke or rotate.
```javascript
// Short-lived access token
const accessToken = jwt.sign(payload, secret, { expiresIn: '15m' });

// Longer-lived refresh token
const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: '7d' });
```

---

### **Common attacks and how to block them**

**Replay Attacks** - attacker captures a valid request and replays it later
- Fix: Use short-lived tokens. By the time attacker replays it, token is expired.
- Also: use nonce (one-time number) for sensitive operations

**Token Theft** - attacker steals your token (from network, browser, etc.)
- Fix: HTTPS only (encrypts in transit), httpOnly cookies (JS can't read), Secure flag
- Also: rotate tokens regularly, especially refresh tokens

**CSRF (Cross-Site Request Forgery)** - attacker tricks you into making requests you didn't intend
- Fix: SameSite cookie flag (cookie only sent to same origin)
- Also: CSRF tokens for state-changing operations (POST, DELETE, etc.)

**XSS (Cross-Site Scripting)** - attacker injects malicious JS into the page
- Fix: httpOnly cookies (JS can't steal them), input sanitization
- Also: Content Security Policy (CSP) headers

---

**Best practices checklist**

- Hash passwords with bcrypt/Argon2 (cost factor 12+)
- Use short-lived access tokens (15m - 1h)
- Use httpOnly, Secure, SameSite flags on cookies
- HTTPS only (never HTTP in production)
- Validate token signature on every request
- Rotate/revoke refresh tokens regularly
- Sanitize user input (prevent XSS)
- Use strong secrets (not "password123")

---

## 9. Glossary / References

### **Key terms you'll see:**

- **JWT** - JSON Web Token. The token itself.
- **JWS** - JSON Web Signature. JWT with a signature (most common).
- **JWE** - JSON Web Encryption. JWT that's encrypted (rare, usually JWT + HTTPS is enough).
- **Claims** - pieces of information inside the payload. `sub`, `iss`, `exp`, `aud`, etc.
- **Bearer token** - anyone who holds it can use it. No additional credentials needed.
- **Stateless** - server doesn't store session data. Token contains everything.
- **Stateful** - server remembers you (traditional sessions).
- **Refresh token** - long-lived token used to get a new access token.
- **Access token** - short-lived token used to call protected APIs.

### **Resources:**
- [RFC 7519 – JWT](https://www.rfc-editor.org/rfc/rfc7519.html)
- [OAuth2](https://oauth.net/2/)
- [OpenID Connect](https://openid.net/connect/)
- [JOSE](https://auth0.com/blog/demystifying-jose-jwt-family/)
- [No way, JOSE](https://www.youtube.com/watch?v=pblbKDugjq8)

---

## Q&A
1. What is authentication?
    a. Is the process to give permisions to system resources
    b. Is the process to validate who the users claim to be

2. What is Authorization?
    a. Is the process to give permissions to system resources
    b. Is the process to validate who the users claim to be

3. Is Authentication required for Authorization??
    a. Yes - even authorization is orthogonal, meaning independent from authentication
    b. No

4. What's the advantage of saving hashes of the password?
    a. turn plaintext into an unintelligible series of numbers of letter using hashing algorithms
    b. hash is one-way mechanism this means once its coded it can't get back to plain text form.

5. What "act of salting" means?
    a. adding a series of random chars to a password before going through the hash. Making life hard for the "rainbow attack table"
    b. Repeatedly hashing a password to slow down brute-force attacks

6. What is true about JWT (JSON Web Token)?
    a. It is a compact and self-contained way to securely transmit information between parties.
    b. It can be digitally signed to ensure the integrity and authenticity of the data.
    c. It can store information in a payload that can be verified without querying the database.

7. What does TTL (Time To Live) refer to in computing/networking?
    a. The duration or lifetime that a piece of data, cache entry, or network packet is valid before it expires.
    b. The number of hops a network packet can take before being discarded.
    c. The expiration time set for cached or temporary data in databases or caches.

8. Which of the following are valid ways to send a JWT (JSON Web Token) from a client to a server?
    a. In the HTTP Authorization header (commonly as Bearer <token>).
    b. In the body of a POST request (e.g., JSON payload).
    c. In an HTTP-only cookie (sent automatically with requests).

9. Which of the following are parts of a JWT token?
    a. Header
    b. Payload
    c. Signature
    
10. Which JWT is used by the client to access protected APIs?
	a. ID token
    b. Access token
    c. Refresh token
    d. Session token
    
11. Which token primarily contains user identity information and is intended for the client?
    a. ID token
    b. Access token
    c. Refresh token
    d. OAuth token
    
12. Which token is used to obtain a new access token without asking the user to log in again?
    a. ID token
    b. Access token
    c. Refresh token
    d. Session token

13. Which of the following are valid types of JWTs?
    a.  JWS (JSON Web Signature)
    b. JWE (JSON Web Encryption)
    c. Unsecured JWT (alg: none)
    
14. Is a JWT considered stateful or stateless?
    a. Stateful
    b. Stateless
    c. Semi-stateful
    d. Depends on the algorithm
    
15. Which of the following is the standard way to send a JWT from client to server?
    a. In a query string
    b. In the HTTP Authorization header
    c. In a text file on the server
    d. In a plain HTML form field

16. Why are refresh tokens used in JWT-based authentication systems?
    a. To replace the access token automatically when expired
    b. To encrypt the JWT payload
    c. To store the user’s password in the token
    d. To avoid verifying the signature

**Answers**: 1.b, 2.a, 3.a, 4.a+b, 5.a, 6.a+b+c, 7.a+b+c, 8.a+b+c, 9.a+b+c, 10.b, 11.a, 12. c, 13.a+b+c, 14.b, 15.b, 16.a