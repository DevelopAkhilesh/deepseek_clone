import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

export async function GET(req){
    try{
        const{userID} = getAuth(req)

        if(!userID){
            return NextResponse.json({
                sucess: false,
                message:"user not found"
            });
        }

        //connect to database and fetch all chat for the user

        await connectDB();
        const data = await Chat.find({userID})
        return NextResponse.json({sucess:true, data})
    }catch(error){
        return NextResponse.json({sucess:false, error:error.message})

    }
}