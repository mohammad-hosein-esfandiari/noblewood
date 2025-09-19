// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  if (body.secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 });
  }

  if (!body.tag) {
    return NextResponse.json({ revalidated: false, message: 'Tag is required' }, { status: 400 });
  }

  revalidateTag(body.tag);

  return NextResponse.json({ revalidated: true, tag: body.tag, now: Date.now() });
}


// $body = @{
//     secret = "mysecret"
//     tag = "landing-data"
// } | ConvertTo-Json

// Invoke-RestMethod -Uri http://localhost:4000/api/revalidate -Method POST -Body $body -ContentType "application/json"
