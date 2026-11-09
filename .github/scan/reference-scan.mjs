// Trusted, dependency-free data validation. Never import or execute submitted files.
import { posix } from 'node:path';
export const REFERENCE_FILES = [
 'source-references/catalog.json','source-references/pipeline-candidates.json','source-references/catalog.schema.json',
 'source-references/README.md','source-references/REVIEW.md','source-references/PIPELINE-REVIEW.md','source-references/VALIDATION.md',
 'source-references/reviews/armor-scan.json','source-references/reviews/armor-expanded-scan.json',
 'skills/kingmaker-source-review/SKILL.md','skills/kingmaker-source-review/references/assistant-adapters.md','skills/kingmaker-source-review/references/pipeline-adaptation.md',
];
export const MAX_REFERENCE_BYTES=512*1024, MAX_REFERENCE_TOTAL=2*1024*1024;
const UNRESOLVED_IDS=new Set(['va3id--faithc','jasonyzg--meshanything','sgx6--ultratex','fepegar--blender-server','allaska--blender-gpt','agent-reach','flux-local']);
const SHA1=/^[a-f0-9]{40}$/,SHA256=/^[a-f0-9]{64}$/,REPO=/^[A-Za-z0-9][A-Za-z0-9_.-]{0,99}\/[A-Za-z0-9][A-Za-z0-9_.-]{0,99}$/;
const text=(v,n=8000)=>typeof v==='string'&&v.trim().length>0&&v.length<=n;
const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const safePath=p=>typeof p==='string'&&p.length<=240&&!p.includes('\\')&&!p.includes('%')&&!p.startsWith('/')&&p.split('/').every(x=>x&&x!=='.'&&x!=='..'&&/^[A-Za-z0-9_.-]+$/.test(x));
export const isReferencePath=p=>typeof p==='string'&&safePath(p)&&REFERENCE_FILES.includes(p);
const keys=(v,allowed)=>object(v)&&Object.keys(v).every(k=>allowed.includes(k));
const exactUrl=(value,host,path)=>{
 try{const u=new URL(value);return u.protocol==='https:'&&u.hostname===host&&!u.username&&!u.password&&!u.port&&!u.search&&!u.hash&&u.pathname===path&&value===`https://${host}${path}`;}catch{return false;}
};
function bounds(v,maxString=16000){
 let count=0;const visit=(x,d)=>{
  if(++count>50000||d>20)throw new Error('data nesting or field budget exceeded');
  if(typeof x==='string'&&(x.length>maxString||/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u202a-\u202e\u2066-\u2069]/.test(x)||/-----BEGIN [A-Z ]*PRIVATE KEY-----|\b(?:github_pat_|gh[pousr]_|sk-live-)[A-Za-z0-9_-]{16,}/.test(x)||/\/Users\/|\/home\/[^ /]+\//.test(x)))throw new Error('oversized, hidden, private or secret-like text');
  if(Array.isArray(x)){if(x.length>500)throw new Error('array budget exceeded');for(const a of x)visit(a,d+1);}
  else if(object(x))for(const [k,a]of Object.entries(x)){if(['__proto__','constructor','prototype'].includes(k))throw new Error('unsafe object key');visit(a,d+1);}
 };visit(v,0);
}
function catalogProblems(c,pipeline){
 const out=[],fail=s=>out.push(s);
 const rootKeys=pipeline?['format','reviewed_at_utc','scope','entries']:['format','reviewed_at_utc','library_base_commit','artifact_kind','weights_catalog','limitations','armor_summary','entries'];
 if(!keys(c,rootKeys)||c.format!==(pipeline?'kingmaker-pipeline-candidates/1':'kingmaker-source-references/1')||!/^\d{4}-\d{2}-\d{2}$/.test(c.reviewed_at_utc||'')||!Array.isArray(c.entries)||!c.entries.length||c.entries.length>100)return ['invalid bounded source catalog'];
 if(!pipeline&&(c.artifact_kind!=='source-reference-catalog'||c.weights_catalog!==false||!SHA1.test(c.library_base_commit)||!Array.isArray(c.limitations)||!c.limitations.every(v=>text(v))))fail('catalog must remain separate from model weights');
 if(pipeline&&!text(c.scope))fail('pipeline scope is required');
 const ids=new Set();
 for(const e of c.entries){
  if(!object(e)){fail('entry must be an object');continue;}
  const label=typeof e.id==='string'?e.id:'entry';
  const allowed=['id','source_kind','license_classification','commit','status','review_status','install_allowed','runtime_tested','weights_downloaded','code_license','model_license','hardware','findings','reviewed_files',...(pipeline?['repository','pypi']:['requested_repository','canonical_repository','github_id','remaining','tree_blob_count','tree_truncated'])];
  if(!keys(e,allowed)||!/^[-a-z0-9]{1,100}$/.test(e.id||'')||ids.has(e.id))fail(`${label}: unknown fields or duplicate/invalid id`);ids.add(e.id);
  if(!['QUARANTINED','BLOCKED'].includes(e.status)||!['REVIEWED','BLOCKED'].includes(e.review_status)||e.install_allowed!==false||e.runtime_tested!==false||e.weights_downloaded!==false)fail(`${label}: references never authorize installation, execution or weight retrieval`);
  if(!text(e.code_license)||!text(e.model_license)||!text(e.hardware)||!keys(e.license_classification,['code','model'])||!['identified','unknown'].includes(e.license_classification?.code)||!['separate-terms-unreviewed','unknown'].includes(e.license_classification?.model))fail(`${label}: separate code/model license classification required`);
  if(e.license_classification?.code==='identified'&&/^(unknown|not supplied)/i.test(e.code_license||''))fail(`${label}: unknown code license cannot be identified`);
  if(!Array.isArray(e.findings)||!e.findings.length||!e.findings.every(v=>text(v))||!Array.isArray(e.reviewed_files)||e.reviewed_files.length>200){fail(`${label}: bounded coverage and findings required`);continue;}
  const repo=pipeline?e.repository:e.canonical_repository;
  if(!pipeline&&!REPO.test(e.requested_repository||''))fail(`${label}: exact requested repository required`);
  if(UNRESOLVED_IDS.has(e.id)&&e.source_kind!=='unresolved')fail(`${label}: unresolved requested identity requires separate owner identity review`);
  if(e.source_kind==='unresolved'){
   if(e.status!=='BLOCKED'||e.review_status!=='BLOCKED'||repo!==null||e.commit!==null||e.reviewed_files.length||e.license_classification?.code!=='unknown'||e.license_classification?.model!=='unknown')fail(`${label}: unresolved identity must remain blocked and unpinned`);
  }else if(e.source_kind==='github'){
   if(!REPO.test(repo||'')||!SHA1.test(e.commit||'')||e.status!=='QUARANTINED'||e.review_status!=='REVIEWED'||!e.reviewed_files.length)fail(`${label}: reviewed GitHub source requires exact identity, immutable pin and coverage`);
  }else if(e.source_kind==='user-paste'){
   if(!pipeline||e.id!=='fully-mapped-aggregator-pasted'||repo!==null||e.commit!==null||e.status!=='QUARANTINED'||e.reviewed_files.length!==1||e.license_classification?.code!=='unknown')fail(`${label}: pasted source cannot invent upstream provenance or rights`);
  }else fail(`${label}: source kind classification required`);
  for(const f of e.reviewed_files){
   if(!keys(f,['path','sha256','git_blob_sha1','bytes','url','review_mode'])||!safePath(f.path)||!SHA256.test(f.sha256||'')||!Number.isSafeInteger(f.bytes)||f.bytes<1||f.bytes>2*1024*1024||!text(f.review_mode)||(f.git_blob_sha1!==undefined&&!SHA1.test(f.git_blob_sha1)))fail(`${label}: invalid reviewed-file path/hash/coverage`);
   if(e.source_kind==='github'&&(!exactUrl(f.url,'github.com',`/${repo}/blob/${e.commit}/${f.path}`)||(!pipeline&&!SHA1.test(f.git_blob_sha1||''))))fail(`${label}: source URL must bind exact repository, commit and file`);
   if(e.source_kind==='user-paste'&&(f.url!==undefined||f.git_blob_sha1!==undefined))fail(`${label}: pasted evidence cannot claim a remote source`);
  }
  if(e.pypi!==undefined){
   const p=e.pypi;
   if(!keys(p,['name','version_at_review','url','metadata_url','license_metadata','project_urls','release_artifact_hashes','artifact_downloaded','release_source_equivalence'])||!/^[-a-zA-Z0-9_.]{1,100}$/.test(p.name||'')||!text(p.version_at_review,40)||p.artifact_downloaded!==false||!text(p.release_source_equivalence)||!exactUrl(p.url,'pypi.org',`/project/${p.name}/`)||!exactUrl(p.metadata_url,'pypi.org',`/pypi/${p.name}/json`)||!object(p.project_urls)||!Object.values(p.project_urls).every(u=>typeof u==='string'&&(u===`https://github.com/${repo}`||u===`https://github.com/${repo}/issues`))||!Array.isArray(p.release_artifact_hashes)||!p.release_artifact_hashes.length||p.release_artifact_hashes.some(h=>!keys(h,['filename','sha256'])||!safePath(h.filename)||h.filename.includes('/')||!SHA256.test(h.sha256||'')))fail(`${label}: invalid non-downloaded PyPI metadata provenance`);
  }
 }
 return out;
}
function markdownProblems(name,body){
 const out=[];
 if(/<\s*\/?\s*(?:script|iframe|object|embed|form)\b|\bon(?:click|load|error)\s*=|!\[/.test(body))out.push('active HTML or embedded media is not reference prose');
 if(name.endsWith('/SKILL.md')){
  const match=/^---\nname: kingmaker-source-review\ndescription: ([^\n]{20,600})\n---\n/.exec(body);
  if(!match)out.push('skill frontmatter must contain only the fixed name and plain description');
 }
 for(const m of body.matchAll(/\b(?:https?|javascript|data|file):[^\s<>\])]+/g)){
  try{const u=new URL(m[0]);if(u.protocol!=='https:'||!['github.com','api.github.com','pypi.org','aegisub.org'].includes(u.hostname)||u.username||u.password||u.port)throw new Error();}catch{out.push('invalid URL in reference prose');}
 }
 for(const m of body.matchAll(/\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)){
  const target=m[1];
  if(/^https?:/.test(target)){
   try{const u=new URL(target);if(u.protocol!=='https:'||!['github.com','api.github.com','pypi.org','aegisub.org'].includes(u.hostname)||u.username||u.password||u.port)throw new Error();}catch{out.push('invalid external reference URL');}
  }else if(!isReferencePath(posix.normalize(posix.join(posix.dirname(name),target))))out.push('relative link escapes the bounded reference lane');
 }
 return out;
}
/** The full twelve-file snapshot is required even for a partial update, fetched as inert data by trusted CI. */
export function scanReferenceSubmission(files,snapshot={}){
 const problems=[];
 if(!Array.isArray(files)||!files.length||files.length>20)return {ok:false,problems:['reference change must contain 1–20 files']};
 for(const f of files){if(!isReferencePath(f.filename)||!['added','modified'].includes(f.status)||f.mode!=='100644'||typeof f.content!=='string'||f.content!==snapshot[f.filename])problems.push(`${f.filename}: only bounded authored reference/skill additions or updates are allowed`);}
 let total=0;
 for(const name of REFERENCE_FILES){
  const body=snapshot[name];
  if(typeof body!=='string'||Buffer.byteLength(body)>MAX_REFERENCE_BYTES){problems.push(`${name}: missing or oversized snapshot content`);continue;}
  total+=Buffer.byteLength(body);
  try{
   bounds(body,MAX_REFERENCE_BYTES);
   if(name.endsWith('.md'))problems.push(...markdownProblems(name,body).map(p=>`${name}: ${p}`));
   else{
    const parsed=JSON.parse(body);bounds(parsed);
    if(name.endsWith('/catalog.json')||name.endsWith('/pipeline-candidates.json'))problems.push(...catalogProblems(parsed,name.endsWith('/pipeline-candidates.json')).map(p=>`${name}: ${p}`));
    else if(name.endsWith('/catalog.schema.json')){
     if(parsed.$schema!=='https://json-schema.org/draft/2020-12/schema'||parsed.type!=='object'||!Array.isArray(parsed.required)||/"\$ref"/.test(body))problems.push(`${name}: schema must remain inert and self-contained`);
    }else if(!object(parsed)||!object(parsed.summary)||!Array.isArray(parsed.results)||parsed.results.length>200)problems.push(`${name}: invalid bounded review evidence`);
   }
  }catch{problems.push(`${name}: malformed or unbounded reference data`);}
 }
 if(total>MAX_REFERENCE_TOTAL)problems.push('reference snapshot exceeds total byte budget');
 return {ok:problems.length===0,problems:problems.slice(0,100)};
}
