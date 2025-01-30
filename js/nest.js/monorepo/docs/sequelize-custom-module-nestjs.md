## Sequelize custom module in nest JS

> Dependencies
```bash
$ npm install --save sequelize sequelize-typescript sqlite3
$ npm install --save-dev @types/sequelize
```

> Create Sequelize instance with option object in the constructor
```typescript
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const isInMemory = process.env.DB_MODE === 'in-memory'; 
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: isInMemory ? ':memory:' : 'database.sqlite', // In-memory or file-based SQLite
      });
      sequelize.addModels([]); //list of models
      await sequelize.sync();
      return sequelize;
    },
  },
];
```

# References
[Custom sequelize module in nestjs](https://docs.nestjs.com/recipes/sql-sequelize)

# [bring me 🏘](sequelize.md)