import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const {userId} = getAuth(req);
        const {chatId} = await req.json();

        if(!userId){
            return NextResponse.json({
                sucess:false,
                message:'User not authenticated',
            });
        }
        //Connection with db

        await connectDB();
        await Chat.deleteOne({_id:chatId,userId})
        return NextResponse.json({sucess:true,message:'Chat is Deleted'});
    } catch (error) {return NextResponse.json({success:false,error:error.message});
        
    }
}