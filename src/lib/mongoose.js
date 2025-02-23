import mongoose from "mongoose";
// import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// const MongoClient = new MongoClient(process.env.MONGODB_URI);
// const clientPromise = client.connect();

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to DB");
  });
  

export const initMongoose = async () => {
    if(mongoose.connection.readyState === 1){
      
        return mongoose.connection.asPromise();
    }

    return await mongoose.connect(process.env.MONGODB_URI);
}