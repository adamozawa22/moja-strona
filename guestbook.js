import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://zqbouelmkxdgjygqzled.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function handler(event) {
  if (event.httpMethod === 'POST') {
    const { name, message } = JSON.parse(event.body);

    if (!name || !message) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Brak danych' }) };
    }

    const { error } = await supabase
      .from('guestbook')
      .insert([{ name, message }]);

    if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) };

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  }

  if (event.httpMethod === 'GET') {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) };

    return { statusCode: 200, body: JSON.stringify(data) };
  }

  return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
}
