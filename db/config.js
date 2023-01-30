const mongoose = require("mongoose");

exports.dbConnnection = async() => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect( process.env.DB_CNN );
        console.log('Connected to db')
    } catch (error) {
        console.log(error);
        throw new Error('Error when trying to connect to db');
    }
};
