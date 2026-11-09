# Added pasted-pipeline review

Eight entries: five pinned upstream references, two missing identities, and the inert pasted aggregator. No pipeline was run or scheduled. Code/model licenses are recorded independently; PyPI versions are metadata only, not verified equivalents of repository HEAD.

## softcatala--whisper-ctranslate2 — QUARANTINED

Commit: `78ae8efaca4b8de6fd41ef0f47b789fcdd0e2555`. Code license: MIT. Models: Whisper/model conversion terms separate; no weights retrieved.

CPU candidate for small quantized models on Mac8GB; unbenchmarked. CTranslate2 native dependency reviewed only by reference.

- CLI commandline.py:311-314 defaults word_timestamps false; whisper_ctranslate2.py:136-147 rejects max_words_per_line without True. Pasted command therefore falls short at this pinned source. Remote model downloads and native dependencies not audited.

Inspected: README.md, LICENSE, src/whisper_ctranslate2/whisper_ctranslate2.py, src/whisper_ctranslate2/commandline.py.

## cdown--srt — QUARANTINED

Commit: `ff96458d16e8e9f28315687fbed2bb23b013c6b0`. Code license: MIT. Models: Not a model.

Small Python formatting library; no runtime benchmark

- Third-party PyPI package, not stdlib. Pasted script does not import it, so installation is unnecessary for that script. Only README/license metadata reviewed; implementation/dependencies remain unreviewed.

Inspected: README.rst, LICENSE.

## rany2--edge-tts — QUARANTINED

Commit: `bd44c1d1aaebdc1db7f47456ee12431b42ec7cac`. Code license: LGPLv3 except srt_composer.py MIT. Models: Online service terms separate.

CPU client; internet required, not offline

- README explicitly describes Microsoft Edge online TTS. Narration leaves machine. No network call performed. Service authorization, availability, traffic and local cache behavior require review before use.

Inspected: README.md, LICENSE.

## openai--whisper — QUARANTINED

Commit: `86098128c0b4f24f0e2aa2994de830614b474227`. Code license: MIT. Models: README states code and model weights MIT.

README tiny/base ~1GB VRAM; these are candidates, not Mac8GB timing or RAM measurements. Larger models do not fit this budget reliably.

- Original Whisper is distinct from CTranslate2 wrapper. whisper/transcribe.py inspected selectively for CLI handling. Local inference still needs pre-obtained approved model files; no download/inference performed.

Inspected: README.md, LICENSE, whisper/transcribe.py.

## ffmpeg--ffmpeg — QUARANTINED

Commit: `39ccb3ca120c0815c62c7f145a1aa1354f335680`. Code license: LGPL2.1+ by default; optional components/build flags switch GPL/version3/nonfree conditions. Models: Not a model; codec/patent/font terms separate.

Still-image encode is CPU-capable in principle; actual local binary/build filters/codecs not inspected

- Only LICENSE.md reviewed. Pasted pipeline needs subtitles/libass, libx264, fonts, path/filter escaping, explicit vertical dimensions and output checks; no FFmpeg invocation or binary scan performed.

Inspected: LICENSE.md.

## agent-reach — BLOCKED

Commit: `None`. Code license: unknown. Models: unknown.

unknown

- No exact repository/package URL supplied or verified; no substitution guessed. Pasted module/CLI invocation is unproven.

Inspected: identity unresolved.

## flux-local — BLOCKED

Commit: `None`. Code license: unknown. Models: unknown.

unknown

- No exact repository/package URL supplied or verified; no substitution guessed. Pasted module/CLI invocation is unproven.

Inspected: identity unresolved.

## fully-mapped-aggregator-pasted — QUARANTINED

Commit: `None`. Code license: Not supplied; pasted text does not establish upstream redistribution rights. Models: Per provider/engine.

Not measured

- HIGH: shell=True string construction incorporates script/prompt/file paths. Replace with validated argv and shell=False in a separately authorized original adaptation.
- Simulated news never consumes raw_trends.json and is not Kingmaker synthesis; no authenticity evidence.
- Unverified agent_reach CLI and flux_local module; edge-tts is online; SRT package not stdlib and unused.
- whisper-ctranslate2 word layout flag missing word_timestamps True at reviewed source.
- ASS force_style alignment table confuses legacy SSA 6/10 with modern 8/5 for top/middle center.
- No vertical resize, libass/font validation, job isolation, timeouts, resource bounds or output validation. Renames/FFmpeg -y can replace artifacts; public cron instructions not authorized.

Inspected: fully_mapped_aggregator.py.

See ../skills/kingmaker-source-review/references/pipeline-adaptation.md for original safe-adaptation guidance. No upstream runner was promoted to an active skill.