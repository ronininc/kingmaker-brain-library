# Source review register

Source references are separate from model weights. Six bounded reviews remain QUARANTINED; five exact identities are BLOCKED. No model picks/catalog/weights changed.

Upstream text remains outside this checkout in ../brain-library-review/quarantine. All 32 upstream files match pinned Git blob hashes. Catalog records exact per-file scope and SHA-256. REVIEWED does not authorize execution.

Armor: 33 staged files (17 code,16 data), one owner gate and three notes. One file is the library README, so 32 are upstream sources. setup.sh shell eval is the owner gate. No upstream code was executed. Markdown/license/requirements are data to the scanner; selected passages were manually examined.

Limit: no whole-repository or dependency audit, no runtime test, no weights/native binaries, no publication. Static scan cannot prove safety.

## harry0703/MoneyPrinterTurbo — QUARANTINED

Pin: `c8dbf96e9dfee43b30f7c3f440175d6bd4de61de`.

Code: MIT. Models: Provider/model-specific; not covered by repository MIT license.

README recommends 8 GB RAM and GPU optional. CPU video assembly plausible on Mac 8 GB; not tested. Optional Whisper and remote providers add memory/network/cost requirements.

- HIGH config.example.toml:10-12,43-52 and app/asgi.py:28-35,288-303: API example binds 0.0.0.0 and key is empty. /tasks artifacts follow optional key auth. Loopback and auth needed before exposure.
- MEDIUM app/services/llm.py:575-633: Claude CLI subprocess uses argv, tool disabling, temporary cwd and timeout in inspected path. Other providers/OAuth helpers remain unreviewed. config.example.toml documents credential storage/auth and possible prompt logging.
- MEDIUM requirements.txt delegates primary deps to pyproject.toml/uv.lock (not retrieved). README-en.md:545-589 documents automatic Whisper/FFmpeg downloads. Installers, media services, path controls and stock music rights remain unreviewed.

Inspected files (selected passages and lexical scan): `LICENSE`, `README-en.md`, `app/asgi.py`, `app/services/llm.py`, `config.example.toml`, `docker-compose.yml`, `main.py`, `requirements.txt`.

Remaining: All files outside listed scope, transitive dependencies, installers, native binaries, model cards/checkpoints, runtime acceptance.

## 3DTopia/threefiner — QUARANTINED

Pin: `6c34f089e61a5b53718ff8a38be2fc74687444f2`.

Code: Apache-2.0 in LICENSE; setup.py incorrectly declares MIT. Models: Stable Diffusion and DeepFloyd terms separate; README requires DeepFloyd acceptance. Model cards not fetched..

README requires CUDA extensions tiny-cuda-nn and nvdiffrast. CPU fallback in UI does not establish working CPU/MPS path. Mac 8 GB unverified/unsupported by documented dependency path.

- HIGH gradio_app.py:87: explicit all-interface bind and public share=True, no auth argument. Do not launch unchanged.
- MEDIUM gradio_app.py:13-14,45-67: shared fixed output filenames and global mutable config/model. Mesh parser, concurrency isolation, quota and output cleanup need review.
- MEDIUM LICENSE vs setup.py:14,59 conflict. README uses unpinned Git dependency installs and gated models; retain actual Apache text and do not relicense based on metadata.

Inspected files (selected passages and lexical scan): `LICENSE`, `gradio_app.py`, `readme.md`, `setup.py`.

Remaining: All files outside listed scope, transitive dependencies, installers, native binaries, model cards/checkpoints, runtime acceptance.

## Microsoft/TRELLIS — QUARANTINED

Pin: `193e0502b5cb3eb5997ec457d5340e95d09b158e`.

Code: MIT majority; README identifies separately licensed diffoctreerast and modified Flexicubes. Models: README states TRELLIS models MIT; individual model cards, submodules and third-party weights not reviewed..

README: Linux tested; NVIDIA >=16 GB VRAM and CUDA compilation required. Mac 8 GB cannot satisfy upstream documented route.

- HIGH setup.sh:2-4: shell eval of getopt output, Scripture Armor src-shell-eval owner gate. Review finding does not establish maliciousness; installer was not run.
- MEDIUM setup.sh:110-259: downloads/clones/builds multiple dependencies, many without immutable commit/hash pins. Native binaries and dependency code unreviewed.
- MEDIUM app.py:401-403 fetches named model and moves to CUDA; default Gradio launch has no explicit auth. Bind defaults depend on installed Gradio/config. Model loader internals not reviewed.

Inspected files (selected passages and lexical scan): `LICENSE`, `README.md`, `app.py`, `setup.sh`.

Remaining: All files outside listed scope, transitive dependencies, installers, native binaries, model cards/checkpoints, runtime acceptance.

## Tencent/Hunyuan3D-2 — QUARANTINED

Pin: `f8db63096c8282cb27354314d896feba5ba6ff8a`.

Code: Tencent Hunyuan 3D 2.0 Community License in LICENSE; source headers still say non-commercial. Models: Custom Community License covers model/code works; territory/use/distribution restrictions. Individual model cards not fetched..

README: 6 GB VRAM shape, 16 GB shape+texture. CUDA default and native rasterizers; 8 GB Mac unified memory is not equivalent. No Mac runtime verified.

- HIGH api_server.py:232-243,246-251,275-283,302: all-interface default, wildcard CORS with credentials, no auth visible in reviewed handlers. /send starts a thread per request; configured semaphore is not acquired in inspected handlers. Need auth and bounded work queue.
- MEDIUM api_server.py:142-143,189-225,287-296: processes caller base64 image/mesh, output format and generation parameters. Validate schema, size/format, job IDs and canonical paths; no live probes/reproductions attempted.
- HIGH LICENSE:1-4,17-29 excludes EU/UK/South Korea and imposes use/distribution conditions. api_server.py/setup.py headers use different license name. Owner/legal reconciliation before redistribution; not MIT.

Inspected files (selected passages and lexical scan): `LICENSE`, `README.md`, `api_server.py`, `requirements.txt`, `setup.py`.

Remaining: All files outside listed scope, transitive dependencies, installers, native binaries, model cards/checkpoints, runtime acceptance.

## VAST-AI-Research/TripoSR — QUARANTINED

Pin: `107cefdc244c39106fa830359024f6a2f1c78871`.

Code: MIT. Models: README explicitly states code and pretrained models MIT; individual Hugging Face files not fetched..

README default ~6 GB VRAM. run.py/Gradio have CPU fallback, a candidate for separate benchmarking, not 8 GB Mac approval; MPS not established.

- MEDIUM tsr/system.py:52-94: downloads config/checkpoint from Hugging Face without revision in inspected loader, calls torch.load and config-selected classes. Pin/verify config/weights and review class importer before execution.
- MEDIUM gradio_app.py:174-185 auth optional; --listen exposes interfaces and --share enables tunnel, both opt-in. Keep adapters local.
- MEDIUM requirements.txt:4 unpinned Git torchmcubes native dependency. gradio_app.py:62-73 creates delete=False mesh tempfiles. Build chain and cleanup/quotas remain review gates.

Inspected files (selected passages and lexical scan): `LICENSE`, `README.md`, `gradio_app.py`, `requirements.txt`, `run.py`, `tsr/system.py`.

Remaining: All files outside listed scope, transitive dependencies, installers, native binaries, model cards/checkpoints, runtime acceptance.

## lllyasviel/ControlNet — QUARANTINED

Pin: `ed85cd1e25a5ed592f7d8178495b4483de0331bf`.

Code: Apache-2.0 root; annotators have separate licenses not covered in this pass. Models: Unverified; base Stable Diffusion, ControlNet and annotator checkpoints require individual terms..

README 8 GB low-VRAM note refers to GPUs. environment.yaml is CUDA11.3/PyTorch1.12.1. No equivalent Mac8GB/MPS claim established.

- HIGH gradio_canny2image.py final line: explicit 0.0.0.0 bind, no auth argument. Adapt before hosting.
- MEDIUM cldm/model.py:12-26 uses torch.load for non-safetensors and YAML-instantiated model class. Checkpoint/config provenance is an execution boundary.
- MEDIUM environment.yaml old Python/PyTorch/Gradio pins plus some loose dependencies. No current advisory or transitive dependency audit; old pins do not prove safety.

Inspected files (selected passages and lexical scan): `LICENSE`, `README.md`, `cldm/model.py`, `environment.yaml`, `gradio_canny2image.py`.

Remaining: All files outside listed scope, transitive dependencies, installers, native binaries, model cards/checkpoints, runtime acceptance.

## va3id/FaithC — BLOCKED

Pin: `None`.

Code: unknown. Models: unknown.

unknown

- Exact primary GitHub API https://api.github.com/repos/va3id/FaithC returned 404; absent/renamed/private/inaccessible cannot be distinguished. Need corrected owner URL/access; no substitute guessed.

Inspected files (selected passages and lexical scan): none; identity lookup only.

Remaining: Resolve exact identity, pin, license and source review.

## jasonyzg/MeshAnything — BLOCKED

Pin: `None`.

Code: unknown. Models: unknown.

unknown

- Exact primary GitHub API https://api.github.com/repos/jasonyzg/MeshAnything returned 404; absent/renamed/private/inaccessible cannot be distinguished. Need corrected owner URL/access; no substitute guessed.

Inspected files (selected passages and lexical scan): none; identity lookup only.

Remaining: Resolve exact identity, pin, license and source review.

## SgX6/UltraTex — BLOCKED

Pin: `None`.

Code: unknown. Models: unknown.

unknown

- Exact primary GitHub API https://api.github.com/repos/SgX6/UltraTex returned 404; absent/renamed/private/inaccessible cannot be distinguished. Need corrected owner URL/access; no substitute guessed.

Inspected files (selected passages and lexical scan): none; identity lookup only.

Remaining: Resolve exact identity, pin, license and source review.

## fepegar/blender-server — BLOCKED

Pin: `None`.

Code: unknown. Models: unknown.

unknown

- Exact primary GitHub API https://api.github.com/repos/fepegar/blender-server returned 404; absent/renamed/private/inaccessible cannot be distinguished. Need corrected owner URL/access; no substitute guessed.

Inspected files (selected passages and lexical scan): none; identity lookup only.

Remaining: Resolve exact identity, pin, license and source review.

## AllasKA/Blender-GPT — BLOCKED

Pin: `None`.

Code: unknown. Models: unknown.

unknown

- Exact primary GitHub API https://api.github.com/repos/AllasKA/Blender-GPT returned 404; absent/renamed/private/inaccessible cannot be distinguished. Need corrected owner URL/access; no substitute guessed.

Inspected files (selected passages and lexical scan): none; identity lookup only.

Remaining: Resolve exact identity, pin, license and source review.
