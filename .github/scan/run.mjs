// Only the trusted base branch runs this module. PR files are fixed-repository GitHub blobs read as inert data.
import { appendFileSync } from 'node:fs';
import { githubData } from './github-data.mjs';
import { scanLibrarySubmission } from './submission-scan.mjs';
import { MAX_FILE_BYTES } from './library-scan.mjs';
import { REFERENCE_FILES, isReferencePath } from './reference-scan.mjs';
const {GH_TOKEN,REPO,PR,GITHUB_STEP_SUMMARY}=process.env;
if(!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(REPO||'')||!/^\d{1,12}$/.test(PR||''))throw new Error('Invalid trusted repository/PR coordinates');

try{
 const github=githubData({repository:REPO,token:GH_TOKEN});
 const pr=await github.pull(PR);
 if(!/^[a-f0-9]{40}$/.test(pr.head?.sha||'')||!Number.isSafeInteger(pr.changed_files)||pr.changed_files<1||pr.changed_files>20)throw new Error('Submission exceeds file budget or lacks immutable head');
 const files=await github.files(PR);
 if(!Array.isArray(files)||files.length!==pr.changed_files)throw new Error('Incomplete PR file listing');
 const references=files.every(f=>isReferencePath(f.filename));
 const snapshot={};
 if(references){
  const tree=await github.tree(pr.head.sha);
  if(tree.truncated||!Array.isArray(tree.tree)||tree.tree.length>10000)throw new Error('Reference tree cannot be bounded');
  for(const name of REFERENCE_FILES){
   const item=tree.tree.find(x=>x.path===name);
   if(!item||item.type!=='blob'||item.mode!=='100644'||item.size>MAX_FILE_BYTES)throw new Error('Required reference is missing, executable, oversized or a link');
   snapshot[name]=await github.blob(item.sha);
  }
  for(const f of files){const item=tree.tree.find(x=>x.path===f.filename);if(item.sha!==f.sha)throw new Error('PR changed while obtaining immutable reference snapshot');f.mode=item.mode;f.content=snapshot[f.filename];}
 }else{
  // The unchanged bench validator rejects all other paths before content is needed.
  for(const f of files)if(f.status==='added'&&/^bench\//.test(f.filename))f.content=await github.blob(f.sha);
 }
 const {ok,problems,lane}=scanLibrarySubmission(files,snapshot);
 const report=ok?`### Scan passed\n\n${files.length} ${lane} file(s) passed bounded data checks. Owner review is still required; nothing installs or merges automatically.\n`:`### Scan failed\n\n${problems.map(p=>`- ${p}`).join('\n')}\n\nSee CONTRIBUTING.md. Scanner/workflow policy changes cannot authorize themselves.\n`;
 console.log(report);if(GITHUB_STEP_SUMMARY)appendFileSync(GITHUB_STEP_SUMMARY,report);process.exitCode=ok?0:1;
}catch(error){console.error(`Scan failed closed: ${error.message}`);process.exitCode=1;}
