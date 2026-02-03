# Authentication
> **Authentication** is the process of verifying the identity of a user, device, or system before granting access to resources or services. It ensures that the entity requesting access is who it claims to be, typically through credentials such as passwords, tokens, biometric data, or cryptographic proofs.

## 1. Types/Methods
**A. Username/Password** - password are securely hashed and salted
**B. Token-based authentication** 
	- **JWT**
	- **OAuth2 / OpenID Connect**
**C. SSO(Single Sign-on)**  - allow users to log in once for multiple services

### Stateless vs Stateful Authentication
> **Stateful Authentication** - the server remembers you.

*Example:*
Traditional login with cookies + server sessions

*How it works:*
- You log in with username/password
- Server creates a session
- Session data is stored on the server (memory, DB, Redis, etc.)
- Client sends a session ID with each request
- Server looks it up every time

*Pros:*
- Simple to understand
- Easy to invalidate sessions (logout everywhere)
- Good control over user sessions

*Cons:*
- Server must store session data
- Harder to scale (need sticky sessions or shared storage)
- More infrastructure (Redis, DB sync)

> **Stateless Authentication** - the server does NOT remember you.

*Example:*
JWT, OAuth2 access tokens, API keys

*How it works (JWT / tokens):*
- You log in
- Server issues a token (e.g. JWT)
- Token contains user info + expiration
- Client sends the token with every request
- Server validates the token only, no DB/session lookup

*Pros:*
- No server-side session storage
- Easy horizontal scaling (great for microservices)
- Faster per request (no session lookup)

*Cons:*
- Harder to revoke tokens instantly
- Token size is bigger than a session ID
- Security depends heavily on token handling

---

## 2. Hashing and salt
> Hashing and salting are used to securely store passwords and prevent attackers from easily obtaining the original password even if the database is compromised.

**Hashing:**
- Converts the password into a fixed-length string using a one-way function
- Common algorithms: bcrypt, Argon2, PBKDF2
- Irreversible: original password cannot be derived from hash

**Salting:**
- Adds a unique random string to each password before hashing
- Prevents attackers from using precomputed tables (rainbow tables)
- Ensures identical passwords have different hashes

**Best Practices:**
- Always use a unique salt per password
- Use a strong hashing algorithm (bcrypt, Argon2) with a sufficient cost factor
- Store the hash and salt together securely in the database


```sh
# bycrypt format
$<version>$<cost>$<22-char-salt><31-char-hash>
```

---

## 3. JWT

**Token Types:**
- **Access Token:** Used to access protected APIs
- **ID Token:** Contains user identity information (authentication) 
- **Refresh Token:** Used to obtain new access tokens without logging in again

**Token Format:**
JWT consists of three parts:

1. **Header:** metadata, e.g., `{ "alg": "HS256", "typ": "JWT" }`
2. **Payload:** contains claims like `sub`, `iss`, `exp`
3. **Signature:** ensures integrity and authenticity

**Example JWT:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Token Lifecycle:**
- Expiration (`exp`) claim controls validity
- Refresh tokens support rotation and revocation

**Signing & Verification:** 
- **Algorithms:** HS256 (symmetric), RS256 (asymmetric)
- Servers verify token signature to trust the claims

**Example: Signing a JWT (Node.js with `jsonwebtoken`):**
```javascript
const jwt = require('jsonwebtoken');

const payload = { sub: user.id, name: user.name };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
```

**Verifying a JWT:**
```javascript
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

---

## 4. Token Storage & Transmission

**Client Storage Options:**
- Local storage
- HTTP-only cookies (more secure for XSS prevention)

**Transmission Methods:**
- HTTP Authorization header: `Authorization: Bearer <token>` (recommended)
- HTTP-only cookies (automatically sent) 
- POST request body (less common)

**Security Considerations:** 
- Use `HttpOnly`, `Secure`, and `SameSite` flags on cookies 
- Protect against XSS and CSRF attacks

---

## 6. Authentication Flows

**Login Flow:**
1. User submits credentials
2. Server validates and issues access + refresh tokens
3. Tokens are stored securely on the client

**Token Refresh Flow:** 
1. Access token expires
2. Client sends refresh token
3. Server validates refresh token
4. New access token is issued

**Logout / Revocation Flow:**
- Server invalidates refresh tokens
- Optional: blacklist access tokens

**Diagram (example):**
```
User → Login → Auth Server → Access + Refresh Token
User → Resource Server → Validates Access Token
Refresh Flow → New Access Token
Logout / Revoke → Token invalidated
```

### Bearer
> The term “Bearer” has a specific meaning in HTTP authentication, and it’s good to understand why it’s used with JWT. 

HTTP allows multiple authentication schemes (Basic, Digest, Negotiate, Bearer, etc.)

Using `Bearer` explicitly tells the server:

- This is a **token I hold**
- Treat it as a **bearer token**, not username/password

Meaning of “Bearer”:
- Bearer token = “anyone who bears (holds) this token can access the resource”
- It’s proof of authorization: the server doesn’t care who you are beyond the token — it just validates the token
- No additional credentials are needed, possession of the token is enough

> Think of it like a concert ticket: anyone holding the ticket can enter. You don’t need to show ID beyond the ticket itself.

*Example*: 
```
Authorization: Bearer <JWT>
```

**Authorization** → header that signals authentication
**Bearer** → type of authentication (token-based)
**<JWT>** → the actual token the client sends

The server reads this header, extracts the token, and validates it.

---

## 7. Security Considerations

**Password Storage:**
- Use strong hashing (bcrypt, Argon2) with salt
- Apply cost factors to slow down brute-force attacks

**Token Security:**
- Use short-lived access tokens
- Rotate refresh tokens
- Implement revocation or blacklist strategies

**Preventing Common Attacks:**
- Replay attacks → short-lived tokens
- Token theft → HTTPS, secure cookies
- CSRF/XSS → proper cookie flags and input sanitization

---

## 8. Glossary / References

**Glossary:**
- JWT: JSON Web Token
- JWS: JSON Web Signature
- JWE: JSON Web Encryption
- Claims: pieces of information in the payload
- Bearer token: anyone who holds it can access the resource

**References:**
- [RFC 7519 – JWT](https://www.rfc-editor.org/rfc/rfc7519.html)
- [OAuth2](https://oauth.net/2/)
- [OpenID Connect](https://openid.net/connect/)
- [JOSE](https://auth0.com/blog/demystifying-jose-jwt-family/)
- [No way, JOSE](https://www.youtube.com/watch?v=pblbKDugjq8)

## Q&A
1. What is authentication?
    a. Is the process to give permsions to system resouces
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