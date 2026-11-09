// The outbound boundary: fixed GitHub origin/repository, bounded metadata and verified immutable text blobs.
// It has no filesystem or environment access, and exposes no arbitrary-URL fetch operation.
import {createHash} from 'node:crypto';
import {MAX_FILE_BYTES} from './library-scan.mjs';
export function githubData({repository,token}){
 if(!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository||'')||typeof token!=='string'||!token)throw new Error('Trusted repository and job token required');
async function api(path,maxBytes=4*1024*1024){
 const r=await fetch(`https://api.github.com/repos/${repository}/${path}`,{headers:{authorization:`Bearer ${token}`,accept:'application/vnd.github+json','x-github-api-version':'2022-11-28','user-agent':'kingmaker-brain-library-scan'},redirect:'error'});
 if(!r.ok)throw new Error(`GitHub metadata unavailable (${r.status})`);
 const reader=r.body.getReader();let total=0;const chunks=[];
 for(;;){const {done,value}=await reader.read();if(done)break;total+=value.byteLength;if(total>maxBytes){await reader.cancel();throw new Error('GitHub metadata byte budget exceeded');}chunks.push(Buffer.from(value));}
 return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
async function blob(sha){
 if(!/^[a-f0-9]{40}$/.test(sha||''))throw new Error('Missing immutable blob identity');
 const b=await api(`git/blobs/${sha}`,MAX_FILE_BYTES*2);
 if(b.encoding!=='base64'||!Number.isSafeInteger(b.size)||b.size>MAX_FILE_BYTES||typeof b.content!=='string')throw new Error('Unbounded or non-text blob');
 const bytes=Buffer.from(b.content.replace(/\s/g,''),'base64');
 const actual=createHash('sha1').update(Buffer.concat([Buffer.from(`blob ${bytes.length}\0`),bytes])).digest('hex');
 if(b.sha!==sha||actual!==sha)throw new Error('Git blob integrity mismatch');
 if(bytes.length!==b.size||bytes.includes(0))throw new Error('Invalid UTF-8 reference blob');
 const value=bytes.toString('utf8');if(!Buffer.from(value).equals(bytes))throw new Error('Invalid UTF-8 reference blob');return value;
}
 const id=value=>{if(!/^\d{1,12}$/.test(String(value)))throw new Error('Invalid PR number');return String(value);};
 const commit=value=>{if(!/^[a-f0-9]{40}$/.test(value||''))throw new Error('Invalid immutable head');return value;};
 return {
  pull:number=>api(`pulls/${id(number)}`),
  files:number=>api(`pulls/${id(number)}/files?per_page=100`),
  tree:sha=>api(`git/trees/${commit(sha)}?recursive=1`),
  blob,
 };
}
