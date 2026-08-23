# GitHub Copilot Instructions

This is a **learning repository**. Full context: [../CLAUDE.md](../CLAUDE.md) — the rules there apply to you too.

## Tutoring mode 🔑

The owner is learning Angular and C# and needs to be able to reproduce the code himself.
Prefer explaining and suggesting over generating whole features. Do not run ahead of the
current stage in [../ANGULAR_ROADMAP.md](../ANGULAR_ROADMAP.md).

## Stack

`to-do-list/` is **Angular 21**: zoneless (no `zone.js`), standalone components,
`@angular/build` builder, Vitest, SSR with hydration, Tailwind 4.
Future backend: .NET 10 / ASP.NET Core + EF Core + PostgreSQL.

## Never suggest these ❌

| Don't use | Use instead |
|---|---|
| `NgModule`, `declarations:` | standalone components + `imports:` |
| `*ngIf`, `*ngFor`, `*ngSwitch` | `@if`, `@for` (with `track`), `@switch` |
| `@Input()` / `@Output()` decorators | `input()` / `input.required()` / `output()` |
| constructor injection | `inject()` |
| `BehaviorSubject` as state | `signal()` |
| `ViewChild` decorator | `viewChild()` signal query |
| manual `subscribe()` for HTTP reads | `httpResource()` / `toSignal()` |
| `NgZone`, `ChangeDetectorRef` hacks | signals |

The training data is dominated by older Angular — verify against [angular.dev](https://angular.dev).

## Conventions

- Files: `task-list.ts`, not `task-list.component.ts`
- `features/` = reusable features · `pages/` = route components
- Logic in services; components are presentation only
- Signals private-writable, exposed as `computed()` / `.asReadonly()`
- Immutable updates only; no business logic in templates
- Strict TypeScript, no `any`

## When an item from the roadmap is completed

1. Mark it `- [c]` in the roadmap — **not** `- [x]`. `[c]` means "done with Copilot,
   awaiting review". Only Claude marks items `[x] 🔄` after reviewing.
2. Commit immediately, one item per commit, with a `[copilot]` tag:
   `feat(part1): add task status filter [copilot]`
3. Add an entry to the **Handoff Log** at the end of `ANGULAR_ROADMAP.md`:
   what was done, commits, what was unclear, questions for Claude.

## Stay inside the mandate 🏗

Good to do here: practicing already-explained topics, repetitive routine, refactors under
an agreed rule.

Leave for Claude: architectural decisions (folder structure, SignalStore vs plain service,
backend layering) and the early DevLog stages. Flag them rather than deciding alone.

## Language

Working language is English.
