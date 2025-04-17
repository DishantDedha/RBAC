import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();



const connectToDatabase=async()=>
{
    try{
        const connect= await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to database");
        console.log(connect.connection.host);

    }catch(error)
    {
        console.error('Not able to connect to databse',error);
        process.exit(1);
    }
}


export default connectToDatabase;