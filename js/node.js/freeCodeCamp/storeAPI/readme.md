# STORE - API

This project provides a REST API for offering a list of products for the FE consumer.
This is using query params with various parameters in order to grine it as it please.
The projet focuses on operating various filter, order and query on the mongoDB

> e.g. {{URL}}/products?featured=false&sort=-name,price&numericFilters=price>40,rating>=4&page=2&fields=name,price&limit=2

## Mongoose

It uses mongoose as DB storage.
In the moongose schema we have defined:

-   the enum type and exemplify how you can work with this type of data
-   date type, current date

In order to populate with data you have to run the `populate-mongo-db.js` script that:

-   will clean the db from prev runs
-   populate with new data taken from `product-input-data.json`
