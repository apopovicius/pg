## User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

## Register User

-   Validate - name, email, password - with Mongoose
-   Hash Password (with bcryptjs)
-   Save User
-   Generate Token
-   Send Response with Token

## Login User

-   Validate - email, password - in controller
-   If email or password is missing, throw BadRequestError
-   Find User
-   Compare Passwords
-   If no user or password does not match, throw UnauthenticatedError
-   If correct, generate Token
-   Send Response with Token
