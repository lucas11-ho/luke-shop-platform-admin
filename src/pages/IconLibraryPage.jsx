import React,{useEffect,useMemo,useState}from'react';
import{useAuth}from'../auth/AuthContext.jsx';
import{Badge,ErrorBox,Loading,PageHeader,Tabs,Toast,tone}from'../components/UI.jsx';
import{ThemePhosphorIcon}from'../components/ThemePhosphorIcon.jsx';

const SCOPES=['NAVIGATION','TOPIC','CATEGORY','ACCOUNT','ACTION'];
const SCOPE_LABELS={NAVIGATION:'Navigation',TOPIC:'Topic',CATEGORY:'Category',ACCOUNT:'Account',ACTION:'Action'};
const STATUS_TABS=[{value:'all',label:'All'},{value:'published',label:'Published'},{value:'draft',label:'Draft'},{value:'retired',label:'Retired'}];

export function IconLibraryPage(){
 const{api,isOwner}=useAuth();
 const[rows,setRows]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState(null),[status,setStatus]=useState('all'),[scope,setScope]=useState('all'),[query,setQuery]=useState(''),[busy,setBusy]=useState(''),[toast,setToast]=useState('');
 const load=async()=>{setLoading(true);setError(null);try{const d=await api.request('/v1/platform/icons');setRows(d.data.icons||[])}catch(e){setError(e)}finally{setLoading(false)}};
 useEffect(()=>{load()},[]);
 const visible=useMemo(()=>rows.filter(row=>{
   if(status!=='all'&&row.status!==status.toUpperCase())return false;
   if(scope!=='all'&&!row.usage_scopes?.includes(scope))return false;
   const q=query.trim().toLowerCase();if(q&&!`${row.name} ${row.key} ${(row.tags||[]).join(' ')}`.toLowerCase().includes(q))return false;
   return true;
 }),[rows,status,scope,query]);
 const counts={all:rows.length,published:rows.filter(x=>x.status==='PUBLISHED').length,draft:rows.filter(x=>x.status==='DRAFT').length,retired:rows.filter(x=>x.status==='RETIRED').length};
 const setScopes=async(row,next)=>{if(!isOwner||row.status==='RETIRED'||next.length===0)return;setBusy(`${row.key}:scopes`);setError(null);try{await api.request(`/v1/platform/icons/${encodeURIComponent(row.key)}/scopes`,{method:'PUT',body:{usage_scopes:next}});setToast(`${row.name} usage updated`);await load()}catch(e){setError(e)}finally{setBusy('')}};
 const lifecycle=async(row,action)=>{setBusy(`${row.key}:${action}`);setError(null);try{if(action==='delete')await api.request(`/v1/platform/icons/${encodeURIComponent(row.key)}`,{method:'DELETE'});else await api.request(`/v1/platform/icons/${encodeURIComponent(row.key)}/${action}`,{method:'POST',body:{}});setToast(action==='publish'?'Icon published':action==='retire'?'Icon retired':'Draft deleted');await load()}catch(e){setError(e)}finally{setBusy('')}};
 return <><PageHeader eyebrow="Design system governance" title="Platform Icon Library" description="Control the professional icons client admins are allowed to select. Every icon is Platform-owned, published explicitly, and limited to approved usage scopes such as Navigation, Topic, Category, Account and Action."/><ErrorBox error={error}/><div className="icon-library-callout"><div><strong>One approved catalog for every Shope surface</strong><span>A future Topic editor will request only icons published for the Topic scope. Client admins select an approved icon key; they never upload executable SVG, HTML or JavaScript.</span></div><div className="icon-library-callout-badges"><Badge tone="success">Phosphor · A1</Badge><Badge>Custom color artwork · A2</Badge></div></div><Tabs value={status} onChange={setStatus} items={STATUS_TABS.map(x=>({...x,count:counts[x.value]}))}/><div className="icon-library-toolbar"><div className="icon-library-search"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search icons, keys or tags…"/></div><div className="icon-scope-filter"><button className={scope==='all'?'active':''} onClick={()=>setScope('all')}>All uses</button>{SCOPES.map(s=><button key={s} className={scope===s?'active':''} onClick={()=>setScope(s)}>{SCOPE_LABELS[s]}</button>)}</div></div>{loading?<Loading/>:visible.length===0?<div className="empty"><strong>No matching icons</strong><span>Change the status, scope or search filter.</span></div>:<div className="platform-icon-grid">{visible.map(row=><IconCard key={row.key} row={row} isOwner={isOwner} busy={busy} setScopes={setScopes} lifecycle={lifecycle}/>)}</div>}<Toast message={toast} onDone={()=>setToast('')}/></>;
}

function IconCard({row,isOwner,busy,setScopes,lifecycle}){
 const scopes=row.usage_scopes||[];const locked=row.status==='RETIRED';const weight=row.color_mode==='DUOTONE'?'duotone':'filled';
 const toggle=scope=>{const next=scopes.includes(scope)?scopes.filter(x=>x!==scope):[...scopes,scope];if(next.length)setScopes(row,next)};
 return <section className={`platform-icon-card ${locked?'retired':''}`}><div className="platform-icon-preview"><ThemePhosphorIcon name={row.library_icon} size={36} active activeStyle={weight}/></div><div className="platform-icon-title"><div><strong>{row.name}</strong><code>{row.key}</code></div><Badge tone={tone(row.status)}>{row.status}</Badge></div><div className="platform-icon-meta"><span>{row.library_pack}</span><span>{row.color_mode}</span><span>{row.library_icon}</span></div><div className="platform-icon-scopes"><small>Allowed client usage</small><div>{SCOPES.map(scope=><button key={scope} disabled={!isOwner||locked||!!busy} className={scopes.includes(scope)?'selected':''} onClick={()=>toggle(scope)}>{SCOPE_LABELS[scope]}</button>)}</div></div>{(row.tags||[]).length>0&&<div className="platform-icon-tags">{row.tags.map(tag=><span key={tag}>{tag}</span>)}</div>}<div className="platform-icon-foot"><small>{row.status==='PUBLISHED'?'Available to client admins in allowed scopes':row.status==='DRAFT'?'Not visible to client admins until published':'No longer offered for new selections'}</small>{isOwner&&<div className="button-row">{row.status==='DRAFT'&&<><button className="secondary" disabled={!!busy} onClick={()=>lifecycle(row,'delete')}>Delete</button><button className="primary" disabled={!!busy} onClick={()=>lifecycle(row,'publish')}>Publish</button></>}{row.status==='PUBLISHED'&&<button className="danger" disabled={!!busy} onClick={()=>lifecycle(row,'retire')}>Retire</button>}</div>}</div></section>;
}
