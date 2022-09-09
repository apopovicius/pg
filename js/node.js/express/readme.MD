# Express js module

http://expressjs.com/

> npm install express

## Server setup

```js
const express = require('express');
const app = express();

app.get('/', (req,resp, next) ={});
app.post('/', (req,resp, next) ={});
app.put('/', (req,resp, next) ={});
app.delete('/', (req,resp, next) ={});
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

## Routes

> Usually goes under folder routes on the project level
> Key note here: order of routes is important: the routes order are process top-botttom
> e.g. if you have 2 routes '/:id' & '/new' will be treated as same route and the first one defined will always execute
> in order to not have issue always define the /path ahead of /:id

```js
// Here is the routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) {});
router.get('/new', (req,res,next) {});
router.get('/:id', (req,res,next) {});

module.exports = router


// Here is the server.js. How to use the newly defined routes
const userRoutes = require('routes/users');
//mount the router
app.use('/user', userRouter); // I mount the above routes to /users/something to not repeat users all the time
```
