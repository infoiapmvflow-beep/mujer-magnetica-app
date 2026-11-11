// Vercel serverless: verify the shared Hottok, product ID and event type before granting access.
import {timingSafeEqual} from 'node:crypto';
const approved=new Set(['PURCHASE_APPROVED','PURCHASE_COMPLETE','PURCHASE_COMPLETED']);
const revoked=new Set(['PURCHASE_REFUNDED','PURCHASE_CHARGEBACK','PURCHASE_CANCELED','PURCHASE_CANCELLED']);
function matchSecret(a,b){if(!a||!b)return false;const aa=Buffer.from(String(a));const bb=Buffer.from(String(b));return aa.length===bb.length&&timingSafeEqual(aa,bb)}
export function normalizeEvent(body){
 const raw=body?.data||{};const type=String(body?.event||'').toUpperCase();
 const eventId=String(body?.id||'');
 const product=String(raw?.product?.id ?? '');
 const email=String(raw?.buyer?.email||'').trim().toLowerCase();
 const millis=Number(body?.creation_date);
 if(!eventId||!product||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!Number.isFinite(millis)||millis<=0) return null;
 if(!approved.has(type)&&!revoked.has(type))return {ignored:true};
 return {event_id:eventId,product_id:product,email,active:approved.has(type),occurred_at:new Date(millis).toISOString(),event_type:type};
}
export default async function handler(req,res){
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Método no permitido'})}
 const {HOTMART_HOTTOK,HOTMART_PRODUCT_ID,SUPABASE_URL,SUPABASE_SERVICE_ROLE_KEY}=process.env;
 if(!HOTMART_HOTTOK||!HOTMART_PRODUCT_ID||!SUPABASE_URL||!SUPABASE_SERVICE_ROLE_KEY)return res.status(503).json({error:'Integración no configurada'});
 if(!matchSecret(req.headers['x-hotmart-hottok'],HOTMART_HOTTOK))return res.status(401).json({error:'No autorizado'});
 const evt=normalizeEvent(req.body);
 if(!evt)return res.status(400).json({error:'Evento incompleto'});
 if(evt.ignored)return res.status(200).json({ok:true,ignored:true});
 if(evt.product_id!==String(HOTMART_PRODUCT_ID))return res.status(200).json({ok:true,ignored:true});
 try{
  const response=await fetch(`${SUPABASE_URL.replace(/\/$/,'')}/rest/v1/rpc/apply_hotmart_event`,{method:'POST',headers:{'Content-Type':'application/json','apikey':SUPABASE_SERVICE_ROLE_KEY,'Authorization':`Bearer ${SUPABASE_SERVICE_ROLE_KEY}`},body:JSON.stringify(evt)});
  if(!response.ok)throw new Error(`Supabase HTTP ${response.status}`);
  return res.status(200).json({ok:true});
 }catch(error){console.error('Hotmart webhook processing error',error.message);return res.status(503).json({error:'Error temporal de procesamiento'})}
}
