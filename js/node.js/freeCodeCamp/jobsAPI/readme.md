# JobsAPI

It's the API used by FE for Jobs Application

Functionality:

-   Login / register
-   All request will work after login with JWT token
-   Manipulate a single jobs
-   Add new/delete job

## Project Setup

In order to spin up the project, in the root create .env with these two variables, with your own values.

MONGO_URI
JWT_SECRET

After that run this command

```bash
npm install && npm start
```

## Mongoose Errors

-   Validation Errors
-   Duplicate (Email)
-   Cast Error

## Security

-   helmet
-   cors
-   xss-clean
-   express-rate-limit

## Swagger UI

```yaml
/jobs/{id}:
    parameters:
        - in: path
          name: id
          schema:
              type: string
          required: true
          description: the job id
```
