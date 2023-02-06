const Product = require('../models/products');

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({
        featured: true,
    }).sort('-name price');
    // this is how you use express-async-error
    // throw new Error('Testing error from express error async');
    res.status(200).json({ nbHits: products.length, products });
};

function obtainFilterObject(query) {
    const { featured, company, name, numericFilters } = query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        // in order to search for aprox string
        queryObject.name = { $regex: name, $options: 'i' };
    }

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };
        const reqEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
            reqEx,
            (match) => `-${operatorMap[match]}-`
        );
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
        });
    }

    console.log(`Query object: ${queryObject}`);
    return queryObject;
}

function obtainSortArguments(sort) {
    if (sort) {
        // '-price -> price desc order'
        // 'price -> price asc order'
        // mongo works with elements seprated by space not , as we pass in the api call
        return sort.split(',').join(' ');
    } else {
        return 'createdAt';
    }
}

const getAllProducts = async (req, res) => {
    const queryObject = obtainFilterObject(req.query);
    const { sort, fields } = req.query;

    let result = Product.find(queryObject);

    let sortArguments = obtainSortArguments(sort);
    console.log(`Sorting arguments: ${sortArguments}`);
    result.sort(sortArguments);

    // this is to limit result to certain fields
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        console.log(`Extracting fields: ${fieldsList}`);
        result = result.select(fieldsList);
    }

    //pagination and limits
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    console.log(`Page: ${page}, limit: ${limit}, skip: ${skip}`);
    result = result.skip(skip).limit(limit);
    // 23 products - 4 pages of 7 products=> 7 7 7 2

    const products = await result;
    res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
    getAllProductsStatic,
    getAllProducts,
};
