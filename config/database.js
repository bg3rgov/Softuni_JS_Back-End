const mongoose = require('mongoose');
const config = require('./config');

module.exports = async(dbConnection) => {

    try {
        
        await mongoose.connect(config.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log('CONNECTED TO MongoDB');
    } catch (error) {
        
        console.error(error);
    }
}