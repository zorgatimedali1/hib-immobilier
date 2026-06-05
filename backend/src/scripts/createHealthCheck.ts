import pg from 'pg';

const client = new pg.Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'postgres',
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
