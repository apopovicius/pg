require('dotenv').config();

const mockData = require('./mock-data.json');

const Job = require('./models/Job');
const connectDB = require('./db/connect');

const startPopulate = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Job.create(mockData);
        console.log('Populate Job with json data succeeded!!!');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

startPopulate();
