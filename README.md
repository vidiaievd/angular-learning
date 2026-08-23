# Angular + ASP.NET Core — Learning Repository

Step-by-step study of **Angular 21** (main track) and **C# / ASP.NET Core** (parallel track).
Background coming in: React / Next.js / NestJS / TypeScript.

## Structure

| File / folder | What it is |
|---|---|
| [ANGULAR_ROADMAP.md](./ANGULAR_ROADMAP.md) | The Angular plan: Parts 0–15, appendices, AI-assistant workflow |
| [DOTNET_ROADMAP.md](./DOTNET_ROADMAP.md) | The C# / ASP.NET Core plan: Parts 0–10 |
| `to-do-list/` | The Angular sandbox project |
| `devlog/` *(later)* | The final pet project: Angular + ASP.NET Core |

## Current Status

- ✅ **Angular Part 0** — signals, components (`input`/`output`), Reactive Forms, routing, DI, `HttpClient` + `httpResource`
- 🔜 **Angular Part 1** — `@if`/`@switch`/`@empty`, `model()`, lifecycle
- ⏸️ **C# track** — not started (scheduled to begin after Angular Part 7)

Running the sandbox:

```bash
cd to-do-list
npm install
npm run api     # json-server on :3000 (in a separate terminal)
npm start       # ng serve on :4200
```

---

## Track Order

**The question:** learn Angular and C# in parallel, or finish Angular first?

**The answer: staggered — neither one in its pure form.**

### Why not fully parallel

Two unfamiliar languages at once produce **interference**, not acceleration:

- `async/await` in C# looks identical to TypeScript but works differently (thread pool vs event loop). Learning both models on the same day is a reliable way to confuse them for a long time.
- Laziness in LINQ and laziness in signals are different things with deceptively similar intuition.
- Both have DI, each with its own lifetime rules.
- Plus the obvious: every context switch costs momentum.

### Why not strictly sequential

- "All of Angular first" means months. C# is needed for work; waiting that long makes no sense.
- Angular Parts 10–14 (performance, testing, SSR, ecosystem) only make sense **on a real project**, and a real project wants a real backend.

### The staggered plan ✅

```
Phase A ──────────────► Phase B ──────────► Phase C
Angular 1–7            bridge: own API      DevLog
frontend only          C# 0–4               both tracks
                       (domain already known)  by vertical slice
```

**Phase A — Angular only, Parts 1–7.**
Goal: the frontend stops being the bottleneck. Covers templates, signals, RxJS, forms, routing, HTTP, state management.
*Signal to move on:* adding a new entity to `to-do-list` (say, "projects") no longer raises the question "how is this even done?".

**Phase B — the bridge. C# Parts 0–4 on the task "move `to-do-list` off json-server onto your own ASP.NET API".**
This is the crux of the whole plan: **the domain is already familiar**, you know what the result should be, and the frontend barely changes. All attention goes to the language and framework rather than to figuring out requirements. A first C# task with an already-understood outcome is the fastest possible entry point.

**Phase C — DevLog, alternating by vertical slice.**
Every feature goes end to end: backend first (endpoint + EF Core), then frontend (store + UI). Both stacks grow together, and there's a working result at every step.

### Exception

If a **C# deadline** appears at work, the plan flips: Part 1 of `DOTNET_ROADMAP.md` starts immediately, and Angular goes into maintenance mode (practice only, no new topics).

### What makes the knowledge transfer

NestJS was inspired by Angular, and Angular by .NET approaches in many ways. The DI container, decorators/attributes, the middleware pipeline, layered architecture — conceptually these are the same thing. The syntax changes, not the thinking. Such places are marked 🅰️ in `DOTNET_ROADMAP.md`, and there's a mapping table at the end: TS/Nest/Angular → C#/ASP.NET.

---

## Working with AI Assistants

**Claude** — the primary tutor: theory, assignments, review, architectural decisions.
**Copilot** — the stand-in on the work computer and when limits run out.

Items completed with Copilot are marked `- [c]` and enter the review queue. On return, Claude goes through them and issues a verdict: good / reinforce / redo.

Details in [ANGULAR_ROADMAP.md → Appendix B](./ANGULAR_ROADMAP.md#appendix-b-working-with-multiple-ai-assistants).

### The commit rule 🔑

**Commit right after every completed item.** Per-item diffs are what the review is based on; there's nothing to review in one giant commit. Tag the message `[copilot]` if the item was done with Copilot.

### Language

Working language of the plans and the repository is **English** (the work machine has no Russian keyboard layout). Conversations with assistants also run in English by default; ask for a Russian explanation whenever something isn't clear.
