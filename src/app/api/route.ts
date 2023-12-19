import { NextResponse } from "next/server"


type Props = {
  res : NextResponse,
  req : Request,
}



export const GET = async ({req,res}:Props) => {
   return NextResponse.json({message : "CIAO DA GET !!!! api "})
}

export const POST = async ({req,res}:Props) => {
   return NextResponse.json({message : "CIAO DA POST !!!! api"})
}