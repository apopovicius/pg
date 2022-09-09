# Express js module

http://expressjs.com/

> npm install express

## Server setup

```js
const express = require('express');
const app = express();

app.get('/', (req, resp, next) => {});
app.post('/', (req, resp, next) => {});
app.put('/', (req, resp, next) => {});
app.delete('/', (req, resp, next) => {});
// and so on

app.listen(3000);
```

### The response field - comunication with client

```js
app.get('/path', (req, res) => {
    // res.sendStatus(500);
    //res.send('Hi');
    //res.status(200).send('hi');
    //res.download(server.js);
    //res.json({ message: 'error message' });
    res.render('index');
});
```

### Setting up your view engine

> html location on the project recommended to be the folder views

> Some popular views engine modules: EJS, PUG

```js
app.set('view engine', 'ejs');
app.render('html_page');
```

### Send data from JS server and received it in the view

```js
app.render('html_page', { myData: 'Here is my data' });
```

```html
<body>
    <h1>We got: <%= myData %></h1>
</body>
```

### Render static content: html, css, images

> this content never changes and usualy its locate in project in the folder _"./public"_.

```js
app.use(express.static('public')); //public is the folder path
```

### Working with forms

> Params from GET method can be found in _req.query.name_, where name is the name of the param from path. eg /users?name=Mark

> Params from POST method can be found in _req.body.firstName_, where firstName taken from _name property_ of form input component

```js
app.use(express.urlEncoded({ extended: true })); // this is to access the body of request for post
app.use(express.json()); // json request, fetch from server to client
```

## Routes

> Usually goes under folder routes on the project level

> Key note here: order of routes is important: the routes order are process top-botttom

> e.g. if you have 2 routes '/:id' & '/new' will be treated as same route and the first one defined will always execute

> in order to not have issue always define the /path ahead of /:id

```js
// Here is the routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {});
router.get('/new', (req, res, next) => {});
router.get('/:id', (req, res, next) => {});

module.exports = router;

// Here is the server.js. How to use the newly defined routes
const userRoutes = require('routes/users');
//mount the router
app.use('/user', userRouter); // I mount the above routes to /users/something to not repeat users all the time
```

> In case you have same path for different methods you can chain them

```js
// initial
router.get('/:id', (req, res, next) => {
    res.send('GET');
});
router.post('/:id', (req, res, next) => {
    res.send('POST');
});
router.put('/:id', (req, res, next) => {
    res.send('PUT');
});

// you can use ROUTE
router
    .route('/:id')
    .get((req, res, next) => {
        res.send('GET');
    })
    .post((req, res, next) => {
        res.send('POST');
    })
    .put((req, res, next) => {
        res.send('PUT');
    });
```

> An other important thing we can use with routes is _param_. It's a middleware that runs before client request reach to its destination (route)

```js
router.param('id', (req, res, next) => {
    console.log(`received ${id}`);
    next();
});
```

## Middleware

```js
function logger(req, res, next) {
    console.log(req.originalUrl);
    next(); // if you want to execute the code from the route you always need to call the next
}

// use the MW global
app.use(logger); // Top-Bottom approach. The place in code where this is defined will influence the routes in having MW

//or use it to specific path
app.get('/', logger, (req, res) => {});
app.get('/', logger, logger, logger (req, res) => {}); // we can have as many MW as we want

//or put it in the router
router.use(logger);
//and so on
```
