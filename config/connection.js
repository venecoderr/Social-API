import mongoose from 'mongoose';

const connectionString = 'mongodb://127.0.0.1:27017/socialAPIDB';

mongoose.connect(connectionString);

const connection = mongoose.connection;

export { connection };
