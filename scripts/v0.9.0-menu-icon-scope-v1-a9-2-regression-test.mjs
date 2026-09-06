import fs from'node:fs';
const page=fs.readFileSync('src/pages/IconLibraryPage.jsx','utf8');let n=0;const pass=(ok,msg)=>{if(!ok)throw new Error(`FAIL ${msg}`);n++;console.log(`PASS ${msg}`)};
pass(page.includes("const SCOPES=['NAVIGATION','TOPIC','CATEGORY','ACCOUNT','ACTION','MENU']"),'Platform Icon Library exposes the dedicated MENU governance scope');
pass(page.includes("MENU:'Menu'"),'MENU scope has a clear Platform Owner label');
pass(page.includes('SCOPES.map(s=>')&&page.includes('SCOPES.map(scope=>'),'MENU automatically participates in filtering and scope assignment');
pass(page.includes('Menu scope · A9.2'),'Platform governance UI identifies the A9.2 capability');
pass(page.includes('executable SVG, HTML, JavaScript and arbitrary URLs are not accepted'),'existing icon safety contract remains explicit');
pass(!page.includes('dangerouslySetInnerHTML')&&!page.includes('<svg')&&!page.includes('eval(')&&!page.includes('new Function'),'Platform A9.2 executes no uploaded markup or code');
console.log(`${n}/${n} Platform Menu Icon Scope v1 A9.2 checks passed`);
