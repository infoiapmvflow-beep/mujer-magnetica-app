import React, {useEffect,useState} from 'react';
import {configured,supabase,getEntitlement,loadProgress,saveProgress} from './cloud';
import {createRoot} from 'react-dom/client';
import {BookHeart, CalendarDays, CheckCircle2, Circle, Headphones, Heart, Home, Sparkles, ArrowLeft, LockKeyhole} from 'lucide-react';
import {days,allPractices} from './days';
import './style.css';
const linkAccess = import.meta.env.VITE_ACCESS_MODE === 'link';
const audioLibrary=[
 {day:1,title:'Hoy vuelvo a elegirme',kind:'Introducción · prueba de voz',file:'valentina-audio-01.mp3',duration:'0:23'},
 {day:2,title:'Observo mis pensamientos con calma',kind:'Meditación guiada',file:'valentina-audio-02.mp3',duration:'1:51'},
 {day:3,title:'No tengo que demostrar mi valor',kind:'Podcast',file:'valentina-audio-03.mp3',duration:'4:11'},
 {day:4,title:'Me permito recibir',kind:'Afirmaciones guiadas',file:'valentina-audio-04.mp3',duration:'3:46'},
 {day:5,title:'Mi relación con la abundancia',kind:'Podcast',file:'valentina-audio-05.mp3',duration:'6:26'},
 {day:6,title:'Encuentro con mi nueva versión',kind:'Meditación guiada',file:'valentina-audio-06.mp3',duration:'6:37'},
 {day:7,title:'Confío en la mujer que soy',kind:'Meditación guiada',file:'valentina-audio-07.mp3',duration:'6:48'}
];
function AudioPlayer({item,protectedAudio=false}){
 const [url,setUrl]=useState(protectedAudio ? '' : `${import.meta.env.BASE_URL}demo-audio/${item.file}`);
 const [error,setError]=useState('');
 useEffect(()=>{if(!protectedAudio)return;let active=true;
  supabase.storage.from('premium-audios').createSignedUrl(item.file,3600).then(({data,error})=>{
   if(!active)return;
   if(error)setError('No pudimos cargar este audio. Reintentá más tarde.');
   else setUrl(data.signedUrl);
  });return()=>{active=false};
 },[protectedAudio,item.file]);
 return <div className="audio-player"><div className="audio-icon"><Headphones size={21}/></div><div className="audio-info"><strong>{item.title}</strong><small>Día {String(item.day).padStart(2,'0')} · {item.kind} · {item.duration}</small>{url?<audio controls preload="none" src={url} aria-label={`Reproducir ${item.title}`}>Tu navegador no admite audio.</audio>:<small role="status">{error||'Cargando audio protegido…'}</small>}</div></div>
}
const PREFIX='mujer-magnetica-demo-v1';
function useStored(key,initial){const [value,setValue]=useState(()=>{try{const v=localStorage.getItem(`${PREFIX}-${key}`);return v===null?initial:JSON.parse(v)}catch{return initial}});useEffect(()=>{localStorage.setItem(`${PREFIX}-${key}`,JSON.stringify(value))},[key,value]);return [value,setValue]}
function App({cloudUser=null}){
const [tab,setTab]=useState('inicio'); const [selected,setSelected]=useState(1);
const [localName,setLocalName]=useStored('name','');const [localEntries,setLocalEntries]=useStored('entries',{});const [localComplete,setLocalComplete]=useStored('complete',[]);
const [remote,setRemote]=useState({name:'',entries:{},complete:[]});
const [cloudReady,setCloudReady]=useState(!cloudUser);
const [sync,setSync]=useState('');
useEffect(()=>{if(!cloudUser)return;let current=true;loadProgress(cloudUser.id).then(data=>{if(current){setRemote(data);setCloudReady(true)}}).catch(()=>{if(current){setSync('Error al leer tus datos. Recargá la página.')}});return()=>{current=false}},[cloudUser?.id]);
const name=cloudUser?remote.name:localName;
const entries=cloudUser?remote.entries:localEntries;
const complete=cloudUser?remote.complete:localComplete;
const setName=cloudUser?(value=>setRemote(old=>({...old,name:value}))):setLocalName;
const setEntries=cloudUser?(fn=>setRemote(old=>({...old,entries:typeof fn==='function'?fn(old.entries):fn}))):setLocalEntries;
const setComplete=cloudUser?(fn=>setRemote(old=>({...old,complete:typeof fn==='function'?fn(old.complete):fn}))):setLocalComplete;
useEffect(()=>{if(!cloudUser||!cloudReady)return;
 setSync('Guardando…');const timer=setTimeout(()=>saveProgress(cloudUser.id,remote).then(()=>setSync('Guardado en tu cuenta')).catch(()=>setSync('No se pudo guardar. Revisá tu conexión.')),700);return()=>clearTimeout(timer);
},[cloudUser?.id,cloudReady,remote]);
if(cloudUser&&!cloudReady)return <div className="auth-shell"><h1>Cargando tu espacio…</h1><p>{sync||'Recuperando tu diario privado.'}</p></div>;

const current=days.find(d=>d.day===selected);const done=complete.filter(n=>Number.isInteger(n)&&n>=1&&n<=21).length;const next=days.find(d=>!complete.includes(d.day))?.day||21;
const nav=[['inicio',Home,'Inicio'],['dias',CalendarDays,'Mis 21 días'],['diario',BookHeart,'Mi diario'],['audios',Headphones,'Audios']];
function exportDiary(){const content={app:'Mujer Magnética - diario de prueba',exportedAt:new Date().toISOString(),name,entries,complete};const blob=new Blob([JSON.stringify(content,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='mi-diario-magnetico.json';a.click();URL.revokeObjectURL(url)}
function updateEntry(v){setEntries(e=>({...e,[selected]:v}))}
function toggleDone(){setComplete(c=>c.includes(selected)?c.filter(n=>n!==selected):[...c,selected].sort((a,b)=>a-b))}
return <div className="shell"><header><div className="brand"><span className="brand-star">✦</span><div><strong>MUJER MAGNÉTICA</strong><small>por Valentina · {cloudUser?'tu espacio privado':linkAccess?'tu espacio personal':'edición de validación'}</small></div></div><div className="header-actions">{cloudUser&&<button className="logout" onClick={()=>supabase.auth.signOut()}>Salir</button>}<span className="brand-heart">♡</span></div></header>
<main>
{tab==='inicio'&&<><div className="hero"><span className="eyebrow">TU ESPACIO DE TRANSFORMACIÓN</span><h1>La mujer que estás eligiendo ser.</h1><p>21 días para reconectar con tu valor, explorar nuevas perspectivas y avanzar con intención.</p><button className="light-btn" onClick={()=>{setSelected(next);setTab('practica')}}>Continuar mi recorrido <span>→</span></button></div>
<section className="welcome"><div><span className="eyebrow burgundy">BIENVENIDA</span><h2>{name?`Hola, ${name}`:'Este espacio es tuyo'}</h2><p>Una práctica a la vez. Sin apuro, sin exigencias.</p></div><label className="name-field">¿Cómo te llamás?<input maxLength={36} value={name} onChange={e=>setName(e.target.value)} placeholder="Tu nombre"/></label></section>
<section className="progress-card"><div className="space-between"><h3>Tu avance</h3><strong>{done} / 21 días</strong></div><div className="bar"><div style={{width:`${done/21*100}%`}}/></div><p>Tu camino también se construye con pasos pequeños.</p></section>
<h2 className="section-title">Tu práctica de hoy</h2><div className="today" onClick={()=>{setSelected(next);setTab('practica')}} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&(setSelected(next),setTab('practica'))}><span className="eyebrow burgundy">DÍA {String(next).padStart(2,'0')} · {days[next-1].phase.toUpperCase()}</span><h3>{days[next-1].title}</h3><p>{days[next-1].affirmation}</p><strong>Empezar práctica →</strong></div></>}
{tab==='dias'&&<><span className="eyebrow burgundy">TU RECORRIDO</span><h1 className="page-title">21 días para vos</h1><p className="lead">Elegí cualquier día. {cloudUser?'Tus prácticas y respuestas se sincronizan en tu cuenta.':'Tus respuestas se guardan únicamente en este dispositivo y navegador.'}</p><div className="day-grid">{days.map(d=><button key={d.day} className={`day-tile ${complete.includes(d.day)?'is-done':''}`} onClick={()=>{setSelected(d.day);setTab('practica')}}><span>{complete.includes(d.day)?<CheckCircle2 size={19}/>:String(d.day).padStart(2,'0')}</span><strong>{d.title}</strong><small>{d.phase}</small></button>)}</div></>}
{tab==='practica'&&<><button className="back" onClick={()=>setTab('dias')}><ArrowLeft size={17}/> Todos los días</button><div className="practice-hero"><span className="eyebrow">DÍA {String(selected).padStart(2,'0')} · {current.phase.toUpperCase()}</span><h1>{current.title}</h1><p>“{current.affirmation}”</p></div>{allPractices[selected]&&<section className="reading-card"><span className="eyebrow burgundy">UN MOMENTO CON VALENTINA · LECTURA GUIADA</span><h2>Para leer con calma</h2><p>{allPractices[selected].reading}</p><h3>Preguntas para profundizar</h3><ul>{allPractices[selected].prompts.map((q,i)=><li key={i}>{q}</li>)}</ul></section>}{audioLibrary.find(a=>a.day===selected)&&<section className="reading-card"><span className="eyebrow burgundy">ESCUCHÁ A VALENTINA</span><AudioPlayer item={audioLibrary.find(a=>a.day===selected)} protectedAudio={!!cloudUser}/></section>}<section className="prompt-card"><span className="eyebrow burgundy">REFLEXIÓN</span><h2>{current.question}</h2><label htmlFor="journal">Mi diario personal</label><textarea id="journal" rows="6" placeholder="Escribí sin juzgarte. Este es tu espacio..." value={entries[selected]||''} onChange={e=>updateEntry(e.target.value)}/><span className="field-note">{cloudUser?sync||'Guardado en tu cuenta':'Guardado solo en este navegador; no se sincroniza entre dispositivos.'}</span></section><section className="action-card"><span className="eyebrow burgundy">ACCIÓN DEL DÍA</span><p>{current.action}</p></section>{allPractices[selected]&&<section className="reading-card small-reading"><span className="eyebrow burgundy">TU RITUAL DEL DÍA</span><p>{allPractices[selected].ritual}</p><h3>Para cerrar</h3><p>{allPractices[selected].close}</p></section>}<button className="primary wide" onClick={toggleDone}>{complete.includes(selected)?<><CheckCircle2 size={18}/> Día completado · Desmarcar</>:<><Circle size={18}/> Marcar práctica completada</>}</button></>}
{tab==='diario'&&<><span className="eyebrow burgundy">TU LUGAR PRIVADO</span><h1 className="page-title">Mi diario magnético</h1><p className="lead">Tus respuestas de los 21 días, reunidas en un solo lugar.</p><button className="backup-btn" onClick={exportDiary}>Descargar una copia de mi diario</button>{days.filter(d=>(entries[d.day]||'').trim()).length===0?<div className="empty"><BookHeart size={30}/><h3>Tus palabras tienen un lugar aquí</h3><p>Cuando escribas en una práctica, tu reflexión aparecerá en este diario.</p><button className="primary" onClick={()=>{setSelected(next);setTab('practica')}}>Escribir mi primera reflexión</button></div>:days.filter(d=>(entries[d.day]||'').trim()).map(d=><div className="journal-entry" key={d.day}><small>DÍA {String(d.day).padStart(2,'0')}</small><h3>{d.title}</h3><p>{entries[d.day]}</p><button onClick={()=>{setSelected(d.day);setTab('practica')}}>Editar ↗</button></div>)}</>}
{tab==='audios'&&<><span className="eyebrow burgundy">LA VOZ DE VALENTINA</span><h1 className="page-title">Tu biblioteca sonora</h1><p className="lead">Escuchá los siete audios de la primera semana. Podés pausar y continuar desde el reproductor. El primero es una introducción de prueba.</p>{audioLibrary.map(item=><AudioPlayer key={item.day} item={item} protectedAudio={!!cloudUser}/>)}<div className="note"><LockKeyhole size={18}/><p>{cloudUser?'Los días 8 al 21 tienen ejercicios y prácticas sin audio adicional.':linkAccess?'Acceso por enlace: podés compartir el vínculo. Tus respuestas quedan en este dispositivo.':'Acceso por enlace en esta versión de validación. El contenido no está protegido contra reenvíos.'}</p></div></>}

</main><nav>{nav.map(([id,Icon,label])=><button key={id} className={tab===id||(tab==='practica'&&id==='dias')?'active':''} onClick={()=>setTab(id)}><Icon size={21}/><small>{label}</small></button>)}</nav><footer>MUJER MAGNÉTICA™ · Una experiencia de reflexión y crecimiento personal, no atención médica ni psicológica.</footer></div>}
function AuthGate(){
 const [user,setUser]=useState(null);const [status,setStatus]=useState('Verificando sesión…');
 const [allowed,setAllowed]=useState(false);const [email,setEmail]=useState('');const [busy,setBusy]=useState(false);
 useEffect(()=>{let mounted=true;
  async function check(session){if(!mounted)return;setUser(session?.user||null);if(!session?.user){setAllowed(false);setStatus('Ingresá con el correo de tu compra.');return}
   setStatus('Verificando tu compra…');try{const result=await getEntitlement(session.user.email);if(mounted){setAllowed(result);setStatus(result?'':'No encontramos una compra activa para este correo. Si acabás de comprar, volvé a comprobar en unos minutos.')}}catch{if(mounted){setAllowed(false);setStatus('No pudimos verificar tu acceso. Intentá más tarde.')}}
  }
  supabase.auth.getSession().then(({data})=>check(data.session));
  const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>{setTimeout(()=>check(session),0)});
  return()=>{mounted=false;subscription.unsubscribe()};
 },[]);
 async function sendLink(event){event.preventDefault();setBusy(true);
  const {error}=await supabase.auth.signInWithOtp({email:email.trim(),options:{emailRedirectTo:window.location.origin}});
  setStatus(error?'No se pudo enviar el enlace. Revisá el correo e intentá de nuevo.':'Revisá tu correo: enviamos un enlace para ingresar.');setBusy(false);
 }
 if(user&&allowed)return <App key={user.id} cloudUser={user}/>;
 return <div className="auth-shell"><div className="auth-card"><span className="eyebrow burgundy">MUJER MAGNÉTICA™</span><h1>Tu espacio personal</h1><p>{status}</p>{user?<><p>Cuenta: {user.email}</p><button className="primary" onClick={()=>{setStatus('Verificando tu compra…');getEntitlement(user.email).then(v=>{setAllowed(v);setStatus(v?'':'Acceso aún no activado.')}).catch(()=>setStatus('Error al verificar acceso.'))}}>Volver a comprobar</button><button className="back" onClick={()=>supabase.auth.signOut()}>Usar otro correo</button></>:<form onSubmit={sendLink}><label htmlFor="email">Tu correo de compra</label><input id="email" type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@correo.com"/><button className="primary wide" disabled={busy}>{busy?'Enviando…':'Recibir enlace de acceso'}</button></form>}</div></div>
}
function NotConfigured(){return <div className="auth-shell"><div className="auth-card"><h1>MUJER MAGNÉTICA™</h1><p>Esta aplicación todavía no está configurada para acceso comercial. Contactá al equipo de soporte.</p></div></div>}
createRoot(document.getElementById('root')).render(linkAccess?<App/>:(configured?<AuthGate/>:(import.meta.env.DEV?<App/>:<NotConfigured/>)));
