import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

const connectdb = async () => {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
        console.log('Already connected');
        return mongoose.connection.db;
    }

    if (connectionState === 2) {
        console.log('Connecting...');
        return; 
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: 'pilter_db',
            bufferCommands: true,
            serverSelectionTimeoutMS: 30000,
        });

        console.log('Connected');
        return mongoose.connection.db; 
    } catch (error) {
        console.log('Error: ', error);
        throw new Error(`Error connecting to MongoDB: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

export default connectdb;