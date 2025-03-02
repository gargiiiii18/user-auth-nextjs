import mongoose from "mongoose";

// mongoose.connection.on("connected", () => {
//     console.log("Mongoose connected to DB");
//   });
  
const connection = {};

export const initMongoose = async () => {
    if(connection.isConnected){
        console.log("Already connected to database");
        return;
    }
    try {
       const db = await mongoose.connect(process.env.MONGODB_URI || '');
       
       connection.isConnected = db.connections[0].readyState;
    //    console.log(db.connections);
       console.log("Database connected successfully");
       
    } catch (error) {
        console.log("Database connection failed", error); 
        process.exit(1);
    }
}