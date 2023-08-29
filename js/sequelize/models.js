const { Sequelize, Op } = require('sequelize');
const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'mssql',
});

const Address = sequelize.define('address', {
    Id_Address: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    street_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

const Location = sequelize.define('location', {
    Id_Location: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    location_description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

const Policy = sequelize.define('policy', {
    Id_Quote: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    policy_description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

// Define the relationships
Location.belongsTo(Address, { foreignKey: 'Id_Address' });
Address.hasMany(Location, { foreignKey: 'Id_Address' });

Location.belongsTo(Policy, { foreignKey: 'Id_Quote' });
Policy.hasMany(Location, { foreignKey: 'Id_Quote' });

// Sync the models with the database
sequelize
    .sync({ force: true })
    .then(async () => {
        // Create some sample data
        const address1 = await Address.create({ street_name: '123 Main St' });
        const address2 = await Address.create({ street_name: '456 Elm St' });
        const location1 = await Location.create({
            location_description: 'Location 1',
            Id_Address: address1.Id_Address,
        });
        const location2 = await Location.create({
            location_description: 'Location 2',
            Id_Address: address2.Id_Address,
        });
        const policy1 = await Policy.create({ policy_description: 'Policy 1' });
        const policy2 = await Policy.create({ policy_description: 'Policy 2' });
        await location1.setPolicy(policy1);
        await location2.setPolicy(policy2);

        // Query the data
        const policy = await Policy.findAll({
            where: { Id_Quote: 1 },
            include: [
                {
                    model: Location,
                    include: {
                        model: Address,
                        attributes: ['street_name'],
                    },
                },
            ],
            raw: true,
            nest: true,
        });
        console.log(JSON.stringify(policy, null, 2));
    })
    .catch(console.error);
