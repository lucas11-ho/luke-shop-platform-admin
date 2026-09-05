import React,{useEffect,useMemo,useRef,useState}from'react';
import{useAuth}from'../auth/AuthContext.jsx';
import{Badge,Card,ErrorBox,Loading,Modal,PageHeader,Tabs,Toast,tone}from'../components/UI.jsx';
import{ThemePhosphorIcon}from'../components/ThemePhosphorIcon.jsx';

const PHOSPHOR_NAV=['house','storefront','squares-four','shopping-bag','basket','handbag','receipt','clipboard-text','package','list-checks','user-circle','user','heart','star','compass','magnifying-glass','tag','gift','bell','map-pin'];
const SAMPLE={
  key:'LUKE_COMMERCE_IOS',
  version:'1.6.0',
  name:'Luke Commerce iOS v1',
  description:'Commercial Customer Web theme with iOS system typography, Platform-governed Phosphor navigation, merchant-safe Navigation, Button, Forms/Input, Product Card, Typography and Commerce Surface Composers with renderer-backed choices.',
  supported_apps:['CUSTOMER_WEB'],
  manifest:{
    schema_version:1,
    foundations:{colors:{primary:'#0a84ff',secondary:'#1c1c1e',accent:'#5e5ce6',background:'#f2f2f7',surface:'#ffffff',text:'#111111',muted_text:'#6e6e73',success:'#34c759',danger:'#ff3b30'},radius:'large',density:'comfortable',elevation:'soft',motion:'standard'},
    typography:{preset:'IOS_SYSTEM',scale:'standard',heading_weight:'semibold',body_weight:'regular',caption_weight:'regular',button_weight:'semibold',line_height:'standard',letter_spacing:'normal'},
    icons:{pack:'PHOSPHOR_NAV',active_style:'filled',inactive_style:'outline',size:24,allowed:PHOSPHOR_NAV,navigation_defaults:{home:'house',explore:'storefront',cart:'shopping-bag',orders:'receipt',profile:'user-circle'}},
    buttons:{primary:'ios_filled',secondary:'ios_tonal',tertiary:'ios_plain',destructive:'ios_destructive',icon:'ios_circle',size:'standard'},
    navigation:{mobile:'ios_tab',desktop:'header',labels:'always',active_indicator:'filled_icon',container:'edge'},
    components:{product_card:'minimal',product_image_ratio:'square',product_badge_position:'top_left',product_price_layout:'stacked',product_quick_add:'button',product_density:'comfortable',product_radius:'large',product_elevation:'soft',typography_preset:'ios_system',typography_scale:'standard',typography_heading_weight:'semibold',typography_body_weight:'regular',typography_caption_weight:'regular',typography_button_weight:'semibold',typography_line_height:'standard',typography_letter_spacing:'normal',header_surface:'ios_clean',search_surface:'ios_search',account_surface:'ios_grouped',cart_surface:'ios_grouped',checkout_surface:'ios_grouped',form_control:'ios_grouped',form_size:'standard',form_group:'inset_grouped'},
    component_options:{
      product_card:['standard','minimal','soft','bold','technical','compact','quick_add','editorial'],
      product_image_ratio:['square','portrait','landscape','auto'],
      product_badge_position:['top_left','top_right','inline','hidden'],
      product_price_layout:['stacked','inline','emphasis','compact'],
      product_quick_add:['hidden','button','icon'],
      product_density:['compact','comfortable','spacious'],
      product_radius:['small','medium','large','xl'],
      product_elevation:['flat','soft','raised'],
      typography_preset:['ios_system','system_minimal','modern_sans','clean_commerce','geometric','friendly','humanist','editorial','luxury_serif','classic_serif','technical','compact_ui'],
      typography_scale:['compact','standard','large'],
      typography_heading_weight:['regular','semibold','bold','heavy'],
      typography_body_weight:['regular','medium','semibold'],
      typography_caption_weight:['regular','medium','semibold'],
      typography_button_weight:['medium','semibold','bold'],
      typography_line_height:['tight','standard','relaxed'],
      typography_letter_spacing:['tight','normal','wide'],
      header_surface:['standard','ios_clean','compact','glass'],
      search_surface:['standard','ios_search','pill','sheet'],
      account_surface:['standard','ios_grouped','soft','compact'],
      cart_surface:['standard','ios_grouped','soft','compact'],
      checkout_surface:['standard','ios_grouped','soft','compact'],
      nav_mobile:['standard','ios_tab','floating_tab','minimal_tab','commerce_tab'],
      nav_labels:['always','active_only','hidden'],
      nav_indicator:['filled_icon','pill','background','dot','underline'],
      nav_container:['edge','floating','glass'],
      nav_icon_size:['size_20','size_22','size_24','size_26'],
      nav_active_style:['filled','duotone','outline'],
      nav_inactive_style:['outline','filled'],
      button_primary:['ios_filled','ios_tonal','ios_outline','ios_soft','ios_pill'],
      button_secondary:['ios_tonal','ios_outline','ios_plain','ios_soft'],
      button_tertiary:['ios_plain','ios_tonal','ios_outline'],
      button_destructive:['ios_destructive','ios_destructive_soft','ios_destructive_outline'],
      button_icon:['ios_circle','ios_square','ios_plain'],
      button_size:['compact','standard','large'],
      form_control:['ios_grouped','soft_filled','outline','minimal'],
      form_size:['compact','standard','large'],
      form_group:['inset_grouped','card','flat']
    }
  },
  preview:{summary:'Luke Commerce iOS v1.6 adds merchant-safe Commerce Surface Composer recipes for Header, Search, Account, Cart and Checkout while preserving Store Designer structure and required commerce flows. Every surface choice is renderer-backed and package-approved with no merchant CSS execution.',figma_url:'',thumbnail_url:'',tags:['commerce','ios','mobile','phosphor','navigation-composer','button-composer','forms-composer','product-card-composer','typography-composer','commerce-surfaces','commercial','v1']}
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
  const copySample=async()=>{try{await navigator.clipboard.writeText(stringify(SAMPLE));setToast('Luke Commerce iOS v1.6 package copied')}catch{setSource(stringify(SAMPLE));setInstallOpen(true)}};
  const loadBuiltIn=()=>{setSource(stringify(SAMPLE));setParseError('');setInstallOpen(true)};
  return <><PageHeader eyebrow="Design system distribution" title="Theme Library" description="Install, validate and publish versioned visual-system packages for Customer Web and Staff Web. Theme packages expose only Platform-approved tokens, icon identifiers and named variants—never executable CSS or JavaScript." actions={isOwner&&<button className="primary" onClick={()=>setInstallOpen(true)}>+ Install theme</button>}/><ErrorBox error={error}/><div className="theme-library-callout"><div><strong>Luke Commerce iOS v1.6</strong><span>Built-in Customer Web package with iOS typography, Platform-governed Phosphor icons, Navigation, Button, Forms/Input, Product Card, Typography and Commerce Surface Composers. Install it as a Draft, review it, then publish the immutable v1.6.0 package. Existing v1.2/v1.3/v1.4/v1.5 stores stay unchanged.</span></div><div className="button-row"><button className="secondary" onClick={copySample}>Copy package JSON</button>{isOwner&&<button className="primary" onClick={loadBuiltIn}>Load built-in package</button>}</div></div><Tabs value={tab} onChange={setTab} items={[{value:'all',label:'All themes',count:counts.all},{value:'customer',label:'Customer Web',count:counts.customer},{value:'staff',label:'Staff Web',count:counts.staff}]}/>{loading?<Loading/>:visible.length===0?<div className="empty"><strong>No theme packages yet</strong><span>Install the first approved JSON package to start the platform catalog.</span></div>:<div className="theme-library-grid">{visible.map(row=><ThemeCard key={`${row.key}@${row.version}`} row={row} isOwner={isOwner} busy={busy} onAction={action}/>)}</div>}<ThemeInstaller open={installOpen} onClose={()=>setInstallOpen(false)} source={source} setSource={setSource} parseError={parseError} parse={parse} install={install} busy={busy} fileRef={fileRef} fileSelected={fileSelected}/><Toast message={toast} onDone={()=>setToast('')}/></>;
}

function ThemeCard({row,isOwner,busy,onAction}){
  const m=row.manifest||{},colors=m.foundations?.colors||{},nav=m.navigation||{},buttons=m.buttons||{},icons=m.icons||{},optionCount=Object.keys(m.component_options||{}).length,defaults=icons.navigation_defaults||{},phosphor=icons.pack==='PHOSPHOR_NAV';
  const previewSlots=['home','explore','cart','orders','profile'];const locked=row.status!=='DRAFT';
  return <Card title={row.name} subtitle={`${row.key} · v${row.version}`} className="theme-package-card"><div className="theme-card-meta"><Badge tone={tone(row.status)}>{row.status}</Badge>{(row.supported_apps||[]).map(app=><Badge key={app}>{appLabel(app)}</Badge>)}{phosphor&&<Badge>{(icons.allowed||[]).length} approved icons</Badge>}{optionCount>0&&<Badge>{optionCount} selectable groups</Badge>}</div><div className="theme-mini-preview" style={{'--theme-primary':colors.primary||'#0a84ff','--theme-bg':colors.background||'#f2f2f7','--theme-surface':colors.surface||'#ffffff','--theme-text':colors.text||'#111111'}}><div className="theme-mini-phone"><div className="theme-mini-header"><i/><span/></div><div className="theme-mini-content"><strong>Aa</strong><span/><span/><button>Primary action</button></div><div className={`theme-mini-nav theme-mini-nav-${nav.mobile||'standard'}`}>{previewSlots.map((slot,i)=><i key={slot} className={i===0?'active':''}>{phosphor?<ThemePhosphorIcon name={defaults[slot]} size={14} active={i===0} activeStyle={icons.active_style||'filled'}/>:<span className="theme-mini-icon-placeholder"/>}</i>)}</div></div><div className="theme-token-summary"><span>Navigation</span><strong>{nav.mobile||'standard'}</strong><span>Buttons</span><strong>{buttons.primary||'solid'}</strong><span>Icons</span><strong>{icons.pack||'LUKE_OUTLINE'} · {icons.size||24}px</strong><span>Typography</span><strong>{m.typography?.preset||'SYSTEM_MINIMAL'}</strong><span>Product Card</span><strong>{m.components?.product_card||'standard'}</strong><span>Header surface</span><strong>{m.components?.header_surface||'standard'}</strong><span>Selectable groups</span><strong>{optionCount||'Package defaults only'}</strong></div></div>{row.preview?.summary&&<p className="theme-summary">{row.preview.summary}</p>}<div className="theme-tags">{(row.preview?.tags||[]).map(tag=><span key={tag}>{tag}</span>)}</div><div className="theme-card-foot"><small>{locked?'Immutable published version':'Draft can be replaced by deleting and reinstalling before publish'}</small>{isOwner&&<div className="button-row">{row.status==='DRAFT'&&<><button className="secondary" disabled={!!busy} onClick={()=>onAction(row,'delete')}>Delete draft</button><button className="primary" disabled={!!busy} onClick={()=>onAction(row,'publish')}>Publish</button></>}{row.status==='PUBLISHED'&&<button className="danger" disabled={!!busy} onClick={()=>onAction(row,'retire')}>Retire</button>}</div>}</div></Card>;
}

function ThemeInstaller({open,onClose,source,setSource,parseError,parse,install,busy,fileRef,fileSelected}){const[preview,setPreview]=useState(null);useEffect(()=>{if(!open)setPreview(null)},[open]);const validate=()=>{const value=parse();if(value)setPreview(value)};return <Modal open={open} onClose={onClose} title="Install theme package" size="xl" footer={<><button className="secondary" onClick={onClose}>Cancel</button><button className="secondary" onClick={validate}>Validate package</button><button className="primary" disabled={busy==='install'} onClick={install}>{busy==='install'?'Installing…':'Install as Draft'}</button></>}><div className="theme-installer-layout"><section className="theme-installer-editor"><div className="theme-installer-upload"><div><strong>Theme package JSON</strong><span>Choose a JSON exported from your design workflow, or paste/edit the manifest manually.</span></div><button className="secondary" onClick={()=>fileRef.current?.click()}>Upload JSON</button><input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={fileSelected}/></div><textarea className="theme-package-json" spellCheck="false" value={source} onChange={e=>{setSource(e.target.value);setPreview(null)}}/>{parseError&&<div className="alert error"><strong>Package validation</strong><span>{parseError}</span></div>}</section><section className="theme-installer-guide"><strong>Theme System v1 package</strong><ol><li>Use a unique uppercase <code>key</code> and semantic <code>version</code>.</li><li>Choose <code>CUSTOMER_WEB</code>, <code>STAFF_WEB</code>, or both.</li><li>For selectable tab icons, use <code>icons.pack: PHOSPHOR_NAV</code>, provide a Platform-approved <code>icons.allowed</code> list, and define <code>navigation_defaults</code>.</li><li>Navigation, Button, Forms/Input, Product Card, Typography and Commerce Surface Composer choices are declared as renderer-backed <code>component_options</code>.</li><li>Merchant Admin can only select exact values advertised by the immutable package and supported by the renderer; arbitrary CSS/SVG/HTML/JavaScript or custom font URLs are not accepted.</li><li>Published versions are immutable. Install a new semantic version for later changes.</li></ol>{preview?<PackagePreview value={preview}/>:<div className="theme-validation-placeholder">Select <strong>Validate package</strong> to review metadata before installing.</div>}</section></div></Modal>}
function PackagePreview({value}){const options=value.manifest?.component_options||{},icons=value.manifest?.icons||{};return <div className="theme-package-review"><span>Package</span><strong>{value.name||'Unnamed'} · v{value.version||'—'}</strong><span>Key</span><strong>{value.key||'—'}</strong><span>Apps</span><strong>{(value.supported_apps||[]).map(appLabel).join(' · ')||'—'}</strong><span>Schema</span><strong>v{value.manifest?.schema_version||'—'}</strong><span>Mobile navigation</span><strong>{value.manifest?.navigation?.mobile||'—'}</strong><span>Icon pack</span><strong>{icons.pack||'—'} · {(icons.allowed||[]).length||0} approved</strong><span>Selectable groups</span><strong>{Object.keys(options).length||'None'}</strong></div>}
