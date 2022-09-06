# Here is a sample of how to load static html in node.js server.

> Example here: https://www.pabbly.com/tutorials/node-js-http-module-serving-static-files-html-css-images/

# Key Notes

Form with no method has set GET as default

**get** - Appends the form-data to the URL in name/value pairs: URL?name=value&name=value
// eg. /register?email=test%40test.com&password=TTTT

```js
if (req.method === 'GET') {
    const formData = req.url;
    console.log(formData); // => /register?email=test%40test.com&password=TTTT
}
```

**post** - Sends the form-data as an HTTP post transaction
// you need to parse the request on chunk data

```js
if (req.method === 'POST') {
    let formData = '';
    req.on('data', (chunk) => {
        formData += chunk;
    });
    req.on('end', () => {
        console.log(formData.toString()); // => email=test%40test.com&password=TTTT
    });
}
```

# Just edit action on the form from form.html to use either GET or POST method

```html
<form class="form" action="/register" method="get"></form>
```

or

```html
<form class="form" action="/register" method="post"></form>
```
