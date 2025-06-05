import mongoose from "mongoose";

let catched = global.mongoose || {conn: null, promise:null}


export default async function connectDB(){
    if(catched.conn) return catched.conn
    if(!catched.promise){
        catched.promise = mongoose.connect(process.env.MONGODB_URL).then((mongoose)=>mongoose);
    }
    try{
        catched.conn = await catched.promise;
    }catch(error){
        console.error("Error connecting to MongoDb:", error)
    }
    return catched.conn
}