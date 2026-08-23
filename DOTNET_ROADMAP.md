# C# / ASP.NET Core Roadmap: From Zero to Advanced

> The parallel track to [ANGULAR_ROADMAP.md](./ANGULAR_ROADMAP.md). Background coming in: TypeScript, NestJS, Angular.
> Shared pet project: **DevLog** (see Part 15 of the Angular roadmap).

## How to Use This

Item statuses are the same as in the Angular roadmap:

| Mark | Meaning |
|---|---|
| `- [ ]` | not started |
| `- [~]` | in progress |
| `- [x]` | done with Claude — explained and confirmed |
| `- [c]` | **done with Copilot — awaiting Claude's review** |
| `- [x]` 🔄 | done with Copilot and **reviewed** by Claude |

**Icons:** 🔑 critical · 🔷 a fundamental difference from TypeScript · 🏗 best practice · 🅰️ a direct parallel with Angular/Nest (you already know the concept; only the syntax changes)

**Commit rule:** one item (or a coherent group) = one commit. See [ANGULAR_ROADMAP.md → Appendix B](./ANGULAR_ROADMAP.md#appendix-b-working-with-multiple-ai-assistants).

---

## When to Start This Track 🔑

**Not right now, if you've only just started Angular.** Full reasoning is in [README.md](./README.md#track-order); in short:

- **Phase A** *(now)* — Angular only, Parts 1–7. Two unfamiliar languages at once produce interference, not speed.
- **Phase B** *(this track starts)* — Parts 0–4 here, on the task of "moving to-do-list off json-server onto your own ASP.NET API". The domain is already familiar, so all attention goes to the language.
- **Phase C** — DevLog, alternating by vertical slice: backend of a feature, then frontend of the same feature.

**Signal that Phase B should start:** adding a new entity to `to-do-list` (say, "projects") no longer raises the question "how is this even done in Angular?".

**Exception:** if a C# deadline appears at work — flip the priority, start Part 1 immediately, and put Angular into maintenance mode (practice only, no new topics).

---

## Part 0. Setup

- [ ] Install the current .NET SDK (LTS) — the machine currently has `8.0.130`, you want .NET 10
- [ ] `dotnet --info`, `dotnet --list-sdks` — see what's installed
- [ ] Pick an IDE: **Rider** or **VS Code + C# Dev Kit**
- [ ] `dotnet new console` → `dotnet run` — first run
- [ ] Understand the layout: `.csproj`, `.sln`, `Program.cs`
- [ ] `dotnet new list` — what templates exist
- [ ] NuGet instead of npm: `dotnet add package`, where the cache lives, what to commit 🔷
- [ ] `dotnet watch` — hot reload
- [ ] `dotnet format` + `.editorconfig` — formatting 🏗

---

## Part 1. The C# Language for a TypeScript Developer

### 1.1 Fundamental Differences 🔷

- [ ] 🔑 Types exist at runtime — they aren't erased like in TS. Hence reflection, "real" generics, attributes
- [ ] Compilation to IL → JIT. What the CLR, the runtime and the GC are
- [ ] 🔑 Value types vs reference types: `struct` vs `class`, stack and heap, copying by value
- [ ] `null` and Nullable Reference Types: `<Nullable>enable</Nullable>`, `string?`, the `!` operator 🏗
- [ ] Why `string` is a reference type but behaves like a value (immutability)
- [ ] Boxing/unboxing — and why it affects performance

### 1.2 Basic Syntax

- [ ] Types: `int`, `long`, `decimal` vs `double` (money is always `decimal`! 🏗), `bool`, `char`, `string`
- [ ] `var`, target-typed `new()`, `const` vs `readonly`
- [ ] Strings: interpolation `$"..."`, `StringBuilder`, raw string literals `"""..."""`
- [ ] Arrays, `List<T>`, `Dictionary<K,V>`, `HashSet<T>`, collection expressions `[1, 2, 3]`
- [ ] Loops, `foreach`, `switch` expressions
- [ ] 🔑 Pattern matching: `is`, `switch` with patterns, deconstruction, property patterns
- [ ] Ternary, `??`, `??=`, `?.`

### 1.3 OOP in C#

- [ ] Classes: fields, properties (`get`/`set`/`init`), constructors, primary constructors
- [ ] `required` members
- [ ] 🔑 `record` and `record struct` — immutability, value equality, `with` expressions (ideal for DTOs)
- [ ] Access modifiers: `public`, `private`, `protected`, `internal` 🔷
- [ ] Inheritance, `virtual`/`override`/`abstract`/`sealed` — in C# this is a live tool, not a rarity 🔷
- [ ] Interfaces, explicit implementation, default implementations
- [ ] 🅰️ An interface as a DI contract — familiar from Nest/Angular
- [ ] Static classes and members
- [ ] `enum` and flags
- [ ] Operator overloading, `IEquatable<T>`, `IComparable<T>`
- [ ] 🔷 Extension methods — adding a method to someone else's type (impossible in TS)
- [ ] Generics: `class Repo<T>`, constraints `where T : class, new()`
- [ ] Covariance/contravariance — overview, enough to read other people's code

### 1.4 LINQ 🔑

The nicest part of the language. Looks like array methods, but also works against a database.

- [ ] `Where`, `Select`, `SelectMany`, `OrderBy`/`ThenBy`
- [ ] `First`/`FirstOrDefault`/`Single`/`SingleOrDefault` — and the difference between them 🔑
- [ ] `Any`, `All`, `Count`, `Sum`, `Average`, `Min`, `Max`
- [ ] `GroupBy`, `Join`, `Distinct`, `Take`/`Skip`
- [ ] Query syntax (`from x in ...`) vs method syntax — know both, write method syntax
- [ ] 🔑 `IEnumerable<T>` vs `IQueryable<T>` — the latter translates into SQL
- [ ] Deferred execution and when the query actually runs 🔑
- [ ] `ToList()`/`ToArray()`/`ToDictionary()` — materialization
- [ ] 🏗 The classic mistake: calling `.ToList()` too early → the whole table in memory

### 1.5 Asynchrony

- [ ] 🔑 `async`/`await`/`Task<T>` — familiar syntax, different semantics 🔷
- [ ] A thread pool instead of an event loop: parallelism is real, not cooperative 🔑
- [ ] `Task` vs `Task<T>` vs `ValueTask<T>`
- [ ] `Task.WhenAll`, `Task.WhenAny`
- [ ] 🔑 `CancellationToken` — end-to-end cancellation, pass it everywhere 🏗
- [ ] Deadlocks and `ConfigureAwait(false)` — why this is no longer a problem in ASP.NET Core
- [ ] 🏗 "Async all the way" — never mix in `.Result`/`.Wait()` (deadlock!)
- [ ] `IAsyncEnumerable<T>` + `await foreach` — streaming
- [ ] `Parallel.ForEachAsync` — when you need parallelism rather than concurrency

### 1.6 Everything Else

- [ ] Exceptions: `try/catch/finally`, custom types, when to throw vs return a result 🏗
- [ ] 🔷 `using` / `IDisposable` / `IAsyncDisposable` — deterministic cleanup
- [ ] Attributes (`[Obsolete]`, `[HttpGet]`) 🅰️ — the equivalent of decorators
- [ ] Namespaces, file-scoped namespaces, `global using`
- [ ] 🏗 Conventions: `PascalCase` for methods/properties/classes, `_camelCase` for private fields, `I` prefix on interfaces
- [ ] Reflection — overview, just know it's there
- [ ] Overview: `Span<T>`, `Memory<T>` — high-performance code

### Part 1 Practice
- [ ] A console to-do app: a `record` task model, an in-memory list, LINQ filters, a console menu
- [ ] Rewrite it as async with persistence to a JSON file

---

## Part 2. The .NET Platform

- [ ] `Program.cs` and minimal hosting: `WebApplicationBuilder`, `builder.Build()`, `app.Run()`
- [ ] 🔑🅰️ The built-in DI container — conceptually identical to Angular's:

  | Angular | ASP.NET Core |
  |---|---|
  | `providedIn: 'root'` | `AddSingleton<T>()` |
  | a route/component-level provider | `AddScoped<T>()` (usually per HTTP request) |
  | a new instance every time | `AddTransient<T>()` |

- [ ] Registration: `AddSingleton`/`AddScoped`/`AddTransient`, interface → implementation
- [ ] 🔑 Captive dependencies: a Singleton holding a Scoped → bug. How to catch it (`ValidateScopes`)
- [ ] Constructor injection 🔷 *(in C# constructor injection is the norm, not legacy as it is in modern Angular)*
- [ ] `IServiceProvider`, `IServiceScopeFactory` — creating scopes manually in background jobs
- [ ] Configuration: `appsettings.json`, `appsettings.{Environment}.json`, env vars, precedence
- [ ] 🔑 The Options pattern: `IOptions<T>` / `IOptionsSnapshot<T>`, typed config instead of string keys 🏗
- [ ] User secrets in development (`dotnet user-secrets`) — secrets stay out of the repo 🏗
- [ ] Logging: `ILogger<T>`, levels, scopes, structured logs
- [ ] Serilog + JSON output 🏗
- [ ] `IHostedService` / `BackgroundService` — background work
- [ ] Environments: `ASPNETCORE_ENVIRONMENT`, `IsDevelopment()`

---

## Part 3. ASP.NET Core: Web API

### 3.1 The Pipeline

- [ ] 🔑🅰️ Middleware — a direct parallel to Angular's HTTP interceptors and Nest middleware
- [ ] `app.Use...` — order matters, a frequent source of bugs 🔑
- [ ] Custom middleware: how to write it and when it's the right tool
- [ ] Built-ins: `UseRouting`, `UseAuthentication`, `UseAuthorization`, `UseCors`, `UseHttpsRedirection`

### 3.2 Endpoints

- [ ] Controllers vs Minimal API — pick one and understand the trade-off 🏗
- [ ] `[ApiController]`, route attributes `[HttpGet("{id}")]` 🅰️
- [ ] Model binding: route/query/body/header, `[FromBody]`, `[FromQuery]`
- [ ] Validation: DataAnnotations vs **FluentValidation** 🏗
- [ ] 🔑 `ProblemDetails` (RFC 9457) — the standard error format instead of home-grown JSON 🏗
- [ ] Global error handling: `IExceptionHandler`, `UseExceptionHandler`
- [ ] `Results.Ok/Created/NotFound/BadRequest`, `ActionResult<T>` — which status code when 🏗
- [ ] Async actions and `CancellationToken` in the signature 🏗

### 3.3 Frontend Integration 🅰️

- [ ] 🔑 A CORS policy for `ng serve` (and why production should be stricter)
- [ ] OpenAPI/Swagger: `AddOpenApi()`, Scalar/Swagger UI
- [ ] 🔑 Generating a TS client for Angular: **NSwag** or **Kiota** 🏗
- [ ] The contract as the source of truth: change a C# DTO → regenerate the TS ⚛️
- [ ] Agreeing on formats: dates (ISO 8601, UTC), `camelCase` JSON, enums as strings 🏗
- [ ] `System.Text.Json`: serialization settings, `JsonSerializerOptions`

### 3.4 Extras

- [ ] API versioning
- [ ] Rate limiting (built into .NET)
- [ ] `OutputCache`, `ResponseCompression`
- [ ] File uploads with `IFormFile`, streaming large responses
- [ ] `IHttpClientFactory` — when your API calls other APIs
- [ ] Health checks: `/health/live`, `/health/ready`

### Part 3 Practice 🔑
- [ ] **Move `to-do-list` off json-server onto your own ASP.NET API** — the bridge task between the two tracks
- [ ] Configure CORS, verify the frontend works with no component changes
- [ ] Enable Swagger, generate the TS client, replace the hand-written `HttpClient` calls with it

---

## Part 4. EF Core

- [ ] `DbContext`, `DbSet<T>`, registering it in DI (`AddDbContext`)
- [ ] The Npgsql provider for PostgreSQL, the connection string
- [ ] Entity configuration: Fluent API vs Data Annotations 🏗
- [ ] 🔑 Migrations: `dotnet ef migrations add`, `database update`, how to read and review them
- [ ] Rolling back migrations, what to do with one that's already applied 🔑
- [ ] Relationships: one-to-many, many-to-many, cascade delete
- [ ] Navigation properties and foreign keys
- [ ] LINQ → SQL queries, `Include`/`ThenInclude`
- [ ] 🔑 The N+1 problem: how to see it (SQL logging) and how to fix it
- [ ] 🏗 `Select` projections into DTOs instead of loading whole entities
- [ ] 🔑 Change tracking, `AsNoTracking()` for read-only queries 🏗
- [ ] Transactions, `SaveChangesAsync`, unit of work out of the box
- [ ] 🔑 Optimistic concurrency: `RowVersion`/`xmin`, conflicting simultaneous edits
- [ ] Pagination: `Skip`/`Take` vs keyset pagination 🏗
- [ ] Seeding data
- [ ] Raw SQL when needed: `FromSql`, plus an overview of Dapper
- [ ] 🏗 What to commit: migrations yes, the database no

### Part 4 Practice
- [ ] Add PostgreSQL to Docker Compose
- [ ] Move the tasks API from in-memory to EF Core + Postgres
- [ ] Add a related entity (project → tasks), configure the relationship and cascade
- [ ] Catch an N+1 in your own logs and fix it with a projection

---

## Part 5. Backend Architecture 🏗

- [ ] Layers: `Api` → `Application` → `Domain` → `Infrastructure` — what lives where
- [ ] 🔑 DTOs vs domain entities — why you must not expose EF entities
- [ ] Mapping: by hand / Mapster / AutoMapper (and why many went back to by hand)
- [ ] Repository + Unit of Work: are they needed when EF is already both — know both sides of the argument 🔑
- [ ] CQRS and MediatR: when justified, when over-engineering
- [ ] **Vertical Slice Architecture** — the modern alternative to layers 🏗
- [ ] Validation at the boundary, invariants inside the domain
- [ ] A Result type vs exceptions for expected failures
- [ ] Idempotent operations
- [ ] 🅰️ Parallel: backend layers ↔ `core`/`shared`/`features` on the frontend — the same boundary principles

---

## Part 6. Authentication and Authorization

- [ ] ASP.NET Core Identity: the user schema, password hashing
- [ ] 🔑 JWT bearer: issuing, signing, validating, lifetimes
- [ ] Refresh tokens: storage, rotation, revocation 🔑
- [ ] 🔑 Cookie (httpOnly) vs Bearer in localStorage — the XSS/CSRF trade-offs 🏗
- [ ] Claims, roles, policy-based authorization
- [ ] `[Authorize]`, `[AllowAnonymous]`, resource-based policies (record owner) 🏗
- [ ] 🅰️ Parallel: `[Authorize]` ↔ `canActivate`/`canMatch` in Angular. But a frontend guard is UX, not protection 🔑
- [ ] External providers (Google/GitHub OAuth) — optional
- [ ] Rate limiting on login, brute-force protection 🏗

### Part 6 Practice
- [ ] Registration/login with JWT in DevLog
- [ ] Wire it to the `authInterceptor` in Angular (Angular roadmap, Part 6)
- [ ] Verify other users' tasks are unreachable even via a direct API call

---

## Part 7. Realtime and Background Work

- [ ] 🔑 SignalR: hubs, methods, groups
- [ ] Authorizing SignalR connections
- [ ] The Angular client `@microsoft/signalr` → bridged into signals 🅰️
- [ ] Reconnection, connection state, message idempotency 🏗
- [ ] Scaling SignalR (backplane) — overview
- [ ] `BackgroundService`: due-date reminders
- [ ] Overview: Hangfire / Quartz / queues (RabbitMQ)

---

## Part 8. Testing

- [ ] xUnit: test structure, `Fact`, `Theory`, `InlineData`, fixtures
- [ ] Mocks: **NSubstitute** (or Moq) 🅰️ *(the same role provider swapping plays in Angular's TestBed)*
- [ ] FluentAssertions — readable assertions
- [ ] 🔑 Integration tests: `WebApplicationFactory<Program>` — the whole app in memory
- [ ] 🔑 **Testcontainers** — a real PostgreSQL in Docker for tests 🏗
- [ ] Test isolation, resetting the database between tests
- [ ] Testing authorization (forging tokens in tests)
- [ ] 🏗 What to cover: domain logic and endpoints. What not to: EF mapping, DTOs
- [ ] Coverage and sensible thresholds

---

## Part 9. Production and Operations

- [ ] `dotnet publish`, framework-dependent vs self-contained, AOT — overview
- [ ] A multi-stage Dockerfile for .NET 🏗
- [ ] Docker Compose: API + Postgres + frontend
- [ ] Overview: **.NET Aspire** — orchestrating the dev environment with one command
- [ ] Health checks and readiness/liveness probes
- [ ] OpenTelemetry: tracing, metrics, logs
- [ ] 🔑 Database migrations in CI/CD: applying them safely, zero-downtime
- [ ] Configuration and secrets in production (env vars / vault) 🏗
- [ ] Performance: connection pooling, caching (`IMemoryCache`, `HybridCache`)
- [ ] CI: `dotnet build` + `dotnet test` in GitHub Actions

---

## Part 10. C# Best Practices 🏗

- [ ] Async all the way, never `.Result`/`.Wait()` 🔑
- [ ] Thread `CancellationToken` through every layer 🔑
- [ ] Nullable reference types enabled, `!` only deliberately
- [ ] `readonly` wherever possible, immutable DTOs as `record`
- [ ] Never expose EF entities 🔑
- [ ] Validate at the API boundary
- [ ] `ProblemDetails` for every error
- [ ] Log structurally, not with string concatenation
- [ ] Don't catch `Exception` without cause, don't swallow exceptions
- [ ] UTC everywhere, `DateTimeOffset` over `DateTime` 🔑
- [ ] `decimal` for money 🔑
- [ ] Code analyzers: `TreatWarningsAsErrors`, `.editorconfig`, StyleCop — overview
- [ ] The official [C# coding conventions](https://learn.microsoft.com/dotnet/csharp/fundamentals/coding-style/coding-conventions)

---

## Appendix A. TypeScript/Nest/Angular → C#/ASP.NET Cheat Sheet 🔷

| TS / NestJS / Angular | C# / ASP.NET Core |
|---|---|
| `interface Foo {}` (erased) | `interface IFoo` / `record Foo` (exists at runtime) |
| `type Dto = { ... }` | `record Dto(string Title, bool Done);` |
| `string \| null` | `string?` + `<Nullable>enable</Nullable>` |
| `Promise<T>` | `Task<T>` |
| `async/await` (event loop) | `async/await` (thread pool) |
| `AbortController` | `CancellationToken` (threaded through, expected) |
| array methods (`.map`/`.filter`) | LINQ (`Select`/`Where`) |
| `npm i` / `package.json` | `dotnet add package` / `.csproj` |
| Nest `@Module` + `providers` | `builder.Services.Add*` in `Program.cs` |
| Angular `providedIn: 'root'` | `AddSingleton<T>()` |
| a route-level provider | `AddScoped<T>()` |
| a new instance every time | `AddTransient<T>()` |
| Nest middleware / Angular interceptor | ASP.NET middleware (`app.Use...`) |
| Nest `@UseGuards` / Angular `canActivate` | `[Authorize]` + policies |
| Nest `@Controller` / `@Get` | `[ApiController]` / `[HttpGet]` |
| Nest DTO + `class-validator` | DTO + DataAnnotations / FluentValidation |
| Nest exception filter | `IExceptionHandler` + `ProblemDetails` |
| Prisma schema + `prisma migrate` | EF Core `DbContext` + `dotnet ef migrations` |
| Prisma `include` | EF `Include` / `ThenInclude` |
| `.env` | `appsettings.json` + user secrets + env vars |
| Jest / Vitest | xUnit + NSubstitute + FluentAssertions |
| supertest | `WebApplicationFactory<Program>` |
| Nest WebSocket gateway | SignalR Hub |
| a shared TS types package | an OpenAPI schema → generated TS client |

## Appendix B. Resources

- [learn.microsoft.com/dotnet](https://learn.microsoft.com/dotnet) — official docs and free courses
- [learn.microsoft.com/aspnet/core](https://learn.microsoft.com/aspnet/core) — ASP.NET Core
- [learn.microsoft.com/ef/core](https://learn.microsoft.com/ef/core) — EF Core
- [C# language reference](https://learn.microsoft.com/dotnet/csharp/)
- [C# coding conventions](https://learn.microsoft.com/dotnet/csharp/fundamentals/coding-style/coding-conventions)
- [.NET Aspire](https://learn.microsoft.com/dotnet/aspire/)
- [Testcontainers for .NET](https://dotnet.testcontainers.org/)
- [NSwag](https://github.com/RicoSuter/NSwag) / [Kiota](https://learn.microsoft.com/openapi/kiota/) — client generation
- "Pro ASP.NET Core" (Adam Freeman), "C# in Depth" (Jon Skeet) — books

---

## Progress Log

| Date | What was covered | With | Notes |
|---|---|---|---|
| | | | |
