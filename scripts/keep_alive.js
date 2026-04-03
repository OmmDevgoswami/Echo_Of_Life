import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function keepAlive() {
  console.log('Sending keep-alive ping to Supabase...')
  const { data, error } = await supabase.from('posts').select('id').limit(1)

  if (error) {
    console.error('Error pinging database:', error.message)
    process.exit(1)
  }

  console.log('Ping successful! Database is active. Found:', data.length, 'posts.')
}

keepAlive()
