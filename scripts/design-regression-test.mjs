import fs from 'node:fs';
const files=['src/styles.css','src/components/AppShell.jsx','src/pages/LoginPage.jsx','src/pages/AuditPage.jsx','src/pages/TemplatesPage.jsx'];
let all='';for(const f of files){if(fs.existsSync(f))all+=fs.readFileSync(f,'utf8')+'\n'}
let passed=0;const check=(v,m)=>{if(!all.includes(v))throw new Error(`Missing ${m}`);console.log(`PASS ${m}`);passed++};
check('professional-shell','professional platform shell');
check('platform-scope','platform scope card');
check('platform-login','professional platform login');
check('audit-toolbar','audit operations toolbar');
check('audit-detail','audit expandable detail');
check('owner-card','owner identity polish');
check('template-grid','professional template catalog');
check('friendly-object','readable technical detail cards');
check('Template & Font Studio','Template & Font Studio');
check('template-visual-v3','visual storefront template preview');
check('font-grid-v3','font catalog studio');
console.log(`${passed}/${passed} Platform Admin v0.3.1 design checks passed`);
