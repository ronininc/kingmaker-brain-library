# Submitting to the Kingmaker Brain Library

Only the owner commits to this library. Anyone can **submit a bench result** from their own Mac, as a pull request:

```
kingmaker models bench                          # measures this Mac (about 1–5 minutes a model)
kingmaker models library submit <bench file> --yes
```

`submit` scans the result on your Mac first, removes contact details the models made up during the tool test, and opens
the pull request. Then:

1. **The scan** runs on every pull request (`.github/workflows/scan.yml`). A submission may only add new files in
   `bench/`, each one a result `kingmaker models bench` writes: every field known, numbers in range, no links, keys,
   tokens, hidden characters or real contact details. Anything else fails it, with the reason on the pull request.
2. **The owner reviews** what passed and merges it by hand. Nothing is merged automatically.
3. **Picks** (the models each Mac class installs) change only through the owner's monthly rotation commit. A
   submission adds evidence; it never changes a pick by itself.

Model weights, the catalog (`library.json`), the README and the scan itself are not open to submissions.

## Separate source-reference lane

A source-reference pull request may only add or update the twelve authored paths listed in
`.github/scan/reference-scan.mjs`: the `source-references/` catalogs, schema, review documentation and inert scan
evidence, plus `skills/kingmaker-source-review/SKILL.md` and its two Markdown reference guides. It must not mix with
bench results or change model/weight catalogs, executable files, the scanner, workflows or this policy document.

The trusted base-branch validator reads the complete bounded snapshot as data. It checks regular-file modes,
immutable repository/file pins, hashes, path and URL boundaries, separate code/model license classifications,
quarantine/blocking states, and fixed skill frontmatter. Missing identity stays blocked. Every entry keeps
installation, runtime-tested and weights-downloaded flags false. A passing structural check is not evidence that
an upstream repository is safe, that a license permits a use, or that anything is installed. The owner reviews
provenance and intended meaning before merging. No upstream code or submitted script is executed by this lane.

Scanner/workflow/policy updates are maintainer changes requiring separate owner review. They cannot approve
themselves: `pull_request_target` deliberately executes the existing trusted base, never code from a PR. The
initial reference-lane policy proposal therefore cannot pass the old bench-only rule by changing its own branch.
The owner must first adopt the reviewed policy on the trusted base through the repository's normal maintainer
process. Keep the reference submission on hold until the actual required checks pass; do not disable checks,
change statuses by hand or bypass review requirements.
