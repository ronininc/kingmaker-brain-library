# Source references

This is a separate catalog for code and workflow references. It is not the model-weight `library.json` or `weights.json` catalog, and contains no upstream executables or model weights.

- [Original repository reviews](REVIEW.md): six pinned bounded reviews, all quarantined, and five unresolved exact identities.
- [Catalog](catalog.json): identity, commit, per-file source links/hashes, license separation, hardware limits and findings.
- [Pasted pipeline review](PIPELINE-REVIEW.md) and [candidate metadata](pipeline-candidates.json): five additional pinned upstream references, two missing identities and the inert aggregator.
- [Staged Kingmaker skill](../skills/kingmaker-source-review/SKILL.md): original guidance and Codex/Muse/Claude/Grok/Kingmaker adaptations. No global installation or native connector activation occurred.

`review_status: REVIEWED` means the listed limited inspection happened. `status: QUARANTINED` means source is not approved to execute. `BLOCKED` means identity/access is unresolved. Every current entry has `install_allowed: false`. Model licenses do not inherit automatically from a repository's code license.

Upstream source excerpts and full fetched files are retained outside this checkout under `../brain-library-review/quarantine`; they are not added to the library. Portable upstream Armor findings are stored in reviews with severities, locations and fingerprints preserved. Raw source excerpts stay in the local quarantine; their hashes bind the projected evidence. The library's newly authored metadata/skill files receive a separate outgoing scan. No model catalog, model pick or weight artifact is modified. The separate validator policy is a maintainer proposal and does not activate source tools.

Source references have a separate bounded data lane proposed in `.github/scan/reference-scan.mjs`; the bench validator remains unchanged. The trusted base must adopt that owner-reviewed policy before reference-only submissions can pass. A policy change cannot approve itself. Every catalog entry remains blocked or quarantined and cannot authorize installation, model downloads or upstream execution.
