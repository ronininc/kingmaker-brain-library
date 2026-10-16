# Kingmaker Brain Library

The local models [Kingmaker](https://github.com/ronininc/Kingmaker) suggests for every Apple-silicon Mac, the
benchmarks behind each pick, and the weights. Abliterated and uncensored builds are preferred wherever one measured
well. Machine-readable: [`library.json`](library.json) (schema: [`schema/library.schema.json`](schema/library.schema.json)).

**Picks come from measurements, not claims.** Every Mac that runs `kingmaker models bench` adds its results to
[`bench/`](bench/). A class is **measured** once its own results are in, and an **estimate** until then. So the more
Macs that test, the more of this table is measured. A 30-day churn scan finds new builds, and a benchmark decides
whether one replaces a pick.

## Picks per Mac class

| Pack | Macs | Router | Writer | Coder | Vision | Reasoning | Per model | Context | At once | Voice | Pictures | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 8 GB · Lean | 8 GB standard (M1/M2/M3 base) | `mradermacher/Huihui-granite-4.1-3b-abliterated-i1-GGUF:i1-Q4_K_M` | `mradermacher/Huihui-granite-4.1-3b-abliterated-i1-GGUF:i1-Q4_K_M` | `qwen2.5-coder-abliterate:1.5b` | `qwen3.5-abliterated:2b` | `mradermacher/Huihui-granite-4.1-3b-abliterated-i1-GGUF:i1-Q4_K_M` | 3.3 GB | 4k | 1 | text only | off | measured (m5-pro-24gb-as-8gb.json, vm/m5-pro-virtual-8gb.json) |
| 16 GB · Standard | 16 GB (and 18 GB M3 Pro) | `qwen3-abliterated:1.7b` | `qwen3-abliterated:8b` | `qwen2.5-coder-abliterate:7b` | `qwen3.5-abliterated:4b` | `qwen3-abliterated:8b` | 7.5 GB | 8k | 2 | on | off | measured (vm/m5-pro-virtual-16gb.json) |
| 24 GB · Full | 24 GB (M2/M3/M4/M5, M4/M5 Pro) | `qwen3-abliterated:1.7b` | `qwen3-abliterated:8b` | `qwen2.5-coder-abliterate:7b` | `qwen3.5-abliterated:4b` | `TrevorJS/gemma-4-12B-it-uncensored-GGUF:Q4_K_M` | 8.5 GB | 8k | 2 | on | on | measured (m5-pro-24gb.json) |
| 32 GB · Pro | 32 GB (and 36 GB M3 Pro / M4 Max / M5 Max) | `qwen3-abliterated:1.7b` | `mradermacher/Qwen3.8-9B-heretic-uncensored-i1-GGUF:i1-Q4_K_M` | `mradermacher/Qwen3-Coder-30B-A3B-Instruct-Heretic-i1-GGUF:i1-IQ3_M` | `qwen3.5-abliterated:4b` | `mradermacher/Qwen3.6-27B-heretic-i1-GGUF:i1-IQ4_XS` | 18 GB | 32k | 3 | on | on | estimate |
| 48 GB · Studio | 48 GB (M3 Max, M4 Pro/Max, M5 Pro/Max) | `qwen3-abliterated:1.7b` | `mradermacher/Qwen3.6-27B-heretic-i1-GGUF:i1-IQ4_XS` | `mradermacher/Qwen3-Coder-30B-A3B-Instruct-Heretic-i1-GGUF:i1-IQ3_M` | `qwen3.5-abliterated:4b` | `mradermacher/Qwen3.6-27B-heretic-i1-GGUF:i1-IQ4_XS` | 26 GB | 32k | 3 | on | on | estimate |
| 64 GB · Max | 64 GB and up (Max, Ultra, Studio) | `qwen3-abliterated:1.7b` | `mradermacher/Qwen3.6-27B-heretic-i1-GGUF:i1-IQ4_XS` | `mradermacher/Qwen3-Coder-30B-A3B-Instruct-Heretic-i1-GGUF:i1-IQ3_M` | `gemma4:e4b` | `mradermacher/Qwen3.6-27B-heretic-i1-GGUF:i1-IQ4_XS` | 40 GB | 64k | 4 | on | on | estimate |

## Every Mac

| Chip | RAM | GB/s | Pack |
|---|---|---|---|
| M1 | 8 GB | 68 | 8 GB |
| M1 | 16 GB | 68 | 16 GB |
| M1 Pro | 16 GB | 200 | 16 GB |
| M1 Pro | 32 GB | 200 | 32 GB |
| M1 Max | 32 GB | 400 | 32 GB |
| M1 Max | 64 GB | 400 | 64 GB |
| M1 Ultra | 64 GB | 800 | 64 GB |
| M1 Ultra | 128 GB | 800 | 64 GB |
| M2 | 8 GB | 100 | 8 GB |
| M2 | 16 GB | 100 | 16 GB |
| M2 | 24 GB | 100 | 24 GB |
| M2 Pro | 16 GB | 200 | 16 GB |
| M2 Pro | 32 GB | 200 | 32 GB |
| M2 Max | 32 GB | 400 | 32 GB |
| M2 Max | 64 GB | 400 | 64 GB |
| M2 Max | 96 GB | 400 | 64 GB |
| M2 Ultra | 64 GB | 800 | 64 GB |
| M2 Ultra | 128 GB | 800 | 64 GB |
| M2 Ultra | 192 GB | 800 | 64 GB |
| M3 | 8 GB | 100 | 8 GB |
| M3 | 16 GB | 100 | 16 GB |
| M3 | 24 GB | 100 | 24 GB |
| M3 Pro | 18 GB | 150 | 16 GB |
| M3 Pro | 36 GB | 150 | 32 GB |
| M3 Max | 36 GB | 400 | 32 GB |
| M3 Max | 48 GB | 400 | 48 GB |
| M3 Max | 64 GB | 400 | 64 GB |
| M3 Max | 96 GB | 400 | 64 GB |
| M3 Max | 128 GB | 400 | 64 GB |
| M3 Ultra | 96 GB | 819 | 64 GB |
| M3 Ultra | 256 GB | 819 | 64 GB |
| M3 Ultra | 512 GB | 819 | 64 GB |
| M4 | 16 GB | 120 | 16 GB |
| M4 | 24 GB | 120 | 24 GB |
| M4 | 32 GB | 120 | 32 GB |
| M4 Pro | 24 GB | 273 | 24 GB |
| M4 Pro | 48 GB | 273 | 48 GB |
| M4 Pro | 64 GB | 273 | 64 GB |
| M4 Max | 36 GB | 546 | 32 GB |
| M4 Max | 48 GB | 546 | 48 GB |
| M4 Max | 64 GB | 546 | 64 GB |
| M4 Max | 128 GB | 546 | 64 GB |
| M5 | 16 GB | 153 | 16 GB |
| M5 | 24 GB | 153 | 24 GB |
| M5 | 32 GB | 153 | 32 GB |
| M5 Pro | 24 GB | 307 | 24 GB |
| M5 Pro | 48 GB | 307 | 48 GB |
| M5 Pro | 64 GB | 307 | 64 GB |
| M5 Max | 36 GB | 614 | 32 GB |
| M5 Max | 48 GB | 614 | 48 GB |
| M5 Max | 64 GB | 614 | 64 GB |
| M5 Max | 128 GB | 614 | 64 GB |

## Models

| Model | Kind | Licence | Status | Weights here | Best measured |
|---|---|---|---|---|---|
| `gemma4:e4b` | stock | none on its card | pick (64 GB vision) | pointer only | 61.3 tok/s, holds 6.96 GB, tools 94%, route 100%, write 100% (m5-pro-24gb.json) |
| `mradermacher/Huihui-granite-4.1-3b-abliterated-i1-GGUF:i1-Q4_K_M` | abliterated | apache-2.0 | pick (8 GB router, 8 GB writer, 8 GB reasoning) | [model-mradermacher-huihui-granite-4.1-3b-abliterated-i1-gguf-i1-q4-k-m](https://github.com/ronininc/kingmaker-brain-library/releases/tag/model-mradermacher-huihui-granite-4.1-3b-abliterated-i1-gguf-i1-q4-k-m) | 97 tok/s, holds 2.53 GB, tools 89%, route 92%, write 100% (m5-pro-24gb-as-8gb.json) |
| `mradermacher/Qwen3-Coder-30B-A3B-Instruct-Heretic-i1-GGUF:i1-IQ3_M` | uncensored | none on its card | pick (32 GB coder, 48 GB coder, 64 GB coder) | pointer only | — |
| `mradermacher/Qwen3.6-27B-heretic-i1-GGUF:i1-IQ4_XS` | uncensored | none on its card | pick (32 GB reasoning, 48 GB writer, 48 GB reasoning, 64 GB writer, 64 GB reasoning) | pointer only | — |
| `mradermacher/Qwen3.8-9B-heretic-uncensored-i1-GGUF:i1-Q4_K_M` | heretic | none on its card | pick (32 GB writer) | pointer only | 42.5 tok/s, holds 10.43 GB, tools 94%, route 100%, write 100% (m5-pro-24gb.json) |
| `TrevorJS/gemma-4-12B-it-uncensored-GGUF:Q4_K_M` | uncensored | apache-2.0 | pick (24 GB reasoning) | not yet | 32.7 tok/s, holds 8.39 GB, tools 100%, route 100%, write 100% (m5-pro-24gb.json) |
| `qwen2.5-coder-abliterate:1.5b` | abliterated | apache-2.0 | pick (8 GB coder) | [model-huihui-ai-qwen2.5-coder-abliterate-1.5b](https://github.com/ronininc/kingmaker-brain-library/releases/tag/model-huihui-ai-qwen2.5-coder-abliterate-1.5b) | 182.3 tok/s, holds 1.31 GB, tools 50%, route 83%, write 33% (m5-pro-24gb-as-8gb.json) |
| `qwen2.5-coder-abliterate:7b` | abliterated | apache-2.0 | pick (16 GB coder, 24 GB coder) | [model-huihui-ai-qwen2.5-coder-abliterate-7b](https://github.com/ronininc/kingmaker-brain-library/releases/tag/model-huihui-ai-qwen2.5-coder-abliterate-7b) | 56.7 tok/s, holds 5.43 GB, tools 94%, route 100%, write 67% (m5-pro-24gb.json) |
| `qwen3-abliterated:1.7b` | abliterated | apache-2.0 | pick (16 GB router, 24 GB router, 32 GB router, 48 GB router, 64 GB router) | [model-huihui-ai-qwen3-abliterated-1.7b](https://github.com/ronininc/kingmaker-brain-library/releases/tag/model-huihui-ai-qwen3-abliterated-1.7b) | 178.8 tok/s, holds 1.84 GB, tools 83%, route 75%, write 67% (m5-pro-24gb-as-8gb.json) |
| `qwen3-abliterated:8b` | abliterated | apache-2.0 | pick (16 GB writer, 16 GB reasoning, 24 GB writer) | [model-huihui-ai-qwen3-abliterated-8b](https://github.com/ronininc/kingmaker-brain-library/releases/tag/model-huihui-ai-qwen3-abliterated-8b) | 52.6 tok/s, holds 7.29 GB, tools 100%, route 92%, write 100% (m5-pro-24gb.json) |
| `qwen3.5-abliterated:2b` | abliterated | apache-2.0 | pick (8 GB vision) | not yet | 129.9 tok/s, holds 2.99 GB, tools 83%, route 58%, write 67% (m5-pro-24gb-as-8gb.json) |
| `qwen3.5-abliterated:4b` | abliterated | apache-2.0 | pick (16 GB vision, 24 GB vision, 32 GB vision, 48 GB vision) | not yet | 68.7 tok/s, holds 3.68 GB, tools 83%, route 75%, write 33% (m5-pro-24gb-as-8gb.json) |
| `gemma3:4b` | stock | none on its card | option | pointer only | 81.5 tok/s, holds 3.97 GB, tools 94%, route 83%, write 100% (m5-pro-24gb-as-8gb.json) |
| `gemma4:e2b` | stock | none on its card | option | pointer only | 93 tok/s, holds 4.7 GB, tools 100%, route 100%, write 100% (m5-pro-24gb-as-8gb.json) |
| `granite4.1:3b` | stock | apache-2.0 | option | not yet | 98.2 tok/s, holds 2.51 GB, tools 89%, route 92%, write 100% (m5-pro-24gb-as-8gb.json) |
| `Abiray/Huihui-Ministral-3B-Instruct-2512-abliterated-GGUF:Q4_K_M` | abliterated | none on its card | option | pointer only | 97.7 tok/s, holds 2.6 GB, tools 72%, route 92%, write 100% (m5-pro-24gb-as-8gb.json) |
| `bartowski/Dolphin3.0-Llama3.1-8B-GGUF:Q8_0` | stock | none on its card | option | pointer only | 31.6 tok/s, holds 10.16 GB, tools 94%, route 83%, write 100% (m5-pro-24gb.json) |
| `mradermacher/gemma-4-26B-A4B-it-uncensored-i1-GGUF:i1-IQ3_M` | uncensored | none on its card | option | pointer only | 71.6 tok/s, holds 12.44 GB, tools 83%, route 100%, write 100% (m5-pro-24gb.json) |
| `mradermacher/gemma-4-26B-A4B-it-uncensored-i1-GGUF:i1-IQ4_XS` | uncensored | none on its card | option | pointer only | 70.6 tok/s, holds 14.09 GB, tools 83%, route 100%, write 100% (m5-pro-24gb.json) |
| `mradermacher/Huihui-Qwen3-14B-abliterated-v2-GGUF:Q4_K_M` | abliterated | none on its card | option | pointer only | 28.1 tok/s, holds 5.95 GB, tools 100%, route 100%, write 0% (m5-pro-24gb.json) |
| `mradermacher/Huihui-Qwen3-14B-abliterated-v2-GGUF:Q5_K_M` | abliterated | none on its card | option | pointer only | 25.4 tok/s, holds 12.52 GB, tools 100%, route 100%, write 100% (m5-pro-24gb.json) |
| `mradermacher/Meta-Llama-3.1-8B-Instruct-abliterated-GGUF:Q6_K` | abliterated | none on its card | option | pointer only | 42 tok/s, holds 8.57 GB, tools 67%, route 100%, write 100% (m5-pro-24gb.json) |
| `TrevorJS/gemma-4-E2B-it-uncensored-GGUF:Q4_K_M` | uncensored | none on its card | option | pointer only | 104.5 tok/s, holds 3.71 GB, tools 83%, route 100%, write 100% (m5-pro-24gb-as-8gb.json) |
| `TrevorJS/gemma-4-E4B-it-uncensored-GGUF:Q4_K_M` | uncensored | none on its card | option | pointer only | 62.4 tok/s, holds 6.33 GB, tools 83%, route 92%, write 100% (m5-pro-24gb-as-8gb.json) |
| `TrevorJS/gemma-4-E4B-it-uncensored-GGUF:Q8_0` | uncensored | none on its card | option | pointer only | 45.7 tok/s, holds 8.02 GB, tools 78%, route 100%, write 67% (m5-pro-24gb.json) |
| `deepseek-r1-abliterated:14b` | abliterated | none on its card | option | pointer only | 28 tok/s, holds 11.56 GB, tools 28%, route 0%, write 100% (m5-pro-24gb.json) |
| `deepseek-r1-abliterated:8b` | abliterated | none on its card | option | pointer only | 52.3 tok/s, holds 7.42 GB, tools 28%, route 0%, write 67% (m5-pro-24gb.json) |
| `llama3.2-abliterate:3b` | abliterated | none on its card | option | pointer only | 109.9 tok/s, holds 3.01 GB, tools 72%, route 92%, write 100% (m5-pro-24gb-as-8gb.json) |
| `qwen3-abliterated:0.6b` | abliterated | apache-2.0 | option | not yet | 339.4 tok/s, holds 1.29 GB, tools 61%, route 67%, write 100% (m5-pro-24gb-as-8gb.json) |
| `qwen3-abliterated:14b` | abliterated | none on its card | option | pointer only | 30 tok/s, holds 11.05 GB, tools 100%, route 100%, write 100% (m5-pro-24gb.json) |
| `qwen3-abliterated:4b` | abliterated | none on its card | option | pointer only | 91.4 tok/s, holds 3.31 GB, tools 78%, route 100%, write 100% (m5-pro-24gb-as-8gb.json) |
| `qwen3.5-abliterated:0.8b` | abliterated | none on its card | option | pointer only | 166.7 tok/s, holds 2.27 GB, tools 67%, route 50%, write 67% (m5-pro-24gb-as-8gb.json) |
| `local/gemma-4-31b-it-heretic.i1-iq3_m` | uncensored | none on its card | option | pointer only | 12.1 tok/s, holds 15.9 GB, tools 100%, route 100%, write 100% (m5-pro-24gb.json) |
| `local/gemma-4-e4b-it-ultra-uncensored-heretic-q4_k_m` | uncensored | none on its card | option | pointer only | 64.6 tok/s, holds 5.21 GB, tools 94%, route 100%, write 100% (m5-pro-24gb.json) |
| `local/qwen3-coder-30b-a3b-instruct-heretic.i1-iq3_m` | uncensored | none on its card | option | pointer only | 86.5 tok/s, holds 5.23 GB, tools 89%, route 100%, write 100% (m5-pro-24gb.json) |
| `local/qwen3.5-4b-heretic.i1-q4_k_m` | uncensored | none on its card | option | pointer only | 66.8 tok/s, holds 5.34 GB, tools 83%, route 100%, write 67% (m5-pro-24gb-as-8gb.json) |
| `local/qwen3.6-27b-heretic.i1-iq4_xs` | uncensored | none on its card | option | pointer only | 12.4 tok/s, holds 14.75 GB, tools 94%, route 100%, write 100% (m5-pro-24gb.json) |
| `local/qwen3.8-9b-heretic-uncensored.i1-q4_k_m` | uncensored | none on its card | option | pointer only | 43.6 tok/s, holds 6.41 GB, tools 94%, route 100%, write 100% (m5-pro-24gb.json) |
| `local/rvn-iq4_xs-mtp` | stock | none on its card | option | pointer only | 15.5 tok/s, holds 9.47 GB, tools 100%, route 100%, write 100% (m5-pro-24gb.json) |
| `ministral-3:3b` | stock | none on its card | option | pointer only | 91.1 tok/s, holds 3.62 GB, tools 83%, route 100%, write 67% (m5-pro-24gb-as-8gb.json) |
| `qwen3.5:4b` | stock | none on its card | option | pointer only | 67.8 tok/s, holds 3.7 GB, tools 89%, route 100%, write 100% (m5-pro-24gb-as-8gb.json) |

## For bigger Macs (options, not measured here)

Listed for when a bigger Mac arrives. Never picked automatically, not benchmarked here, and the weights are linked upstream, not republished. These do not run in Ollama.

| Model | Licence | For | Files | Runtime |
|---|---|---|---|---|
| [DeepSeek-V4.1-Flash-UNCENSORED](https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-UNCENSORED-FP8) · [GGUF](https://huggingface.co/Adolphsson/DeepSeek-V4.1-Flash-UNCENSORED-GGUF)<br><small>763B total, ~16B active per token (MoE), 1M tokens context. Weight-level abliteration. For a 512 GB Mac (M3 Ultra Mac Studio): Q4_K_M (426 GB) is the largest that leaves room for macOS; Q8_0 (508 GB) does not fit.</small> | mit | 512 GB Macs | Q2_K 270.6 GB, Q3_K_M 351.7 GB, Q4_K_M 426.1 GB, Q8_0 508 GB, mmproj-BF16 (vision projector) 1 GB | Not Ollama: antirez's ds4 engine, or a llama.cpp build with DeepSeek V4/V4.1 support. |
| [Huihui-DeepSeek-V4-Flash-abliterated](https://huggingface.co/huihui-ai/Huihui-DeepSeek-V4-Flash-abliterated-ds4-GGUF)<br><small>DeepSeek V4 Flash (MoE). For 192–256 GB Macs (M2 Ultra 192 GB, M3 Ultra 256 GB): ds4-Q2 or Q4_K.</small> | mit | 192 / 256 GB Macs | ds4-Q2 86.7 GB, Q2_K 99.7 GB, Q4_K 164.6 GB, MTP draft (speculative decoding) 3.8 GB | Not Ollama: antirez's ds4 engine, or a llama.cpp build with DeepSeek V4 support. |

## Install a pick with Kingmaker

```
kingmaker models library pull <tag>      # downloads the parts, checks every SHA-256, loads it into Ollama
kingmaker models setup --pack <class>    # a whole pack
kingmaker models bench                   # measure this Mac; then: kingmaker models library submit
```

Submissions are scanned, then reviewed by the owner: see [CONTRIBUTING.md](CONTRIBUTING.md).

Each model keeps its own licence: see [NOTICE.md](NOTICE.md). A model without a licence on its card is listed and
measured here, but its weights are not republished.
