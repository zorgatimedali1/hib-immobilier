import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qcozyjrtrickllaxbbxu.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjb3p5anJ0cmlja2xsYXhiYnh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDQ5NDY0OSwiZXhwIjoyMDk2MDcwNjQ5fQ.vFUMGmyiLvC7U93JOxpDz-Pd0_3BrSTIoQE-Xau-bx0';

const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

async function main() {
  const { error } = await supabase.rpc('health_check');
  if (!error) {
    console.log('health_check function already exists!');
    return;
  }

  console.log('Creating health_check function...');

  // Create via direct SQL using the Supabase Auth token approach
  // Use the service role key to execute SQL via REST
  const response = await fetch(`${supabaseUrl}/rest/v1/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Accept: 'application/json',
    },
  });

  console.log('REST response:', response.status);

  // Try direct pg endpoint
  try {
    const sqlResponse = await fetch(`${supabaseUrl}/auth/v1/`, {
      method: 'GET',
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
    });
    console.log('Auth endpoint:', sqlResponse.status);
  } catch {}


  console.log('\nTo create the function, run this SQL in your Supabase Dashboard SQL Editor:');
  console.log('-----------------------------------------------------');
  console.log("CREATE OR REPLACE FUNCTION health_check()");
  console.log("RETURNS integer");
  console.log("LANGUAGE sql");
  console.log("AS $$");
  console.log("  SELECT 1;");
  console.log("$$;");
  console.log('-----------------------------------------------------');
}

main();
