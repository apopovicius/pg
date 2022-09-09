const express = require('express');
const router = express.Router();

router.use(logger);

//this should route query of /users/....
router.get('/', (req, res) => {
    // query comes when link has a query
    // eg /users?name=WhyNot
    console.log(req.query.name);
    res.status(200).send('List of all users');
});

router.get('/new', (req, res) => {
    // res.json({ message: 'New user' });
    // reder a new form
    res.render('users/new');
    //res.render('users/new', { firstName: 'Test' }); // if we send initial value to inputbox
});

router.post('/', (req, res) => {
    console.log(req.body.firstName); // firstName taken from name property of form input component
    const isValid = false;
    if (isValid) {
        users.push({ name: req.body.firstName });
        res.redirect(`/users/${users.length - 1}`);
    } else {
        console.log('Error');
        // to not type again the name in case of error send it as 2nd param
        res.render('users/new', { firstName: req.body.firstName });
    }

    //res.json({ message: `Create new user` });
});

//-> /users/1
// router.get('/:id', (req, res) => {
//     res.json({ message: `Get user ${req.params.id}` });
// });

// router.put('/:id', (req, res) => {
//     res.json({ message: `Update user ${req.params.id}` });
// });

// router.delete('/:id', (req, res) => {
//     res.json({ message: `Delete user ${req.params.id}` });
// });

router
    .route('/:id')
    .get((req, res) => {
        console.log(req.user);
        res.send(`Get User With ID ${req.params.id}`);
    })
    .put((req, res) => {
        res.send(`Update User With ID ${req.params.id}`);
    })
    .delete((req, res) => {
        res.send(`Delete User With ID ${req.params.id}`);
    });

const users = [{ name: 'Kyle' }, { name: 'Sally' }];
// this is a mw that can be run before interpreting the get request
router.param('id', (req, res, next, id) => {
    req.user = users[id];
    next(); //without next will run in loop without executing the next request in loop
});

function logger(req, res, next) {
    console.log(req.originalUrl);
    next(); //without next will run in loop without executing the next request in loop
}

module.exports = router;
