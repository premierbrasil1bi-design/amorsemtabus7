import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validação simples para evitar crash total se as variáveis faltarem
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'ERRO CRÍTICO: Variáveis de ambiente do Supabase não definidas. \n' +
    'Se você está na Vercel, vá em Settings > Environment Variables e adicione VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.'
  );
}

// Cria o cliente. Se as variáveis forem undefined, o Supabase lançará erro no console,
// mas o site tentará carregar.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);