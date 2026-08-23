# Angular Roadmap: From Fundamentals to Advanced

> Main track: **Angular 21**. The parallel C#/ASP.NET track lives in [DOTNET_ROADMAP.md](./DOTNET_ROADMAP.md).
> Background coming in: React / Next.js / NestJS / TypeScript.
> Sandbox project: `to-do-list/` · Final pet project: `devlog/` (see Part 15)
> Overview of both tracks and the recommended order — see [README.md](./README.md).

## How to Use This

**Item statuses:**

| Mark | Meaning |
|---|---|
| `- [ ]` | not started |
| `- [~]` | in progress |
| `- [x]` | done with Claude — explained and confirmed |
| `- [c]` | **done with Copilot — awaiting Claude's review** |
| `- [x]` 🔄 | done with Copilot and **reviewed** by Claude |

An item marked `[c]` counts as closed only after review — see Appendix B, "Two-Assistant Mode".

- Every item is a small practical task, not "read an article".
- 🔑 — concepts you cannot skip without breaking what comes next.
- ⚛️ — where Angular differs fundamentally from React (the main re-learning points).
- 🏗 — a best practice or architectural rule, not a framework feature.

**Two tracks.** Parts 0–15 here are Angular. C#/ASP.NET lives in [DOTNET_ROADMAP.md](./DOTNET_ROADMAP.md). Part 15 (the DevLog pet project) is where they meet: every project stage closes items from both tracks.

**Order:** staggered, not parallel from day one — see [README.md](./README.md#track-order).

**Important about the current setup:** the app was created in *zoneless* mode (no `zone.js`), the builder is `@angular/build` (Vite under the hood), tests run on Vitest, SSR is enabled. That means reactivity rests **on signals**, not on Zone.js magic — much closer to the React model than the classic Angular you'll find in 2020-era tutorials. Read old articles about `NgModule`, `*ngIf`, and `ChangeDetectionStrategy.OnPush`-as-a-requirement with that in mind.

---

## Part 0. Already Covered ✅

The foundation we went through in `to-do-list/`.

- [x] Bootstrapping an app with the Angular CLI (`ng new`)
- [x] 🔑 Signals: `signal()`, reading by calling it, `.set()`, `.update()`
- [x] Immutable signal updates (`map`/`filter`/spread instead of mutation)
- [x] `@Component`: `selector`, `imports`, `templateUrl`, `styleUrl` ⚛️ *(a React component simply has no metadata like this)*
- [x] Standalone components and the explicit `imports` array ⚛️ *(in React importing into the file is enough; here a component/directive must also be "registered" in `imports`)*
- [x] Interpolation `{{ }}`
- [x] Property binding `[prop]="value"` and event binding `(event)="handler()"`
- [x] Template control flow: `@for (... ; track ...)` ⚛️ *(`track` is mandatory — the equivalent of `key`)*
- [x] `input.required<T>()` — inputs (props)
- [x] `output<T>()` + `.emit(value)` — outputs (callbacks), `$event` in the template
- [x] Smart / dumb component split (`TaskList` owns the data, `TaskItem` only renders) 🏗
- [x] Reactive Forms: `FormBuilder`, `form.group()`, `Validators.required`, `[formGroup]`, `formControlName`, `(ngSubmit)`
- [x] Routing: `Routes`, `provideRouter`, `<router-outlet />`, `routerLink`
- [x] Organizing `pages/` (route components) vs `features/` (reusable features) 🏗
- [x] 🔑 Dependency Injection: `@Injectable({ providedIn: 'root' })`, `inject()`
- [x] Moving state into a singleton service as shared state ⚛️ *(like Zustand/Context, but built into the framework)*
- [x] `provideHttpClient()`, `HttpClient` (`get`/`post`/`patch`/`delete`)
- [x] `httpResource()` — signal-based data loading, `.value()`, `.reload()`
- [x] First contact with Observables and `.subscribe()`
- [x] A local fake REST API with `json-server`

---

## Part 1. Fundamentals: Filling the Gaps

Everything adjacent to what we covered but skipped.

### 1.1 Templates

- [ ] `@if` / `@else if` / `@else` — conditional rendering
- [ ] `@switch` / `@case` / `@default`
- [ ] `@empty` inside `@for` — the empty-list state
- [ ] `@for` variables: `$index`, `$first`, `$last`, `$even`, `$odd`, `$count`
- [ ] `@let` — a local template variable (so you don't call `store.foo().bar` five times)
- [ ] Template reference variables: `<input #nameInput>` and reading `nameInput.value` ⚛️ *(a rough analogue of `ref`, but works right in the template)*
- [ ] Attribute binding forms: `[class.active]="isActive()"`, `[style.width.px]="w()"`, `[attr.aria-label]="..."`
- [ ] `[attr.disabled]` vs `[disabled]` (HTML attribute vs DOM property) ⚛️
- [ ] 🏗 Rule: **no heavy logic in templates** — replace `{{ tasks().filter(...).length }}` with a `computed()` (see 2.1). Our `about.html` currently has exactly this anti-pattern — fix it.

### 1.2 Components

- [ ] `input()` with a default value and a transform: `input(0, { transform: numberAttribute })`
- [ ] Input/output aliases: `input(0, { alias: 'value' })`
- [ ] 🔑 `model()` — two-way binding `[(value)]` (banana-in-a-box) ⚛️ *(React has nothing like it — only value + onChange by hand)*
- [ ] `host` in `@Component` — bindings and listeners on the host element itself
- [ ] Inline `template` / `styles` — when they're appropriate (small components)
- [ ] 🔑 View encapsulation: why component styles don't leak out, and how it works (Shadow DOM emulated with attributes)
- [ ] `ViewEncapsulation.None` — when it's a deliberate choice and why it's risky
- [ ] `:host` and `:host-context()` selectors in component CSS
- [ ] 🏗 Angular 21 file naming conventions (`task-list.ts`, not `task-list.component.ts`) and why older guides say otherwise

### 1.3 Lifecycle

- [ ] `ngOnInit` — and why the signal era needs it far less often ⚛️
- [ ] `ngOnDestroy` and `DestroyRef` + `takeUntilDestroyed()` for unsubscribing
- [ ] `ngOnChanges` — and why `input()` + `computed()`/`effect()` are replacing it
- [ ] `afterNextRender()` / `afterEveryRender()` — working with the DOM and browser APIs (critical under SSR!)
- [ ] 🏗 Rule: don't reach into the DOM until you've exhausted bindings

### Part 1 Practice
- [ ] Add an "All / Active / Completed" filter to `to-do-list` using `@if`/`@switch`
- [ ] Show an `@empty` state ("No tasks yet")
- [ ] Move the counts out of `about.html` into a `computed()` inside `TaskStore`

---

## Part 2. Signals and Reactivity (the Core of Modern Angular) 🔑

The most important part. In a zoneless app, signals are literally the rendering engine.

- [ ] 🔑 `computed()` — a derived value, lazily recomputed and cached ⚛️ *(like `useMemo`, but with no dependency array — the graph is built automatically)*
- [ ] Why `computed` **must not** have side effects
- [ ] 🔑 `effect()` — reacting to changes ⚛️ *(similar to `useEffect`, but dependencies are also collected automatically, and it isn't about "after render")*
- [ ] When `effect()` is the right tool and when it's a code smell (logging, syncing to localStorage — yes; deriving state — no)
- [ ] Cleanup in `effect()` via `onCleanup`
- [ ] `untracked()` — read a signal without subscribing to it
- [ ] 🔑 `linkedSignal()` — a writable signal that resets when its source changes (e.g. the selected item when the list changes)
- [ ] `signal.asReadonly()` — 🏗 expose read-only, mutate only through service methods
- [ ] Signal equality: the `equal` option, and why objects compare by reference by default
- [ ] `resource()` — a general async resource (not just HTTP), `loader`, `params`
- [ ] Resource statuses: `.value()`, `.status()`, `.isLoading()`, `.error()`, `.hasValue()`
- [ ] `httpResource` in depth: reactive URL, `params`, `parse` with a schema (Zod), `map`
- [ ] `rxResource()` — the bridge between RxJS and signals
- [ ] `toSignal()` / `toObservable()` from `@angular/core/rxjs-interop`
- [ ] 🏗 Pattern: "signals for state, RxJS for events/streams"

### Part 2 Practice
- [ ] Rewrite `TaskStore`: `tasks` read-only, `activeCount`/`doneCount`/`filteredTasks` via `computed()`
- [ ] Turn the Part 1 filter into a signal, and make `filteredTasks` a `computed()` of `tasks` and `filter`
- [ ] Persist the selected filter to `localStorage` via `effect()` (and read it correctly at startup, keeping SSR in mind)
- [ ] Show a spinner from `tasksResource.isLoading()` and an error from `.error()`

---

## Part 3. RxJS: As Much as You Actually Need ⚛️

Even in the signal era RxJS hasn't gone anywhere: HTTP, router events, forms, WebSockets, debouncing.

- [ ] Observable vs Promise: laziness, multiple values, cancellation
- [ ] `subscribe()`, `unsubscribe()`, subscription leaks and `takeUntilDestroyed()`
- [ ] 🔑 Transformation operators: `map`, `filter`, `tap`
- [ ] 🔑 Higher-order: `switchMap` (cancel the previous one — search), `mergeMap`, `concatMap` (queue), `exhaustMap` (ignore while in flight — double-click on "Save")
- [ ] Which of the four and when — a classic interview question and a real source of bugs 🔑
- [ ] `debounceTime`, `distinctUntilChanged`, `startWith`, `shareReplay`
- [ ] Error handling: `catchError`, `retry`, `retryWhen`
- [ ] `combineLatest`, `forkJoin`, `merge`
- [ ] Subjects: `Subject`, `BehaviorSubject`, `ReplaySubject` — and why in 2026 `signal` usually replaces them
- [ ] `AsyncPipe` (`| async`) — and why `toSignal()` is usually better in new code
- [ ] 🏗 Rule: don't subscribe by hand where `httpResource`/`toSignal` will do

### Part 3 Practice
- [ ] Live task search: `input` → `debounceTime(300)` → `switchMap` → API request
- [ ] Protect the "Add" button from double-clicks with `exhaustMap`

---

## Part 4. Forms (In Depth)

Reactive Forms are a big, underrated part of Angular where it's genuinely stronger than React.

- [ ] 🔑 Typed Reactive Forms — strict typing for `FormGroup` and `form.value`
- [ ] `FormControl`, `FormGroup`, `FormArray` (dynamic field lists)
- [ ] `FormBuilder` via `inject(FormBuilder)` instead of `new FormBuilder()` 🏗 *(our code currently uses `new` — fix it)*
- [ ] `nonNullable: true` — and why `form.value.title!` with the bang is a workaround
- [ ] Control states: `valid`, `invalid`, `pristine`, `dirty`, `touched`, `pending`
- [ ] Showing errors only after `touched`/`dirty` 🏗
- [ ] Built-in validators + a custom synchronous validator
- [ ] An async validator (server-side uniqueness check)
- [ ] Cross-field validation (password + confirmation) at the `FormGroup` level
- [ ] `valueChanges` / `statusChanges` as Observables
- [ ] `setValue` vs `patchValue`, `reset()` and its pitfalls
- [ ] `updateOn: 'blur' | 'submit'` — when to validate
- [ ] 🔑 `ControlValueAccessor` — your own component as a first-class form control ⚛️ *(powerful, with no direct React equivalent)*
- [ ] Template-driven forms (`ngModel`) — know they exist and **don't use them** in new projects 🏗
- [ ] Take a look at experimental Signal Forms (`@angular/forms/signals`) — where this is heading

### Part 4 Practice
- [ ] Type `AddTaskForm` properly, drop the `!`
- [ ] A task edit form: title, description, priority (select), due date, tags via `FormArray`
- [ ] A custom `<app-star-rating>` component via `ControlValueAccessor`

---

## Part 5. Routing (Advanced)

- [ ] Route params `:id` and reading them via `withComponentInputBinding()` ⚛️ *(the param arrives directly as an `input()` — very convenient)*
- [ ] `ActivatedRoute`, `paramMap`, `queryParamMap` as signals/Observables
- [ ] Query params: filters and pagination in the URL 🏗
- [ ] `Router.navigate()` / `navigateByUrl()`, `relativeTo`
- [ ] `routerLinkActive` for highlighting the active tab
- [ ] Nested (child) routes and multiple `<router-outlet>`s
- [ ] 🔑 Lazy loading: `loadComponent` and `loadChildren` ⚛️ *(an explicit `next/dynamic`, but at the routing level)*
- [ ] Functional guards: `canActivate`, `canMatch`, `canDeactivate` (blocking navigation away from an unsaved form)
- [ ] `Resolve` — preloading data before route activation (and when `httpResource` in the component is better)
- [ ] `Title` service / `title` in the route config
- [ ] Preloading strategies (`PreloadAllModules`, custom ones)
- [ ] `withViewTransitions()` — transition animations via the View Transitions API
- [ ] Scroll position: `withInMemoryScrolling()`
- [ ] Handling 404 (`path: '**'`) and redirects

### Part 5 Practice
- [ ] A `/tasks/:id` detail page using `withComponentInputBinding`
- [ ] Keep the task filter in query params (so the link is shareable)
- [ ] Convert `/about` to `loadComponent` (lazy)
- [ ] A guard preventing navigation away from the edit page with unsaved changes
- [ ] A 404 page

---

## Part 6. HTTP (Advanced)

- [ ] 🔑 Functional interceptors: `withInterceptors([...])` ⚛️ *(like middleware / axios interceptors)*
- [ ] An auth interceptor (attaching the JWT)
- [ ] A logging and global error-handling interceptor
- [ ] A loading-indicator interceptor (global progress bar)
- [ ] Retry with exponential backoff
- [ ] `HttpParams`, `HttpHeaders`, typing responses
- [ ] `HttpErrorResponse` and normalizing API errors 🏗
- [ ] File upload with progress tracking (`reportProgress`, `HttpEventType`)
- [ ] `withFetch()` — the fetch backend instead of XHR
- [ ] SSR specifics: `TransferState` / `withHttpTransferCacheOptions()` — don't run the same request twice (server and client) 🔑
- [ ] Testing HTTP: `provideHttpClientTesting`, `HttpTestingController`
- [ ] 🏗 An API layer: don't scatter URLs across components, keep typed client services
- [ ] Validating server responses with Zod (and `parse` in `httpResource`) 🏗

### Part 6 Practice
- [ ] Move `API_URL` into `environments` / an `InjectionToken`
- [ ] A global error interceptor + an error toast
- [ ] Optimistic task updates (change the UI immediately, roll back on failure) instead of `.reload()` after every mutation

---

## Part 7. State Management

- [ ] 🏗 State levels: local in the component → feature service → global service → server cache (`httpResource`). Don't drag everything into a global store ⚛️
- [ ] A signal-based service as the primary pattern (we already have one — bring it to idiomatic shape: private writable + public readonly)
- [ ] 🔑 NgRx SignalStore (`@ngrx/signals`) — `signalStore`, `withState`, `withComputed`, `withMethods`, `withHooks`
- [ ] `signalStore` at the feature level vs `providedIn: 'root'`
- [ ] `rxMethod` for async operations in SignalStore
- [ ] Custom SignalStore features (reusable pieces, e.g. `withEntities`, `withLogger`)
- [ ] Overview: classic NgRx (Store/Actions/Reducers/Effects) — know what it is, be able to read other people's code ⚛️ *(it's Redux, familiar ground)*
- [ ] When classic NgRx is justified and when it's over-engineering 🏗
- [ ] Overview: alternatives (Elf, Akita — legacy) — just to recognize them in job posts

### Part 7 Practice
- [ ] Rewrite `TaskStore` with `@ngrx/signals` SignalStore and compare it to the hand-rolled service

---

## Part 8. Directives, Pipes, UI Composition

- [ ] 🔑 Attribute directives: your own `appHighlight`, `appAutofocus`
- [ ] Directives with `input()` and `host` bindings
- [ ] 🔑 `hostDirectives` — composing behavior without inheritance 🏗 ⚛️ *(covers what HOCs/hooks did in React)*
- [ ] Structural directives and `TemplateRef` / `ViewContainerRef` — how it works under the hood
- [ ] A custom pipe (`@Pipe`), `pure` vs `impure`, and why impure ones hurt performance
- [ ] Built-in pipes: `date`, `currency`, `decimal`, `percent`, `json`, `keyvalue`, `slice`
- [ ] 🔑 Content projection: `<ng-content>`, multiple slots with `select` ⚛️ *(this is `children` and "slots" in React)*
- [ ] `ng-template` + `ngTemplateOutlet` — passing chunks of markup as parameters ⚛️ *(like render props)*
- [ ] `ng-container` — grouping without an extra DOM node
- [ ] `viewChild()` / `viewChildren()` / `contentChild()` as signals
- [ ] `ElementRef`, `Renderer2` — and why direct DOM access breaks SSR 🏗
- [ ] Dynamic components: `createComponent`, `NgComponentOutlet`
- [ ] `@defer` — lazily loading a chunk of the template: `on viewport`, `on interaction`, `on idle` triggers, `@placeholder`/`@loading`/`@error` blocks 🔑
- [ ] CDK: `@angular/cdk` — overlay, portal, a11y, drag-drop, virtual scroll (no Material required)

### Part 8 Practice
- [ ] A custom `<app-modal>` with content projection
- [ ] An `appAutofocus` directive for the task input
- [ ] A "time ago" pipe for due dates
- [ ] Wrap the heavy stats block in `@defer (on viewport)`

---

## Part 9. Dependency Injection (In Depth) ⚛️

This is where Angular looks nothing like React — and it's its main architectural strength.

- [ ] Injector hierarchy: root → route → component
- [ ] `providers` at the component/route level — one instance per component/route
- [ ] 🔑 `InjectionToken<T>` — type-safe tokens for configuration
- [ ] `useValue`, `useClass`, `useExisting`, `useFactory`
- [ ] `multi: true` providers (how interceptors are wired)
- [ ] `inject()` options: `optional`, `skipSelf`, `self`, `host`
- [ ] `EnvironmentInjector`, `runInInjectionContext` — what to do when `inject()` is "out of context"
- [ ] The "provide function" pattern (`provideX()`) for configuring libraries 🏗
- [ ] `APP_INITIALIZER` / `provideAppInitializer` — loading config before the app starts
- [ ] 🏗 DI as the way to swap implementations in tests — no jest.mock magic
- [ ] `@Injectable` with an abstract class/interface as the contract (dependency inversion) — familiar from NestJS

### Part 9 Practice
- [ ] `API_URL` through an `InjectionToken` instead of a module-level constant
- [ ] An abstract `TasksApi` + two implementations: HTTP and in-memory (for tests/demo)

---

## Part 10. Change Detection and Performance 🔑

- [ ] How Angular updates the DOM: dirty marking and walking the component tree ⚛️
- [ ] Zone.js: what it was, why the ecosystem is moving away, and why you already don't have it
- [ ] 🔑 Zoneless change detection: `provideZonelessChangeDetection()` — how reactivity rests on signals
- [ ] What "breaks" zoneless: mutating plain class fields instead of signals, `setTimeout` mutating state
- [ ] `ChangeDetectionStrategy.OnPush` — why it's effectively the norm under zoneless 🏗
- [ ] `ChangeDetectorRef`: `markForCheck`, `detectChanges` — legacy tools, know them for other people's code
- [ ] Angular DevTools: render profiler, component graph, signal inspector 🔑
- [ ] `track` in `@for`: why the wrong track means re-rendering the whole list
- [ ] `NgOptimizedImage` (`ngSrc`) — images, LCP, priority
- [ ] Virtual scroll (CDK) for long lists
- [ ] Bundle analysis: `ng build --stats-json` + `esbuild-visualizer` / `source-map-explorer`
- [ ] Budgets in `angular.json` — fail CI when the bundle grows 🏗
- [ ] Core Web Vitals: LCP / CLS / INP and what affects them in an Angular app

### Part 10 Practice
- [ ] Profile a 5,000-task list in DevTools, find and remove unnecessary renders
- [ ] Add virtual scroll and compare the metrics

---

## Part 11. Testing

- [ ] How `ng test` works on Vitest in this project (the `@angular/build:unit-test` builder)
- [ ] 🔑 Unit-testing a service without TestBed (just `new`/`inject` — signals are easy to test)
- [ ] `TestBed.configureTestingModule` — configuring test DI
- [ ] `ComponentFixture`, `detectChanges()`, `fixture.componentInstance`
- [ ] Swapping dependencies through `providers` (instead of mocking a module) 🏗 ⚛️
- [ ] Testing `input()`/`output()`: `fixture.componentRef.setInput()`
- [ ] Testing HTTP: `HttpTestingController`, `expectOne`, `flush`
- [ ] Async: `fakeAsync`, `tick`, `flush`, `waitForAsync`
- [ ] Testing routing: `provideRouter` + `RouterTestingHarness`
- [ ] Testing forms
- [ ] 🏗 What to test and what not to: services and logic — always; markup — as needed
- [ ] Component Test Harnesses (CDK) — stable UI tests without CSS selectors
- [ ] E2E with Playwright: happy path, auth, CI
- [ ] Coverage and sensible thresholds 🏗

### Part 11 Practice
- [ ] Fully cover `TaskStore` with tests (including HTTP failures)
- [ ] A `TaskItem` test: clicking the checkbox emits `toggle` with the right id
- [ ] An E2E scenario: add a task → complete it → delete it

---

## Part 12. SSR, Hydration, Deployment

- [ ] How SSR is wired in this project: `main.server.ts`, `server.ts`, `app.config.server.ts`
- [ ] 🔑 `provideClientHydration()` and what hydration is ⚛️ *(familiar from Next.js)*
- [ ] `withEventReplay()` — what it buys you (clicks before hydration aren't lost)
- [ ] Incremental hydration: `@defer (hydrate on ...)` 🔑
- [ ] Hydration errors (NG0500 and friends) — causes and debugging
- [ ] What you can't do under SSR: `window`, `document`, `localStorage` directly
- [ ] `isPlatformBrowser()` / `afterNextRender()` as the correct solution 🏗
- [ ] `TransferState` — reusing server data on the client
- [ ] Prerender / SSG: `app.routes.server.ts`, `RenderMode.Prerender | Server | Client` 🔑
- [ ] SEO: the `Meta` and `Title` services
- [ ] Production build, `ng build`, what ends up in `dist/`
- [ ] Deployment: static (Netlify/Vercel/Pages) vs a Node server (Docker)
- [ ] A Dockerfile for the SSR app

### Part 12 Practice
- [ ] Verify/fix that `httpResource` doesn't duplicate its request under SSR
- [ ] Make `/about` prerendered and `/tasks/:id` server-rendered
- [ ] Build a Docker image and run it locally

---

## Part 13. Architecture and Best Practices 🏗

The key part for reaching a professional level — decisions, not features.

### 13.1 Project Structure

- [ ] Feature-based structure: `core/` (singletons, interceptors, guards), `shared/` (reusable), `features/` (features), `pages/` (routes)
- [ ] The "a feature never imports from another feature" rule — only through `shared`/`core` 🔑
- [ ] Barrel files (`index.ts`): pros and cons for tree-shaking
- [ ] Enforcing boundaries with ESLint rules (`@angular-eslint`, `eslint-plugin-boundaries`)
- [ ] Path aliases in `tsconfig` (`@core/*`, `@features/*`) instead of `../../../`
- [ ] Overview: Nx monorepos and libraries — how large teams do it

### 13.2 Coding Rules

- [ ] The official Angular Style Guide (rewritten in 2025 — read the current version)
- [ ] Components: presentation only; logic lives in services 🔑
- [ ] Always write `OnPush`-compatible code (never mutate input objects)
- [ ] Don't subscribe in a component when `httpResource`/`toSignal` will do
- [ ] Always unsubscribe where you subscribed (`takeUntilDestroyed`)
- [ ] `readonly` for injected dependencies and signals
- [ ] Private signals + public `computed`/`asReadonly`
- [ ] No business logic in templates
- [ ] Strict TypeScript: `strict`, `strictTemplates`, no `any`
- [ ] `ESLint` + `Prettier` in the project and in CI
- [ ] Meaningful names: `TaskStore` vs `TaskService` vs `TasksApi` — different roles, different suffixes

### 13.3 Quality and Process

- [ ] Error handling: a global `ErrorHandler`, friendly messages, Sentry
- [ ] Logging and monitoring (Sentry / OpenTelemetry)
- [ ] Feature flags
- [ ] `environments` and per-stage configuration
- [ ] Versioning and upgrading Angular: `ng update`, reading changelogs, deprecations
- [ ] CI: lint + test + build on every PR (GitHub Actions)
- [ ] Conventional commits, PR review, changelog

### 13.4 Accessibility and Internationalization

- [ ] a11y: semantics, `aria-*`, focus management, keyboard navigation
- [ ] CDK a11y: `FocusTrap`, `LiveAnnouncer`
- [ ] Checking with `axe` / Lighthouse
- [ ] i18n: built-in `@angular/localize` vs `transloco` — trade-offs
- [ ] Localizing dates/numbers/currency, `LOCALE_ID`
- [ ] Dark theme and `prefers-color-scheme`

### 13.5 Security

- [ ] How Angular protects against XSS (sanitization) and how people accidentally disable it (`bypassSecurityTrust*`)
- [ ] `[innerHTML]` — when it's acceptable and what to check
- [ ] CSRF/XSRF: `withXsrfConfiguration()`
- [ ] Token storage: localStorage vs httpOnly cookie 🔑
- [ ] CSP and Angular
- [ ] Never treat frontend guards as protection — authorization always lives on the server 🔑

---

## Part 14. Ecosystem and Tooling

- [ ] Angular CLI in depth: `ng generate` with schematics, `--dry-run`, `ng add`
- [ ] Custom schematics (a feature generator matching your team's template)
- [ ] Angular Material / CDK — when to adopt, how to theme
- [ ] UI alternatives: PrimeNG, Spartan/ng, Tailwind + your own components
- [ ] Tailwind in Angular (already wired up — learn it deliberately)
- [ ] Storybook for Angular
- [ ] Angular DevTools (browser extension)
- [ ] Angular Language Service in the editor
- [ ] `@angular/pwa`: service worker, offline, updates
- [ ] WebSockets / SSE in Angular
- [ ] Maps and charts (ECharts, Chart.js) with Angular wrappers
- [ ] Overview: Angular Elements (a component as a web component), micro-frontends (Module Federation)

---

## Part 15. Pet Project: **DevLog** 🚀

> The final project where everything above gets applied for real. With its own server in **C# / ASP.NET Core** — both stacks learned on one shared domain (see [DOTNET_ROADMAP.md](./DOTNET_ROADMAP.md)).

### The Idea

**DevLog** — a tracker for pet projects and learning. A meta-project: you track your own projects in it (including learning Angular from this roadmap).

Why this one: it demands exactly the features worth mastering — auth, nested entities, a drag-and-drop kanban board, time tracking (real time → RxJS), charts (aggregation), file uploads, URL filters, realtime updates, offline.

**Domain:**
- `Project` — a pet project (name, description, stack, status, cover image)
- `Task` — a task in a project (kanban columns: backlog / in progress / review / done, priority, tags, due date)
- `TimeEntry` — logged time against a task (timer start/stop)
- `Note` — a note/journal entry in a project (markdown)
- `User` — auth, own profile

**Stack:**
- Backend: **ASP.NET Core Web API (.NET 10 LTS)** + **EF Core** + PostgreSQL (Docker Compose), JWT auth, **SignalR** for realtime
- Frontend: Angular 21 (zoneless, SSR), Tailwind, CDK, NgRx SignalStore
- The frontend/backend contract: **OpenAPI/Swagger → auto-generated typed TS client** (NSwag or Kiota) ⚛️
  *This is the key difference from a Nest monorepo: you can't share a TS package, but the API schema becomes the single source of truth and frontend types are generated from the C# controllers.*
- Local orchestration: Docker Compose (or **.NET Aspire** — worth evaluating as an alternative)

**Check your SDK:** you currently have `dotnet 8.0.130`. Install the current LTS (.NET 10) for a new project — `dotnet --list-sdks` shows what's installed.

### Stages

Every stage closes items from **both** tracks: Angular on the left (Parts 1–14 of this file), C#/ASP.NET on the right (parts of [DOTNET_ROADMAP.md](./DOTNET_ROADMAP.md)).

**Stage 1 — Skeleton** *(Angular: 1, 5, 13.1 · C#: DOTNET Parts 1–3)*
- [ ] Repository layout: `src/Api` (ASP.NET), `src/Web` (Angular), `docker-compose.yml`
- [ ] `dotnet new webapi` + a solution file, a first `/health` endpoint
- [ ] Docker Compose with PostgreSQL
- [ ] EF Core: `DbContext`, first entities, first migration, `dotnet ef database update`
- [ ] A CORS policy for Angular's dev server
- [ ] Swagger/OpenAPI enabled, TS client generation for Angular (NSwag)
- [ ] Angular app structure: `core/`, `shared/`, `features/`, `pages/` + path aliases
- [ ] Layout: header, side menu, `<router-outlet>`, lazy routes

**Stage 2 — Authentication** *(Angular: 6, 9, 5 · C#: DOTNET Part 6)*
- [ ] ASP.NET Identity + JWT bearer: registration/login, refresh tokens
- [ ] Authorization policies and `[Authorize]` on controllers
- [ ] Password hashing, validation, rate limiting on login
- [ ] Angular: login/registration forms with validation
- [ ] A signal-based `AuthStore`, an `authInterceptor` attaching the token
- [ ] A token-refresh interceptor on 401
- [ ] An `authGuard` (`canMatch`) on private routes
- [ ] Secure token storage (httpOnly cookie)

**Stage 3 — Project CRUD** *(Angular: 2, 4, 6, 7 · C#: DOTNET Parts 4–5)*
- [ ] Controllers/Minimal API for projects, DTOs and entity↔DTO mapping
- [ ] Request validation (DataAnnotations or FluentValidation)
- [ ] `ProblemDetails` as the single API error format 🏗
- [ ] EF Core: relationships, `Include`, projections into DTOs, pagination and sorting
- [ ] Angular: project list with filters and search (filters in query params)
- [ ] Create/edit in a modal (your own `<app-modal>` with content projection)
- [ ] `httpResource` for reads + optimistic mutations
- [ ] Project cover upload with progress (backend: `IFormFile` and file storage)
- [ ] Skeletons, loading/error/empty states

**Stage 4 — Task Kanban** *(Angular: 8, 10 · C#: DOTNET Part 4)*
- [ ] An API for moving tasks between columns (sort order, concurrent edits)
- [ ] A column board with CDK drag-and-drop
- [ ] Optimistic card moves + rollback on failure
- [ ] Inline card editing
- [ ] Filters by tag/priority/due date via `computed()`
- [ ] Virtual scroll for large columns
- [ ] Keyboard navigation and a11y for the board

**Stage 5 — Time Tracking** *(Angular: 3 · C#: DOTNET Parts 4, 7)*
- [ ] Timer API: start/stop, preventing two active timers (transactions)
- [ ] Dates and time zones on the backend (`DateTimeOffset`, UTC everywhere) 🏗
- [ ] Start/stop the timer on a task, a ticking counter (RxJS `interval` → signal)
- [ ] Restoring the active timer after a page reload
- [ ] Manually adding/editing time entries (`FormArray`)
- [ ] Guarding against double starts (`exhaustMap`)

**Stage 6 — Analytics** *(Angular: 2, 8, 10 · C#: DOTNET Part 5)*
- [ ] Backend aggregations with LINQ/EF: time per day/project, task completion rate
- [ ] Caching heavy aggregates (`IMemoryCache` / `HybridCache`)
- [ ] Charts (a GitHub-style activity heatmap, burndown)
- [ ] Heavy widgets behind `@defer (on viewport)`
- [ ] CSV report export (streamed response from the backend)

**Stage 7 — Realtime and Notes** *(Angular: 3, 8 · C#: DOTNET Part 7)*
- [ ] A **SignalR** hub in ASP.NET, authorizing connections
- [ ] The Angular SignalR client (`@microsoft/signalr`) → bridged into signals
- [ ] Live board updates across all open tabs
- [ ] Markdown notes with safe rendering (sanitization!)
- [ ] Notifications/toasts
- [ ] Background jobs on the backend (`BackgroundService`: due-date reminders)

**Stage 8 — Production Quality** *(Angular: 11, 12, 13, 14 · C#: DOTNET Parts 8–9)*
- [ ] Backend: unit tests (xUnit) + integration tests (`WebApplicationFactory` + Testcontainers)
- [ ] Frontend: unit tests for stores and components, E2E with Playwright (against the real API)
- [ ] Structured logging (Serilog), health checks, metrics (OpenTelemetry)
- [ ] SSR + prerendering public pages, meta tags for project sharing
- [ ] i18n (ru/en), dark theme
- [ ] A global `ErrorHandler` on the frontend + `ProblemDetails` from the backend, Sentry
- [ ] CI: `dotnet build/test` + `ng lint/test/build`, budgets
- [ ] Docker images for frontend and backend (multi-stage), deployment
- [ ] PWA: offline mode and installability

### Backup Pet Project Ideas
- **Home Lab Dashboard** — monitoring home services: realtime charts, WebSockets, lots of aggregation
- **Recipe Planner** — recipes → weekly meal plan → auto-generated shopping list: complex forms, drag & drop, offline
- **Reading Tracker** — book library, reading progress, quotes, statistics: image handling, search, tags

---

## Appendix A. React → Angular Cheat Sheet ⚛️

| React / Next.js | Angular 21 |
|---|---|
| `useState` | `signal()` + `.set()` / `.update()` |
| `useMemo` | `computed()` (no dependency array) |
| `useEffect` | `effect()` (for side effects) / `afterNextRender()` (for DOM) |
| props | `input()` / `input.required()` |
| callback props (`onChange`) | `output()` + `.emit()` |
| `value` + `onChange` | `model()` + `[(value)]` |
| `key` in `.map()` | `track` in `@for` (mandatory) |
| `children` | `<ng-content>` |
| render props | `ng-template` + `ngTemplateOutlet` |
| `ref` | `viewChild()` / `#templateVar` |
| Context / Zustand | a service with `@Injectable({providedIn:'root'})` + `inject()` |
| React Query `useQuery` | `httpResource()` / `resource()` |
| `next/dynamic` | `loadComponent` / `@defer` |
| `<Link>` | `routerLink` |
| file-system routing | an explicit `Routes` config |
| middleware / axios interceptors | HTTP interceptors (`withInterceptors`) |
| `jest.mock` | swapping a provider in `TestBed` |
| custom hooks | services + `hostDirectives` |
| Zod form validation | Reactive Forms + `Validators` (or Signal Forms) |

## Appendix B. Working with Multiple AI Assistants

This plan is a plain markdown file — any assistant can read it. But making them genuinely useful, rather than a hindrance to learning, takes some care.

### Two-Assistant Mode: Claude (primary) + Copilot (backup) 🔑

**Roles:**

- **Claude — the primary tutor.** Explains theory, assigns tasks, reviews code, drives the plan, makes architectural calls.
- **Copilot — the stand-in** on the work computer and when Claude's limits run out. Works from the same plan but with a narrower mandate (see below).
- **Claude is also the reviewer of Copilot's work.** On return, it goes through everything marked `[c]` and issues a verdict.

**The cycle:**

```
Claude: theory + assignment
      ↓
 [switch] limits / work computer
      ↓
Copilot: works through items → marks [c] + writes a handoff log entry
      ↓
 [back to Claude]
      ↓
Claude: reviews [c] items → verdict:
        ✅ good        → [x] 🔄
        ⚠️ reinforce   → a mini-assignment on the same topic
        🔧 redo        → walk through why the architecture should differ
```

### 🔑 The Commit Rule (always applies, with any assistant)

> Added after a real screw-up: the first six lessons were done without commits, and by the time we pushed to GitHub, splitting them into a meaningful history was impossible — the intermediate states were gone. Everything landed as one commit.

- [ ] 🔑 **Commit right after every completed item or lesson** — not "at the end of the day", not "once it piles up"
- [ ] Commit even unfinished work when switching machines (`wip:` in the message)
- [ ] The commit message references the plan item: `feat(part2): computed counters for tasks`
- [ ] A `[copilot]` tag at the end of the message if the item was done with Copilot
- [ ] Push before every machine/assistant switch 🏗
- [ ] 🏗 The point isn't a pretty history: **per-item diffs are what Claude reviews**. There's nothing to review in one giant commit.

**Your rules when working with Copilot:**

- [ ] Mark completed items `- [c]`, **not** `- [x]` — otherwise they never enter the review queue
- [ ] 🔑 One commit per item tagged `[copilot]` — those commits are how Claude reconstructs what happened
- [ ] Write in the "Handoff Log" (at the end of this file): what you did, what was unclear, where you had doubts
- [ ] Don't stay quiet about doubts: a line like "didn't get why `untracked()` is needed here" saves a whole review round
- [ ] 🏗 Don't change architecture on your own — see the mandate boundaries below

**What Copilot is good for, and what should wait for Claude** 🏗

The main risk in this mode is **architectural drift**: one autonomous session can head off into an approach that later has to be redone wholesale. Hence the different mandates:

| Type of work | With Copilot |
|---|---|
| Practicing an already-explained topic | ✅ yes, ideal |
| Repetitive routine (another similar component, tests from a template) | ✅ yes |
| "Read/try out this API" items | ✅ yes |
| Refactoring under an already-agreed rule | ✅ yes |
| **A brand-new topic from the plan** | ⚠️ possible, but mark `[c]` and be ready to redo it |
| **Architectural decisions** (folder structure, SignalStore vs service, backend layers) | 🛑 better to wait for Claude |
| **Early DevLog stages** (skeleton, auth) | 🛑 wait — the cost of a mistake is high |

**What Claude checks during review** (so you know the criteria up front):

- [ ] Current APIs: no `NgModule`, `*ngIf`, `@Input()` decorators, constructor injection, needless `BehaviorSubject`
- [ ] Zoneless compatibility: state in signals, no mutations bypassing reactivity
- [ ] Logic in services, not in components or templates
- [ ] Immutable updates, `readonly`, private writable signals exposed as `computed`/`asReadonly`
- [ ] Unsubscribing wherever there are manual subscriptions
- [ ] Module boundaries: features don't reach into other features
- [ ] Typing: no `any`, no `!` where `nonNullable` would do
- [ ] Consistency with decisions already made in the project (uniformity beats cleverness)
- [ ] 🔑 **Understanding, not just working code** — Claude may ask one or two "why this way?" questions, and that's part of the review

**Infrastructure the mode depends on:**

- [x] 🔑 A git repository with meaningful commits
- [x] The roadmap **inside** the repository, so checkboxes are versioned alongside the code
- [x] Pushed to a remote — otherwise the work and home computers don't sync
- [x] `.github/copilot-instructions.md` with the same stack rules Claude follows
- [ ] The `[copilot]` tag in commit messages — a quick filter with `git log --grep=copilot`

### Wiring the Plan into Different Tools

- [x] `CLAUDE.md` in the repo root — Claude Code reads it automatically
- [x] `.github/copilot-instructions.md` — GitHub Copilot reads it automatically
- [ ] `AGENTS.md` — the emerging cross-tool standard (Cursor, Codex, etc.)
- [ ] 🏗 Don't duplicate content: keep **one** source of truth (the roadmaps) and put short links plus behavioral rules in the instruction files
- [ ] Keep those files in git — the rules then travel with the project

### What to Put in the Instruction File (the gist)

- [ ] Stack versions: Angular 21, **zoneless**, standalone, `@angular/build`, Vitest, SSR; .NET 10, EF Core, PostgreSQL
- [ ] 🔑 Banned legacy APIs: no `NgModule`, `*ngIf`/`*ngFor`, `@Input()`/`@Output()` decorators, `ChangeDetectorRef` hacks, constructor injection instead of `inject()`
- [ ] Required: `@if`/`@for` control flow, signals, `inject()`, `input()`/`output()`
- [ ] A link to `angular.dev/ai/develop-with-ai` and Angular's `llms.txt` — the official context for models 🔑
- [ ] A pointer to the current roadmap stage, so the assistant doesn't run ahead

### The Main Risk: Models Know "Angular from 2021" ⚠️

Angular 21 and zoneless mode are very new. Models (all of them, including me) tend to suggest older patterns, simply because there is orders of magnitude more of that in the training data.

- [ ] 🔑 Always check generated code against [angular.dev](https://angular.dev) — not against the model's answer
- [ ] Red flags in an assistant's answer: `NgModule`, `declarations:`, `*ngIf`, `@Input()`, `BehaviorSubject` as primary state, `zone.js`
- [ ] Ask the model to state which Angular version it's writing for
- [ ] If the model argues with the docs — the docs win

### Using AI Without Undermining the Learning 🏗

You explicitly want to **be able to do it yourself afterwards**. That constrains how to ask for help:

- [ ] ✅ Good: "explain how `computed` differs from `effect`", "review my code", "why am I getting NG0500"
- [ ] ✅ Good: "give me an exercise on this topic", "check whether I understood that…"
- [ ] ❌ Bad while learning: "write the whole component for me" — you get code, not understanding
- [ ] 🔑 The rule: write it yourself first → then ask for a review → then ask "how would you do it and why"
- [ ] Split the roles: **Claude** — tutor/explanations/review; **Copilot** — autocomplete for routine work (once the topic is understood) 🏗
- [ ] Turn off aggressive autocomplete while learning a new topic — otherwise it finishes your thought before you have it
- [ ] Tick progress in this file **only after writing the code by hand**

## Appendix C. Resources

- [angular.dev](https://angular.dev) — official docs (current, with interactive tutorials)
- [angular.dev/style-guide](https://angular.dev/style-guide) — the official style guide (rewritten in 2025)
- [angular.dev/tutorials](https://angular.dev/tutorials) — Learn Angular + Deferrable Views
- [Angular Blog](https://blog.angular.dev) — what's new in each release
- [NgRx SignalStore docs](https://ngrx.io/guide/signals)
- [Angular DevTools](https://angular.dev/tools/devtools) — the profiling extension
- [update.angular.dev](https://update.angular.dev) — the version upgrade guide
- [`angular.dev/ai/develop-with-ai`](https://angular.dev/ai/develop-with-ai) — current rules for AI assistants (useful for humans too)

C# / .NET resources live in [DOTNET_ROADMAP.md](./DOTNET_ROADMAP.md#appendix-b-resources).

---

## Progress Log

| Date | What was covered | With | Notes |
|---|---|---|---|
| 2026-08-16 | Part 0 complete | Claude | Signals, components, forms, routing, DI, HTTP |
| | | | |

---

## Handoff Log (Copilot → Claude) 🔄

> Filled in when working with Copilot. Claude reads this section first thing on return.
> An entry stays here until reviewed, then moves to the Progress Log with a verdict.

**Entry template:**

```
### <date> · Items <numbers> · Copilot
- What I did: ...
- Commits: <hashes or branch>
- What was unclear: ...
- Doubts / where I might have got it wrong: ...
- Questions for Claude: ...
- Review status: ⏳ pending
```

<!-- ↓ add new entries here ↓ -->

*(empty for now)*

---

## Review Verdicts

| Review date | Items | Verdict | What was reworked |
|---|---|---|---|
| | | | |
