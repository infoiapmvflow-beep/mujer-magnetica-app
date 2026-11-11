import {createClient} from '@supabase/supabase-js';
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const configured = Boolean(url && key);
export const supabase = configured ? createClient(url, key, {
  auth: {autoRefreshToken:true, persistSession:true, detectSessionInUrl:true}
}) : null;
export async function getEntitlement(email) {
  const {data,error} = await supabase.from('entitlements').select('active').eq('email',email.toLowerCase().trim()).maybeSingle();
  if(error) throw error;
  return data?.active === true;
}
export async function loadProgress(userId) {
  const {data,error} = await supabase.from('user_progress').select('data').eq('user_id',userId).maybeSingle();
  if(error) throw error;
  return data?.data ?? {name:'',entries:{},complete:[]};
}
export async function saveProgress(userId, data) {
  const {error} = await supabase.from('user_progress').upsert({user_id:userId,data,updated_at:new Date().toISOString()});
  if(error) throw error;
}
