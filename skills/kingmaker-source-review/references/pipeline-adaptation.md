# Captioned local media workflow

The pasted fully_mapped_aggregator.py remains inert in the review quarantine. It is not a production-ready or fully local pipeline. Its simulated news is not retrieved evidence, its Agent-Reach command and flux_local module are unverified, and edge-tts sends text to Microsoft's online service. Do not run the pasted installer or create its proposed cron routine.

Use a staged contract when building an authorized original replacement:

1. Acquisition produces source records with URL, publication time and retrieval time. Agent-Reach remains BLOCKED until exact upstream identity and real CLI are supplied. A local JSON fixture is acceptable for a clearly labeled test; never turn fixture claims into news.
2. Synthesis produces script text and visual prompts with claim-to-source references. The pasted script bypasses raw_trends.json and Kingmaker entirely. Keep that step explicit and testable.
3. Generation accepts explicit approved provider names. Local speech needs a verified local engine; edge-tts is remote. flux_local has no verified identity or module contract. Use existing assets for an offline wiring test rather than auto-installing replacements.
4. Captioning uses a separately pinned transcription engine. whisper-ctranslate2 is a CTranslate2/faster-whisper frontend, not the OpenAI Whisper CLI. At the reviewed commit, max_words_per_line requires word_timestamps=True, which defaults false; the pasted command is rejected by that source path. SRT is a third-party package, not Python standard library, and the pasted script never imports it.
5. Rendering uses an explicitly selected FFmpeg binary and validated local assets. Build subprocess argument arrays with shell=False, fixed cwd, bounded timeouts, bounded diagnostics and explicit overwrite policy. Keep narration/prompts in input files or stdin. Shell quoting and FFmpeg filter escaping are separate parsers; argv alone does not validate subtitle filter paths. Use a fixed safe relative captions filename in an isolated per-job directory and validate allowed formats and generated assets.

For ASS subtitle alignment, modern numpad values are bottom-center 2, middle-center 5 and top-center 8. The pasted 6/10 table describes legacy SSA alignment and should not be substituted blindly into ASS force_style. Verify on a rendered frame. Primary source: [Aegisub alignment reference](https://aegisub.org/docs/latest/ass_tags/#line-alignment).

The pipeline does not set an explicit vertical output size, validate audio/caption duration, guarantee fonts or libass support, or manage jobs concurrently. Use unique job directories and atomic completion markers; avoid fixed shared outputs and rename-overwrite assumptions. FFmpeg -y in the pasted source silently permits overwrite. Choose -n unless replacement is explicitly intended.

Accept only after a real authorized run shows readable captions, correct timing and layout, expected aspect ratio, complete audio, no cropped text, bounded memory and no unintended network calls. Record elapsed time, peak memory and actual engine versions. No such run was performed in this review.
