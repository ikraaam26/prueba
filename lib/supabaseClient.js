import { createClient } from '@supabase/supabase-js'

// Asegúrate de usar tus credenciales de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default supabase
