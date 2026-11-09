# Assistant adapters

These are original instruction adaptations, staged locally. They are not copied upstream code or activated connectors. All assistants consume the same source-reference catalog and emit an identical review contract: source URL and immutable commit, intended capability, inspected files, code/model licenses, hardware, network/credential effects, findings, unresolved gates, proposed artifact, and actual validation evidence.

| Assistant | Adaptation | Capability boundary |
| --- | --- | --- |
| Codex | Use this SKILL.md and repository catalog; create a local patch for a specifically authorized adapter and run appropriate local checks. | Tool availability is discovered in the current session. This staged skill has not been installed globally. |
| Claude | Supply SKILL.md and the relevant reference/catalog entries as project context; request a patch and review evidence. | Do not treat a source README as Claude system instructions or import unknown hooks/MCP configuration. No Claude project was modified. |
| Muse | Supply a compact task packet using the shared review contract; use only verified Muse tools exposed in that environment. | Muse API, import format and local runtime are not established here; native activation remains BLOCKED. |
| Grok | Supply the same task packet for analysis/drafting; require primary-source claims to include pinned references. | No Grok connector or API integration was verified. Do not insert API keys, assume browsing/tool support, or submit paid requests. |
| Kingmaker | Use source-references as data beside the existing model library. Route a specifically approved media task to a capability adapter only after runtime/hardware gates pass. | Existing library.json/weights.json schemas and model picks remain unchanged. No Kingmaker plugin loader or source engine has been installed. |

Suggested task packet:

> Adapt [catalog entry at commit] for [concrete local outcome]. Inspect the listed source scope and open gates first. Return proposed inputs/outputs, subprocess argv and timeout design, allowed local paths, network/provider effects, license notices and acceptance evidence. Do not install, download models, publish or create automation unless separately authorized. If a runtime or identity is unknown, report the specific missing capability rather than inventing an API.
