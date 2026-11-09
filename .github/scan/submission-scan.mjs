import { scanSubmission } from './library-scan.mjs';
import { isReferencePath, scanReferenceSubmission } from './reference-scan.mjs';
/** Disjoint lanes. Policy, executable code, model/weight catalog and mixed submissions remain denied. */
export function scanLibrarySubmission(files,snapshot={}){
 if(!Array.isArray(files)||!files.length)return scanSubmission(files);
 if(files.every(f=>isReferencePath(f.filename)))return {...scanReferenceSubmission(files,snapshot),lane:'source-references'};
 if(files.every(f=>typeof f.filename==='string'&&f.filename.startsWith('bench/')))return {...scanSubmission(files),lane:'bench'};
 return {ok:false,lane:'denied',problems:['Only a new bench-result submission OR the bounded authored reference/skill lane is permitted. Mixed lanes, model/weight catalogs, policy and executable files require separate owner review; a PR cannot approve its own scanner changes.']};
}
