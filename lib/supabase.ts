// Cliente Supabase usando fetch nativo — sin dependencias externas
// Funciona en Expo Go sin polyfills ni AsyncStorage

const SUPABASE_URL      = 'https://xlvtqohkrppkfaldbjgz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsdnRxb2hrcnBwa2ZhbGRiamd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MDIyOTgsImV4cCI6MjA5Mzk3ODI5OH0.9VucnQK5H1SYjcsyATfOWSIhUIKhaGUEywnloMN7-os';

export const supabaseConfigured = !SUPABASE_URL.startsWith('TU_');

const HEADERS = {
  'apikey':        SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type':  'application/json',
};

/** Obtiene todos los pisos ordenados por fecha de publicación */
export async function fetchPisos(): Promise<any[]> {
  const url = `${SUPABASE_URL}/rest/v1/pisos?select=*&order=fecha_publicacion.desc`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`Supabase error ${res.status}: ${await res.text()}`);
  return res.json();
}
