import fs from'node:fs';
const read=p=>fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8');
const pkg=JSON.parse(read('package.json'));
const app=read('src/app/App.jsx');
const shell=read('src/components/AppShell.jsx');
const main=read('src/main.jsx');
const page=read('src/pages/ThemesPage.jsx');
const css=read('src/theme-library.css');
const checks=[
 ['platform release is 0.8.0',pkg.version==='0.8.0'],
 ['verify includes theme library regression',pkg.scripts.verify.includes('test:themes-v08')],
 ['theme route installed',app.includes("'/themes':ThemesPage")],
 ['navigation exposes Themes',shell.includes("'/themes','Themes'" )],
 ['theme library styles loaded',main.includes("'./theme-library.css'" )],
 ['page reads platform theme catalog',page.includes("api.request('/v1/platform/themes')")],
 ['manual JSON installer exists',page.includes('Upload JSON')&&page.includes('application/json,.json')&&page.includes('JSON.parse')],
 ['installer posts safe package endpoint',page.includes("'/v1/platform/themes/install'")&&page.includes("method:'POST'" )],
 ['draft publish lifecycle exists',page.includes("onAction(row,'publish')")&&page.includes("onAction(row,'delete')" )],
 ['published retirement exists',page.includes("onAction(row,'retire')" )],
 ['sample covers Customer Web design-system areas',page.includes('LUKE_COMMERCE_IOS')&&page.includes('typography:')&&page.includes('icons:')&&page.includes('buttons:')&&page.includes('navigation:')&&page.includes('components:')],
 ['sample targets professional iOS tab navigation',page.includes("mobile:'ios_tab'")&&page.includes("active_indicator:'filled_icon'" )],
 ['UI explains immutable published versions',(page.includes('exact version becomes immutable')||page.includes('Published versions are immutable'))&&page.includes('Install a new')],
 ['UI does not execute theme source',!/(?:eval\s*\(|new\s+Function\s*\()/i.test(page)],
 ['responsive theme library styles exist',css.includes('.theme-library-grid')&&css.includes('@media(max-width:650px)')],
];
let pass=0;for(const[n,ok]of checks){console.log(`${ok?'PASS':'FAIL'} ${n}`);if(ok)pass++;}console.log(`${pass}/${checks.length} Platform Admin Theme Library v1 A1 checks passed`);if(pass!==checks.length)process.exit(1);
