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

## How API function?

> e.g. {{URL}}/products?featured=false&sort=-name,price&numericFilters=price>40,rating>=4&fields=name,price&limit=2&page=2

The API has one route `products` and it rely on query parameter to obtain data from DB

### Filtering

Based on the query paramenters we can request API to provide us information in regards:

-   featured field value: feature=false
-   name field value: name=jhon ( in case of name we can return result from partial strin input)
-   company: company=ikea
-   numericFilters - this is a custom query params used to filter the numeric values from DB like `price>40` or/and `rating>=4`

### Mapping result

You can opt that API return result containing only parts of the full product schema like by using `fields`

For eg we want the result to contain only name and price. To do that we pass: `fields=name,price`

### Sorting

We can order ASC or DESC the result based on one or multiple fields. By default the results are order ascended based on `createAt` field.

Add `&sort=-name,price` to the query parammeters. As it can be observed there are fields preceed by `-` like `-name`. In this case we want the name to be ordered DESC

### Pagination

> &limit=2&page=2

Based on this value we can set a `limit` of how many items should be displayed on a page.

Also `page=2` represents what page will be displayed. This is directly depending on the `limit` parameter and if thats not defined the default value is 10.
