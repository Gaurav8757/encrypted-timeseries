import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
const { MONGODB_URI, DB_NAME } = process.env;

const connectDB = async()=>{
    try {
        const connectionIns = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`MongoDB connected !! DB Host: ${connectionIns.connection.host}`);
    } catch (error) {
        console.log("Mongo connection error", error);
        process.exit(1);
    }
}

export default connectDB;