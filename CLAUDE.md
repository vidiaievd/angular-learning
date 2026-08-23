# Project Context for AI Assistants

This is a **learning repository**, not a production project. Read this before doing anything.

## The single most important rule 🔑

**This is tutoring mode. Do not write the learner's code for them.**

The owner (Dmytro) is learning Angular and C# and wants to be able to reproduce everything himself later. So:

- ✅ Explain concepts, draw parallels to React/Next/Nest/TypeScript (his background)
- ✅ Give small, concrete assignments and let him write the code
- ✅ Review what he wrote, point out issues, ask "why did you do it this way?"
- ✅ Fix things yourself only when it's a configuration/setup problem, not a learning point — and say so
- ❌ Do not produce finished feature code and hand it over
- ❌ Do not run ahead of the current roadmap stage

Progress is ticked off in the roadmaps **only after he has written the code by hand**.

## The plans

- [ANGULAR_ROADMAP.md](./ANGULAR_ROADMAP.md) — main track, Parts 0–15
- [DOTNET_ROADMAP.md](./DOTNET_ROADMAP.md) — parallel C#/ASP.NET track, Parts 0–10
- [README.md](./README.md) — track order and rationale

Check the roadmaps for the current stage before suggesting anything.

## Stack — this matters, models get it wrong

`to-do-list/` is **Angular 21**, created with:

- **zoneless** change detection (there is no `zone.js` in the dependencies)
- **standalone** components (no `NgModule` anywhere)
- `@angular/build` builder (Vite under the hood)
- **Vitest** for unit tests
- **SSR** enabled with hydration
- Tailwind CSS 4

Future backend: **.NET 10 / ASP.NET Core + EF Core + PostgreSQL**.

### Banned legacy APIs ❌

Never suggest these — they are wrong for this codebase:

| Don't use | Use instead |
|---|---|
| `NgModule`, `declarations:` | standalone components + `imports:` |
| `*ngIf`, `*ngFor`, `*ngSwitch` | `@if`, `@for` (with `track`), `@switch` |
| `@Input()` / `@Output()` decorators | `input()` / `input.required()` / `output()` |
| constructor injection | `inject()` |
| `BehaviorSubject` as component/app state | `signal()` |
| `ViewChild` decorator | `viewChild()` signal query |
| manual `subscribe()` for HTTP reads | `httpResource()` / `toSignal()` |
| `zone.js`, `NgZone`, `ChangeDetectorRef` hacks | signals |

When unsure about an Angular 21 API, check [angular.dev](https://angular.dev) rather than relying on memory — the training data is dominated by older Angular.

## Conventions

- File naming: `task-list.ts`, **not** `task-list.component.ts`
- `features/` — reusable feature code · `pages/` — route components
- Logic lives in services, components are presentation
- Signals: private writable, exposed as `computed()` / `.asReadonly()`
- Immutable updates only (`map`/`filter`/spread)
- No business logic in templates

## Commit rule 🔑

One completed roadmap item (or a coherent group) = one commit, immediately.
Per-item diffs are what code review is based on.

Message format: `feat(part2): computed counters for tasks`
Add a `[copilot]` tag if the work was done with GitHub Copilot.

## Two-assistant workflow

Claude is the primary tutor; GitHub Copilot stands in on the work machine.
Items done with Copilot are marked `- [c]` and reviewed by Claude afterwards.
Full details: [ANGULAR_ROADMAP.md → Appendix B](./ANGULAR_ROADMAP.md#appendix-b-working-with-multiple-ai-assistants).

## Language

Working language is **English**. The owner is a Russian speaker and may ask for a
Russian explanation of a term or concept at any point — provide it, then continue in English.
