# Sequelize package
Sequelize is a promised-based NodeJS ORM tool for **MySQL**, **MariaDB**, **SQLite**, **Microsoft SQL Server**, **Oracle DB**, **Amazon Redshift**, **Snowflake Data Cloud**.

Key features:
- transactions
- relations
- eager and lazy loading
- read replicas
- more ...
> Dependecies:
```bash
$ npm install --save sequelize  
# choose db driver of your choice
$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # Microsoft SQL Server
$ npm install --save oracledb # Oracle Database
```

## Connecting to a database 
There are many ways of creating a connection in Sequelize based on the constructor.
Check the documentation [here](https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-constructor-constructor) to understand each parameter also to see all **option** object properties.

> 3 ways of creating new Sequelize connection
```js
const { Sequelize } = require('sequelize')

// Option 1: Passing a connection URI
const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
});

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
```

## Testing connection
```js
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// closing connection
await sequelize.close() 
```

## Logging
By default, Sequelize will log into the console for every SQL query it performs. The options.logging option can be used to customize this behavior, by defining the function that gets executed every time Sequelize logs something.

Common useful values for options.logging:
```js
const sequelize = new Sequelize('sqlite::memory:', {
  // Choose one of the logging options
  logging: console.log, // Default, displays the first parameter of the log function call
  logging: (...msg) => console.log(msg), // Displays all log function call parameters
  logging: false, // Disables logging
  logging: msg => logger.debug(msg), // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
  logging: logger.debug.bind(logger), // Alternative way to use custom logger, displays all messages
});
```

## Core concepts
### Model basics
Models are the essence of Sequelize. A model is an abstraction that represents a table in your database. In Sequelize, it is a class that extends **Model**.

Models can be defined in two equivalent ways in Sequelize:
- Calling **sequelize.define(modelName, attributes, options)**
```js
const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  },
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
```
- Extending **Model** and calling **init(attributes, options)**
```js
class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  },
);

// the defined model is the class itself
console.log(User === sequelize.models.User); // true
```

### Model instances
### Model querying basic
### Model queryin finders
### Getter, setter, virtuals
### Validation & constraints
### Raw queries
### Associations
### Paranoid

# References
[Getting started with sequelize](https://sequelize.org/docs/v6/getting-started/)

# [bring me 🏘](sequelize.md)