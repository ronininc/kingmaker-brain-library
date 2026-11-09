import {test} from 'node:test';
import assert from 'node:assert/strict';
import {REFERENCE_FILES,scanReferenceSubmission} from './reference-scan.mjs';
import {scanLibrarySubmission} from './submission-scan.mjs';
import {scanSubmission} from './library-scan.mjs';
const PIN='a'.repeat(40),HASH='b'.repeat(64);
function fixture(){
 const reviewed={path:'README.md',sha256:HASH,git_blob_sha1:'c'.repeat(40),bytes:42,url:`https://github.com/fixture/source/blob/${PIN}/README.md`,review_mode:'Selected source/license passages; never executed'};
 const entry={id:'fixture--source',requested_repository:'fixture/source',canonical_repository:'fixture/source',commit:PIN,status:'QUARANTINED',review_status:'REVIEWED',source_kind:'github',license_classification:{code:'identified',model:'separate-terms-unreviewed'},install_allowed:false,runtime_tested:false,weights_downloaded:false,code_license:'MIT',model_license:'Separate model terms remain unreviewed',hardware:'Not benchmarked',findings:['Static review only; dependencies unresolved'],reviewed_files:[reviewed]};
 const catalog={format:'kingmaker-source-references/1',reviewed_at_utc:'2026-11-04',library_base_commit:PIN,artifact_kind:'source-reference-catalog',weights_catalog:false,limitations:['No approval to execute'],entries:[entry]};
 const pipeline={format:'kingmaker-pipeline-candidates/1',reviewed_at_utc:'2026-11-04',scope:'Passive reference metadata only',entries:[{...entry,repository:'fixture/source'}]};delete pipeline.entries[0].requested_repository;delete pipeline.entries[0].canonical_repository;
 const snapshot=Object.fromEntries(REFERENCE_FILES.map(p=>[p,p.endsWith('.md')?'Reference guidance only.\n':JSON.stringify({summary:{},results:[]})]));
 snapshot['source-references/catalog.json']=JSON.stringify(catalog);snapshot['source-references/pipeline-candidates.json']=JSON.stringify(pipeline);
 snapshot['source-references/catalog.schema.json']=JSON.stringify({$schema:'https://json-schema.org/draft/2020-12/schema',type:'object',required:['entries']});
 snapshot['skills/kingmaker-source-review/SKILL.md']='---\nname: kingmaker-source-review\ndescription: Review source provenance without installing upstream tools.\n---\nRead the bounded source catalog.\n';
 return snapshot;
}
const files=s=>REFERENCE_FILES.map(filename=>({filename,status:'added',mode:'100644',content:s[filename]}));
const scan=s=>scanReferenceSubmission(files(s),s);
function mutate(fn,p='source-references/catalog.json'){const s=fixture(),c=JSON.parse(s[p]);fn(c);s[p]=JSON.stringify(c);return s;}
test('separate valid reference snapshot passes; no code or model lane is opened',()=>{assert.equal(scan(fixture()).ok,true);assert.equal(scanLibrarySubmission(files(fixture()),fixture()).lane,'source-references');});
for(const [name,url]of [['credentials',`https://github.com@evil.invalid/fixture/source/blob/${PIN}/README.md`],['HTTP',`http://github.com/fixture/source/blob/${PIN}/README.md`],['wrong repository',`https://github.com/attacker/source/blob/${PIN}/README.md`],['mutable ref','https://github.com/fixture/source/blob/main/README.md'],['encoded traversal',`https://github.com/fixture/source/blob/${PIN}/%2e%2e/README.md`]])test(`source URL rejects ${name}`,()=>assert.equal(scan(mutate(c=>{c.entries[0].reviewed_files[0].url=url;})).ok,false));
test('mutable pin, path traversal and mismatched content hash formats fail',()=>{
 for(const change of [e=>{e.commit='main';},e=>{e.reviewed_files[0].path='../secret';},e=>{e.reviewed_files[0].sha256='unknown';}])assert.equal(scan(mutate(c=>change(c.entries[0]))).ok,false);
});
test('an install flag or runtime/weight claim never becomes approval',()=>{
 for(const k of ['install_allowed','runtime_tested','weights_downloaded'])assert.equal(scan(mutate(c=>{c.entries[0][k]=true;})).ok,false);
 assert.equal(scan(mutate(c=>{c.weights_catalog=true;})).ok,false);
});
test('code and model license classification cannot be missing or conflated',()=>{
 for(const change of [e=>{delete e.license_classification;},e=>{delete e.model_license;},e=>{e.code_license='unknown';},e=>{e.license_classification.model='same-as-code';}])assert.equal(scan(mutate(c=>change(c.entries[0]))).ok,false);
});
test('unresolved requested identities stay blocked even if a submitter invents a plausible repo and pin',()=>{
 assert.equal(scan(mutate(c=>{c.entries[0].id='va3id--faithc';})).ok,false);
 const s=mutate(c=>{c.entries[0]={...c.entries[0],id:'va3id--faithc',canonical_repository:null,commit:null,status:'BLOCKED',review_status:'BLOCKED',source_kind:'unresolved',license_classification:{code:'unknown',model:'unknown'},code_license:'unknown',model_license:'unknown',reviewed_files:[]};});assert.equal(scan(s).ok,true);
});
test('pasted evidence needs no invented remote identity and remains unlicensed/quarantined',()=>{
 const s=mutate(c=>{c.entries[0]={...c.entries[0],id:'fully-mapped-aggregator-pasted',repository:null,commit:null,source_kind:'user-paste',license_classification:{code:'unknown',model:'separate-terms-unreviewed'},code_license:'Not supplied',reviewed_files:[{path:'input.py',sha256:HASH,bytes:42,review_mode:'Inert pasted source only'}]};},'source-references/pipeline-candidates.json');assert.equal(scan(s).ok,true);
 const c=JSON.parse(s['source-references/pipeline-candidates.json']);c.entries[0].reviewed_files[0].url='https://evil.invalid/source';s['source-references/pipeline-candidates.json']=JSON.stringify(c);assert.equal(scan(s).ok,false);
});
test('frontmatter cannot add an execution hook, and Markdown links stay inside the lane or known primary domains',()=>{
 for(const bad of ['---\nname: kingmaker-source-review\ndescription: Valid long description for a fixture\ncommand: run-tool\n---\n','[escape](../../../../private/key)','[remote](javascript:alert)','<script>danger()</script>']){const s=fixture();s['skills/kingmaker-source-review/SKILL.md']=bad;assert.equal(scan(s).ok,false);}
});
test('snapshot must be complete, immutable regular files with bounded bytes',()=>{
 const s=fixture(),f=files(s);delete s[REFERENCE_FILES[0]];assert.equal(scanReferenceSubmission(f,s).ok,false);
 for(const change of [x=>{x.mode='120000';},x=>{x.mode='100755';},x=>{x.status='renamed';},x=>{x.filename='source-references/../library.json';},x=>{x.content='different head';}]){const valid=fixture(),list=files(valid);change(list[0]);assert.equal(scanReferenceSubmission(list,valid).ok,false);}
 const large=fixture();large['source-references/README.md']='x'.repeat(512*1024+1);assert.equal(scan(large).ok,false);
});
test('models, policy, upstream executables and mixed lanes remain denied',()=>{
 for(const filename of ['library.json','weights.json','.github/scan/run.mjs','source-references/run.mjs','skills/kingmaker-source-review/install.sh'])assert.equal(scanLibrarySubmission([{filename,status:'added',content:'{}'}],fixture()).ok,false);
 const s=fixture();assert.equal(scanLibrarySubmission([...files(s),{filename:'bench/apple-m3.json',status:'added',content:'{}'}],s).ok,false);
});
test('existing bench checks still pass authentic minimal data and reject links, keys, overwrites and unknown fields',()=>{
 const bench={schema:1,host:{chip:'Apple M3',ramGb:8},results:[]};
 const f={filename:'bench/apple-m3-8gb.json',status:'added',content:JSON.stringify(bench)};assert.equal(scanSubmission([f]).ok,true);assert.equal(scanLibrarySubmission([f]).ok,true);
 assert.equal(scanLibrarySubmission([{...f,status:'modified'}]).ok,false);
 for(const text of ['https://evil.invalid','ghp_'+'x'.repeat(30)])assert.equal(scanLibrarySubmission([{...f,content:JSON.stringify({...bench,results:[{model:'fixture',error:text}]})}]).ok,false);
 assert.equal(scanLibrarySubmission([{...f,content:JSON.stringify({...bench,installer:'run'})}]).ok,false);
});

test('trusted runner ignores raw URLs, verifies Git blobs, and refuses linked/executable metadata without executing submissions',async()=>{
 const {createHash}=await import('node:crypto');
 const saved={fetch:globalThis.fetch,env:process.env,exitCode:process.exitCode};
 const originalError=console.error,originalLog=console.log;
 try{
  console.error=()=>{};console.log=()=>{};
  for(const mode of ['valid','120000','100755','tampered-blob']){
   const snapshot=fixture(),blobs=new Map(),tree=REFERENCE_FILES.map(path=>{
    const bytes=Buffer.from(snapshot[path]),sha=createHash('sha1').update(Buffer.concat([Buffer.from(`blob ${bytes.length}\0`),bytes])).digest('hex');
    blobs.set(sha,{sha,size:bytes.length,encoding:'base64',content:bytes.toString('base64')});
    return {path,sha,size:bytes.length,type:'blob',mode:mode==='120000'||mode==='100755'?mode:'100644'};
   });
   process.env={REPO:'fixture/library',PR:'2',GH_TOKEN:'synthetic-test-token'};delete process.env.GITHUB_STEP_SUMMARY;process.exitCode=0;
   const urls=[];
   globalThis.fetch=async(url,options)=>{
    urls.push(url);assert.equal(options.redirect,'error');assert.ok(url.startsWith('https://api.github.com/repos/fixture/library/'));
    let value;
    if(url.endsWith('/pulls/2'))value={head:{sha:PIN},changed_files:1};
    else if(url.endsWith('/files?per_page=100'))value=[{filename:REFERENCE_FILES[0],status:'added',sha:tree[0].sha,raw_url:'https://attacker.invalid/never-fetch'}];
    else if(url.includes('/git/trees/'))value={truncated:false,tree};
    else if(url.includes('/git/blobs/')){value={...blobs.get(url.split('/').at(-1))};if(mode==='tampered-blob')value.content=Buffer.from('tampered').toString('base64');}
    else throw new Error('Unexpected outbound request');
    return new Response(JSON.stringify(value),{headers:{'content-type':'application/json'}});
   };
   await import(`./run.mjs?fixture=${mode}`);
   assert.equal(process.exitCode,mode==='valid'?0:1,mode);
   assert.ok(urls.every(u=>!u.includes('attacker.invalid')));
  }
 }finally{globalThis.fetch=saved.fetch;process.env=saved.env;process.exitCode=saved.exitCode;console.error=originalError;console.log=originalLog;}
});
