// app/api/test-db/route.ts

import pool from "../lib/db";


export async function GET() {
  try {
    console.log('Querying DB from pool...');
    const [rows] = await pool.query('SELECT * FROM wp_users LIMIT 5');
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: 'DB connection failed',
        error: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
