import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
 

 
export async function GET(){
  return NextResponse.json({
    message: 'Hello from the API route!',
    status: 'success',
  });
}