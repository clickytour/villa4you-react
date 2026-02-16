# GPT + Claude Team Playbook (ANCHOR)

## Goal
Use GPT and Claude together without overlap, with clear ownership and faster delivery.

## Fast Routing Rule

### Use GPT first for
- Implementation and refactor tasks in repo
- Bug-fix loops (patch -> build/test -> patch)
- Route/SEO/redirect/form wiring and integration updates
- Delivery operations (commit/push, preview updates, process compliance)

### Use Claude first for
- Architecture and solution-option comparison
- Long-context analysis across large code/doc surfaces
- UX/content strategy and structured rationale
- Dependency/rules modeling before coding

## 3-Phase Delivery Pattern

1. **Think (Claude)**
   - Produce options, tradeoffs, risks
   - Recommend one spec with acceptance criteria

2. **Build (GPT)**
   - Implement approved spec exactly
   - Run build/validation
   - Commit/push and update tracking

3. **Review (Claude, optional)**
   - Audit against acceptance criteria
   - Flag only concrete gaps

## Handoff Templates

### To Claude (strategy)
"Review this feature and return: (1) architecture choice, (2) dependency matrix, (3) acceptance criteria for dev handoff."

### To GPT (execution)
"Implement approved spec exactly; keep established UI/process constraints; run validation and publish delivery links."

### To Claude (QA)
"Audit implementation against acceptance criteria and list only mismatches/risks."

## Guardrails
- Single source of truth: repo + approved references + latest user instruction
- Do not run conflicting parallel edits on same files
- For urgent hotfixes: skip analysis loop, go directly to GPT execution
- Keep process memory mirrored via ANCHOR workflow (local + Confluence)

## Current Project Default Split
- **Claude:** Forms->Core contract modeling, property-form dependency map, SOP-grade analysis docs
- **GPT:** Landing/apply implementation, validation logic, Quick Request UX, routing/metadata/redirects, delivery packaging
