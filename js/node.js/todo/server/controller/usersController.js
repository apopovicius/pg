const Users = require('../models/usersModel');

exports.retrieveOrCreateUser = async (name, pass) => {
    try {
        let user = new Users(name, pass);
        const checkExistUser = await Users.findByName(name);
        if (checkExistUser.rowCount === 0) {
            console.log('Creating new user');
            const created = await user.addNew(name, pass);
            console.log(`Inserted ${created.rowCount} rows`);
            if (created.rowCount > 0) {
                return created.rows[0];
            } else {
                return '';
            }
        } else {
            console.log(
                `Found ${checkExistUser.rowCount} users with same name.`
            );
            for (row of checkExistUser.rows) {
                if (row.pass === pass) {
                    //match"
                    console.log('Password match');
                    return row;
                } else {
                    console.log('Not same password');
                    return '';
                }
            }
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};
