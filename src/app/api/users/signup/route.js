import {initMongoose} from "../../../../lib/mongoose";
import Users from "../../../../models/Users";
import { NextRequest, NextResponse } from "next/server";

initMongoose();

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {name, email, password} = reqBody;
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}