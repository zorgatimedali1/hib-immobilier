import pg from 'pg';

const client = new pg.Client({
  host: 'db.qcozyjrtrickllaxbbxu.supabase.co',
  port: 5432,
  user: 'postgres',
  password: 'hL14QKoyk8TA95SB',
  database: 'postgres',
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  console.log('Connected to DB');

  await client.query(`
    CREATE OR REPLACE FUNCTION health_check()
    RETURNS integer
    LANGUAGE sql
    AS $$ SELECT 1; $$;
  `);
  console.log('Function created');

  const { rows } = await client.query('SELECT health_check()');
  console.log('Test result:', JSON.stringify(rows));

  await client.end();
}

main().catch((e) => {
  console.error('Error:', e.message);
  process.exit(1);
});
