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
