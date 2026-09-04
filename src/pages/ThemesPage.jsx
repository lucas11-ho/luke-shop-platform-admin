import React,{useEffect,useMemo,useRef,useState}from'react';
import{useAuth}from'../auth/AuthContext.jsx';
import{Badge,Card,ErrorBox,Loading,Modal,PageHeader,Tabs,Toast,tone}from'../components/UI.jsx';

const SAMPLE={
  key:'LUKE_COMMERCE_IOS',
  version:'1.0.0',
  name:'Luke Commerce iOS',
  description:'Professional commerce foundation for Customer Web with iOS-inspired controls and mobile navigation.',
  supported_apps:['CUSTOMER_WEB'],
  manifest:{
    schema_version:1,
    foundations:{colors:{primary:'#0a84ff',secondary:'#1c1c1e',accent:'#5e5ce6',background:'#f2f2f7',surface:'#ffffff',text:'#111111',muted_text:'#6e6e73',success:'#34c759',danger:'#ff3b30'},radius:'large',density:'comfortable',elevation:'soft',motion:'standard'},
    typography:{preset:'SYSTEM_MINIMAL',scale:'standard'},
    icons:{pack:'LUKE_OUTLINE',active_style:'filled',inactive_style:'outline',size:24},
    buttons:{primary:'ios_filled',secondary:'soft',tertiary:'ghost',destructive:'solid',icon:'round',size:'standard'},
    navigation:{mobile:'ios_tab',desktop:'header',labels:'always',active_indicator:'filled_icon',container:'edge'},
    components:{product_card:'commerce_clean',input:'ios_grouped',profile_card:'grouped',order_card:'clean'}
  },
  preview:{summary:'Clean iOS-inspired commerce system for buttons, account areas, product cards and mobile tab navigation.',figma_url:'',thumbnail_url:'',tags:['commerce','ios','mobile']}
};
const stringify=value=>JSON.stringify(value,null,2);
const appLabel=value=>value==='CUSTOMER_WEB'?'Customer Web':value==='STAFF_WEB'?'Staff Web':value;

export function ThemesPage(){
  const{api,isOwner}=useAuth();
  const[rows,setRows]=useState([]),[error,setError]=useState(null),[loading,setLoading]=useState(true),[tab,setTab]=useState('all'),[installOpen,setInstallOpen]=useState(false),[source,setSource]=useState(stringify(SAMPLE)),[parseError,setParseError]=useState(''),[busy,setBusy]=useState(''),[toast,setToast]=useState('');
  const fileRef=useRef(null);
  const load=async()=>{setError(null);setLoading(true);try{const result=await api.request('/v1/platform/themes');setRows(result.data.themes||[])}catch(e){setError(e)}finally{setLoading(false)}};
  useEffect(()=>{load()},[]);
  const visible=useMemo(()=>rows.filter(row=>tab==='all'||row.supported_apps?.includes(tab==='customer'?'CUSTOMER_WEB':'STAFF_WEB')),[rows,tab]);
  const counts={all:rows.length,customer:rows.filter(x=>x.supported_apps?.includes('CUSTOMER_WEB')).length,staff:rows.filter(x=>x.supported_apps?.includes('STAFF_WEB')).length};

  const parse=()=>{try{const value=JSON.parse(source);setParseError('');return value}catch(e){setParseError(`Invalid JSON: ${e.message}`);return null}};
  const install=async()=>{const body=parse();if(!body)return;setBusy('install');setError(null);try{await api.request('/v1/platform/themes/install',{method:'POST',body});setInstallOpen(false);setSource(stringify(SAMPLE));setToast('Theme package installed as Draft');await load()}catch(e){setError(e)}finally{setBusy('')}};
  const action=async(row,kind)=>{setBusy(`${row.key}@${row.version}:${kind}`);setError(null);try{if(kind==='delete')await api.request(`/v1/platform/themes/${encodeURIComponent(row.key)}/${encodeURIComponent(row.version)}`,{method:'DELETE'});else await api.request(`/v1/platform/themes/${encodeURIComponent(row.key)}/${encodeURIComponent(row.version)}/${kind}`,{method:'POST',body:{}});setToast(kind==='publish'?'Theme version published':kind==='retire'?'Theme version retired':'Draft deleted');await load()}catch(e){setError(e)}finally{setBusy('')}};
  const fileSelected=async event=>{const file=event.target.files?.[0];if(!file)return;try{if(file.size>1024*1024)throw new Error('Theme JSON must be 1 MB or smaller');const text=await file.text();JSON.parse(text);setSource(text);setParseError('')}catch(e){setParseError(e.message)}finally{event.target.value=''}};
  const copySample=async()=>{try{await navigator.clipboard.writeText(stringify(SAMPLE));setToast('Sample theme JSON copied')}catch{setSource(stringify(SAMPLE));setInstallOpen(true)}};

  return <>
    <PageHeader eyebrow="Design system distribution" title="Theme Library" description="Install, validate and publish versioned visual-system packages for Customer Web and Staff Web. Theme packages contain safe design tokens and named component variants only—never executable CSS or JavaScript." actions={isOwner&&<button className="primary" onClick={()=>setInstallOpen(true)}>+ Install theme</button>}/>
    <ErrorBox error={error}/>
    <div className="theme-library-callout"><div><strong>Platform-owned visual systems</strong><span>Figma remains the design source. Export or author the approved JSON package, install it here, then publish a fixed version for merchant admins to choose later.</span></div><button className="secondary" onClick={copySample}>Copy sample package</button></div>
    <Tabs value={tab} onChange={setTab} items={[{value:'all',label:'All themes',count:counts.all},{value:'customer',label:'Customer Web',count:counts.customer},{value:'staff',label:'Staff Web',count:counts.staff}]}/>
    {loading?<Loading/>:visible.length===0?<div className="empty"><strong>No theme packages yet</strong><span>Install the first approved JSON package to start the platform catalog.</span></div>:<div className="theme-library-grid">{visible.map(row=><ThemeCard key={`${row.key}@${row.version}`} row={row} isOwner={isOwner} busy={busy} onAction={action}/>)}</div>}
    <ThemeInstaller open={installOpen} onClose={()=>setInstallOpen(false)} source={source} setSource={setSource} parseError={parseError} parse={parse} install={install} busy={busy} fileRef={fileRef} fileSelected={fileSelected}/>
    <Toast message={toast} onDone={()=>setToast('')}/>
  </>;
}

function ThemeCard({row,isOwner,busy,onAction}){
  const m=row.manifest||{},colors=m.foundations?.colors||{},nav=m.navigation||{},buttons=m.buttons||{},icons=m.icons||{};
  const locked=row.status!=='DRAFT';
  return <Card title={row.name} subtitle={`${row.key} · v${row.version}`} className="theme-package-card">
    <div className="theme-card-meta"><Badge tone={tone(row.status)}>{row.status}</Badge>{(row.supported_apps||[]).map(app=><Badge key={app}>{appLabel(app)}</Badge>)}</div>
    <div className="theme-mini-preview" style={{'--theme-primary':colors.primary||'#0a84ff','--theme-bg':colors.background||'#f2f2f7','--theme-surface':colors.surface||'#ffffff','--theme-text':colors.text||'#111111'}}>
      <div className="theme-mini-phone"><div className="theme-mini-header"><i/><span/></div><div className="theme-mini-content"><strong>Aa</strong><span/><span/><button>Primary action</button></div><div className={`theme-mini-nav theme-mini-nav-${nav.mobile||'standard'}`}>{['⌂','▦','▢','≡','○'].map((x,i)=><i key={i} className={i===0?'active':''}>{x}</i>)}</div></div>
      <div className="theme-token-summary"><span>Navigation</span><strong>{nav.mobile||'standard'}</strong><span>Buttons</span><strong>{buttons.primary||'solid'}</strong><span>Icons</span><strong>{icons.pack||'LUKE_OUTLINE'} · {icons.size||24}px</strong><span>Typography</span><strong>{m.typography?.preset||'SYSTEM_MINIMAL'}</strong></div>
    </div>
    {row.preview?.summary&&<p className="theme-summary">{row.preview.summary}</p>}
    <div className="theme-tags">{(row.preview?.tags||[]).map(tag=><span key={tag}>{tag}</span>)}</div>
    <div className="theme-card-foot"><small>{locked?'Immutable published version':'Draft can be replaced by deleting and reinstalling before publish'}</small>{isOwner&&<div className="button-row">{row.status==='DRAFT'&&<><button className="secondary" disabled={!!busy} onClick={()=>onAction(row,'delete')}>Delete draft</button><button className="primary" disabled={!!busy} onClick={()=>onAction(row,'publish')}>Publish</button></>}{row.status==='PUBLISHED'&&<button className="danger" disabled={!!busy} onClick={()=>onAction(row,'retire')}>Retire</button>}</div>}</div>
  </Card>;
}

function ThemeInstaller({open,onClose,source,setSource,parseError,parse,install,busy,fileRef,fileSelected}){
  const[preview,setPreview]=useState(null);
  useEffect(()=>{if(!open)setPreview(null)},[open]);
  const validate=()=>{const value=parse();if(value)setPreview(value)};
  return <Modal open={open} onClose={onClose} title="Install theme package" size="xl" footer={<><button className="secondary" onClick={onClose}>Cancel</button><button className="secondary" onClick={validate}>Validate package</button><button className="primary" disabled={busy==='install'} onClick={install}>{busy==='install'?'Installing…':'Install as Draft'}</button></>}>
    <div className="theme-installer-layout"><section className="theme-installer-editor"><div className="theme-installer-upload"><div><strong>Theme package JSON</strong><span>Choose a JSON exported from your design workflow, or paste/edit the manifest manually.</span></div><button className="secondary" onClick={()=>fileRef.current?.click()}>Upload JSON</button><input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={fileSelected}/></div><textarea className="theme-package-json" spellCheck="false" value={source} onChange={e=>{setSource(e.target.value);setPreview(null)}}/>{parseError&&<div className="alert error"><strong>Package validation</strong><span>{parseError}</span></div>}</section><section className="theme-installer-guide"><strong>Theme System v1 package</strong><ol><li>Use a unique uppercase <code>key</code> and semantic <code>version</code>.</li><li>Choose <code>CUSTOMER_WEB</code>, <code>STAFF_WEB</code>, or both.</li><li>Define foundations, typography, icons, buttons, navigation and named component variants.</li><li>Raw CSS, HTML, SVG, scripts or JavaScript are rejected by Backend validation.</li><li>After publishing, that exact version becomes immutable. Install a new version for later changes.</li></ol>{preview?<PackagePreview value={preview}/>:<div className="theme-validation-placeholder">Select <strong>Validate package</strong> to review metadata before installing.</div>}</section></div>
  </Modal>;
}

function PackagePreview({value}){return <div className="theme-package-review"><span>Package</span><strong>{value.name||'Unnamed'} · v{value.version||'—'}</strong><span>Key</span><strong>{value.key||'—'}</strong><span>Apps</span><strong>{(value.supported_apps||[]).map(appLabel).join(' · ')||'—'}</strong><span>Schema</span><strong>v{value.manifest?.schema_version||'—'}</strong><span>Mobile navigation</span><strong>{value.manifest?.navigation?.mobile||'—'}</strong></div>}
