# C# / ASP.NET Core Roadmap: от нуля до продвинутого уровня

> Параллельный трек к [ANGULAR_ROADMAP.md](./ANGULAR_ROADMAP.md). Опыт на входе: TypeScript, NestJS, Angular.
> Общий пет-проект: **DevLog** (см. Часть 15 в Angular-роадмапе).

## Как пользоваться

Статусы пунктов — те же, что в Angular-роадмапе:

| Метка | Значение |
|---|---|
| `- [ ]` | не пройдено |
| `- [~]` | в процессе |
| `- [x]` | пройдено с Claude — разобрано и подтверждено |
| `- [c]` | **пройдено с Copilot — ждёт ревью от Claude** |
| `- [x]` 🔄 | пройдено с Copilot и **проверено** Claude |

**Значки:** 🔑 критично · 🔷 принципиальное отличие от TypeScript · 🏗 best practice · 🅰️ прямая параллель с Angular/Nest (уже знаешь концепцию, меняется синтаксис)

**Правило коммитов:** один пункт (или логичная группа) = один коммит. См. [ANGULAR_ROADMAP.md → Приложение Б](./ANGULAR_ROADMAP.md#приложение-б-работа-с-несколькими-ии-ассистентами-).

---

## Когда начинать этот трек 🔑

**Не сейчас, если ты только начал Angular.** Подробное обоснование — в [README.md](./README.md#порядок-двух-треков), кратко:

- **Фаза A** *(сейчас)* — только Angular, Части 1–7. Два незнакомых языка одновременно дают интерференцию, а не ускорение.
- **Фаза B** *(старт этого трека)* — Части 0–4 отсюда, на задаче «перенести to-do-list с json-server на свой ASP.NET API». Домен уже знаком → всё внимание на язык.
- **Фаза C** — DevLog, чередование по вертикалям: бэкенд фичи → фронтенд фичи.

**Сигнал к старту Фазы B:** добавление новой сущности в `to-do-list` (например, «проекты») не вызывает вопроса «а как это вообще делается в Angular».

**Исключение:** если на работе появился дедлайн по C# — переворачивай приоритет, начинай Часть 1 немедленно, а Angular переводи в режим поддержания (только практика уже пройденного).

---

## Часть 0. Setup

- [ ] Поставить актуальный .NET SDK (LTS) — сейчас в системе `8.0.130`, нужен .NET 10
- [ ] `dotnet --info`, `dotnet --list-sdks` — понять, что установлено
- [ ] Выбрать IDE: **Rider** (мощнее, платный/бесплатный для некоммерческого) или **VS Code + C# Dev Kit**
- [ ] `dotnet new console` → `dotnet run` — первый запуск
- [ ] Разобраться в структуре: `.csproj`, `.sln`, `Program.cs`
- [ ] `dotnet new list` — какие шаблоны бывают
- [ ] NuGet вместо npm: `dotnet add package`, где кэш, что коммитить 🔷
- [ ] `dotnet watch` — hot reload
- [ ] `dotnet format` + `.editorconfig` — форматирование 🏗

---

## Часть 1. Язык C# для TypeScript-разработчика

### 1.1 Фундаментальные отличия 🔷

- [ ] 🔑 Типы существуют в рантайме — не стираются, как в TS. Отсюда рефлексия, дженерики «по-настоящему», атрибуты
- [ ] Компиляция в IL → JIT. Что такое CLR, runtime, GC
- [ ] 🔑 Value types vs reference types: `struct` vs `class`, стек и куча, копирование по значению
- [ ] `null` и Nullable Reference Types: `<Nullable>enable</Nullable>`, `string?`, оператор `!` 🏗
- [ ] Почему `string` — ссылочный, но ведёт себя как значение (иммутабельность)
- [ ] Boxing/unboxing — и почему это влияет на производительность

### 1.2 Базовый синтаксис

- [ ] Типы: `int`, `long`, `decimal` vs `double` (деньги — всегда `decimal`! 🏗), `bool`, `char`, `string`
- [ ] `var`, target-typed `new()`, `const` vs `readonly`
- [ ] Строки: интерполяция `$"..."`, `StringBuilder`, raw string literals `"""..."""`
- [ ] Массивы, `List<T>`, `Dictionary<K,V>`, `HashSet<T>`, collection expressions `[1, 2, 3]`
- [ ] Циклы, `foreach`, `switch`-выражения
- [ ] 🔑 Pattern matching: `is`, `switch` с паттернами, деконструкция, property patterns
- [ ] Тернарник, `??`, `??=`, `?.`

### 1.3 ООП в C#

- [ ] Классы: поля, свойства (`get`/`set`/`init`), конструкторы, primary constructors
- [ ] `required` члены
- [ ] 🔑 `record` и `record struct` — иммутабельность, value equality, `with`-выражения (идеально для DTO)
- [ ] Модификаторы доступа: `public`, `private`, `protected`, `internal` 🔷
- [ ] Наследование, `virtual`/`override`/`abstract`/`sealed` — в C# это живой инструмент, а не редкость 🔷
- [ ] Интерфейсы, явная реализация, default implementations
- [ ] 🅰️ Интерфейс как контракт для DI — знакомо по Nest/Angular
- [ ] Статические классы и члены
- [ ] `enum` и флаги
- [ ] Перегрузка операторов, `IEquatable<T>`, `IComparable<T>`
- [ ] 🔷 Extension methods — добавить метод к чужому типу (в TS так нельзя)
- [ ] Дженерики: `class Repo<T>`, ограничения `where T : class, new()`
- [ ] Ковариантность/контравариантность — обзорно, для чтения чужого кода

### 1.4 LINQ 🔑

Самая приятная часть языка. Похоже на методы массива, но работает и над БД.

- [ ] `Where`, `Select`, `SelectMany`, `OrderBy`/`ThenBy`
- [ ] `First`/`FirstOrDefault`/`Single`/`SingleOrDefault` — и разница между ними 🔑
- [ ] `Any`, `All`, `Count`, `Sum`, `Average`, `Min`, `Max`
- [ ] `GroupBy`, `Join`, `Distinct`, `Take`/`Skip`
- [ ] Query syntax (`from x in ...`) vs method syntax — знать оба, писать method
- [ ] 🔑 `IEnumerable<T>` vs `IQueryable<T>` — второе транслируется в SQL
- [ ] Ленивость (deferred execution) и когда запрос реально выполняется 🔑
- [ ] `ToList()`/`ToArray()`/`ToDictionary()` — материализация
- [ ] 🏗 Типичная ошибка: `.ToList()` слишком рано → вся таблица в памяти

### 1.5 Асинхронность

- [ ] 🔑 `async`/`await`/`Task<T>` — синтаксис знаком, семантика другая 🔷
- [ ] Пул потоков вместо event loop: параллелизм настоящий, а не кооперативный 🔑
- [ ] `Task` vs `Task<T>` vs `ValueTask<T>`
- [ ] `Task.WhenAll`, `Task.WhenAny`
- [ ] 🔑 `CancellationToken` — сквозная отмена, прокидывать везде 🏗
- [ ] Дедлоки и `ConfigureAwait(false)` — почему в ASP.NET Core это уже не проблема
- [ ] 🏗 «Async all the way» — не смешивать с `.Result`/`.Wait()` (дедлок!)
- [ ] `IAsyncEnumerable<T>` + `await foreach` — стриминг
- [ ] `Parallel.ForEachAsync` — когда нужен параллелизм, а не конкурентность

### 1.6 Прочее

- [ ] Исключения: `try/catch/finally`, свои типы, когда бросать, когда возвращать результат 🏗
- [ ] 🔷 `using` / `IDisposable` / `IAsyncDisposable` — детерминированное освобождение
- [ ] Атрибуты (`[Obsolete]`, `[HttpGet]`) 🅰️ — аналог декораторов
- [ ] Namespaces, file-scoped namespaces, `global using`
- [ ] 🏗 Соглашения: `PascalCase` для методов/свойств/классов, `_camelCase` для приватных полей, `I` перед интерфейсами
- [ ] Рефлексия — обзорно, знать что есть
- [ ] Обзорно: `Span<T>`, `Memory<T>` — высокопроизводительный код

### Практика Части 1
- [ ] Консольный to-do: модель `Task` как `record`, список в памяти, LINQ-фильтры, меню в консоли
- [ ] Переписать его на асинхронный вариант с сохранением в JSON-файл

---

## Часть 2. Платформа .NET

- [ ] `Program.cs` и minimal hosting: `WebApplicationBuilder`, `builder.Build()`, `app.Run()`
- [ ] 🔑🅰️ Встроенный DI-контейнер — концептуально идентичен ангуляровскому:

  | Angular | ASP.NET Core |
  |---|---|
  | `providedIn: 'root'` | `AddSingleton<T>()` |
  | провайдер на маршрут/компонент | `AddScoped<T>()` (обычно = на HTTP-запрос) |
  | новый инстанс каждый раз | `AddTransient<T>()` |

- [ ] Регистрация: `AddSingleton`/`AddScoped`/`AddTransient`, интерфейс → реализация
- [ ] 🔑 Captive dependency: Singleton держит Scoped → баг. Как ловить (`ValidateScopes`)
- [ ] Constructor injection 🔷 *(в C# инъекция через конструктор — норма, а не легаси, как в новом Angular)*
- [ ] `IServiceProvider`, `IServiceScopeFactory` — ручное создание скоупов в фоновых задачах
- [ ] Конфигурация: `appsettings.json`, `appsettings.{Environment}.json`, env vars, приоритеты
- [ ] 🔑 Options pattern: `IOptions<T>` / `IOptionsSnapshot<T>`, типизированный конфиг 🏗
- [ ] User secrets в деве (`dotnet user-secrets`) — секреты не в репозитории 🏗
- [ ] Логирование: `ILogger<T>`, уровни, scopes, структурированные логи
- [ ] Serilog + вывод в JSON 🏗
- [ ] `IHostedService` / `BackgroundService` — фоновые задачи
- [ ] Environments: `ASPNETCORE_ENVIRONMENT`, `IsDevelopment()`

---

## Часть 3. ASP.NET Core: Web API

### 3.1 Пайплайн

- [ ] 🔑🅰️ Middleware — прямая аналогия с HTTP-интерцепторами Angular и middleware Nest
- [ ] `app.Use...` — порядок имеет значение, частый источник багов 🔑
- [ ] Своё middleware: как написать и когда это правильный инструмент
- [ ] Встроенные: `UseRouting`, `UseAuthentication`, `UseAuthorization`, `UseCors`, `UseHttpsRedirection`

### 3.2 Эндпоинты

- [ ] Controllers vs Minimal API — выбрать и понимать trade-off 🏗
- [ ] `[ApiController]`, атрибуты маршрутов `[HttpGet("{id}")]` 🅰️
- [ ] Model binding: route/query/body/header, `[FromBody]`, `[FromQuery]`
- [ ] Валидация: DataAnnotations vs **FluentValidation** 🏗
- [ ] 🔑 `ProblemDetails` (RFC 9457) — стандартный формат ошибок вместо самодельных JSON 🏗
- [ ] Глобальная обработка ошибок: `IExceptionHandler`, `UseExceptionHandler`
- [ ] `Results.Ok/Created/NotFound/BadRequest`, `ActionResult<T>` — какой код когда 🏗
- [ ] Асинхронные экшены и `CancellationToken` в сигнатуре 🏗

### 3.3 Интеграция с фронтендом 🅰️

- [ ] 🔑 CORS-политика для `ng serve` (и почему в проде она должна быть строже)
- [ ] OpenAPI/Swagger: `AddOpenApi()`, Scalar/Swagger UI
- [ ] 🔑 Генерация TS-клиента для Angular: **NSwag** или **Kiota** 🏗
- [ ] Контракт как источник правды: изменил C#-DTO → перегенерировал TS ⚛️
- [ ] Согласование форматов: даты (ISO 8601, UTC), `camelCase` в JSON, enum как строки 🏗
- [ ] `System.Text.Json`: настройки сериализации, `JsonSerializerOptions`

### 3.4 Дополнительно

- [ ] Версионирование API
- [ ] Rate limiting (встроенный в .NET)
- [ ] `OutputCache`, `ResponseCompression`
- [ ] Загрузка файлов `IFormFile`, стриминг больших ответов
- [ ] `IHttpClientFactory` — если API ходит в другие API
- [ ] Health checks: `/health/live`, `/health/ready`

### Практика Части 3 🔑
- [ ] **Перенести `to-do-list` с json-server на свой ASP.NET API** — главная связующая задача двух треков
- [ ] Настроить CORS, проверить что фронт работает без изменений в компонентах
- [ ] Включить Swagger, сгенерировать TS-клиент, заменить им ручные вызовы `HttpClient`

---

## Часть 4. EF Core

- [ ] `DbContext`, `DbSet<T>`, регистрация в DI (`AddDbContext`)
- [ ] Провайдер Npgsql для PostgreSQL, строка подключения
- [ ] Конфигурация сущностей: Fluent API vs Data Annotations 🏗
- [ ] 🔑 Миграции: `dotnet ef migrations add`, `database update`, как их читать и ревьюить
- [ ] Откат миграций, что делать с уже применённой миграцией 🔑
- [ ] Связи: 1-к-многим, многие-ко-многим, каскадное удаление
- [ ] Навигационные свойства и внешние ключи
- [ ] Запросы LINQ → SQL, `Include`/`ThenInclude`
- [ ] 🔑 Проблема N+1: как увидеть (логирование SQL) и как лечить
- [ ] 🏗 Проекции `Select` в DTO вместо загрузки целых сущностей
- [ ] 🔑 Change tracking, `AsNoTracking()` для read-only запросов 🏗
- [ ] Транзакции, `SaveChangesAsync`, unit of work «из коробки»
- [ ] 🔑 Optimistic concurrency: `RowVersion`/`xmin`, конфликты одновременных правок
- [ ] Пагинация: `Skip`/`Take` vs keyset-пагинация 🏗
- [ ] Сидинг данных
- [ ] Raw SQL когда нужно: `FromSql`, и обзорно Dapper
- [ ] 🏗 Что коммитить: миграции — да, база — нет

### Практика Части 4
- [ ] Подключить PostgreSQL в Docker Compose
- [ ] Перевести API задач с in-memory на EF Core + Postgres
- [ ] Добавить связанную сущность (проект → задачи), настроить связи и каскад
- [ ] Поймать у себя N+1 в логах и починить проекцией

---

## Часть 5. Архитектура серверного приложения 🏗

- [ ] Слои: `Api` → `Application` → `Domain` → `Infrastructure` — что где живёт
- [ ] 🔑 DTO vs доменные сущности — почему нельзя отдавать EF-сущности наружу
- [ ] Маппинг: вручную / Mapster / AutoMapper (и почему многие вернулись к рукам)
- [ ] Repository + Unit of Work: нужны ли, если EF уже и то и другое — знать аргументы обеих сторон 🔑
- [ ] CQRS и MediatR: когда оправдано, когда оверинжиниринг
- [ ] **Vertical Slice Architecture** — современная альтернатива слоям 🏗
- [ ] Валидация на границе, инварианты внутри домена
- [ ] Result-тип vs исключения для ожидаемых ошибок
- [ ] Идемпотентность операций
- [ ] 🅰️ Параллель: слои бэкенда ↔ `core`/`shared`/`features` во фронте — те же принципы границ

---

## Часть 6. Аутентификация и авторизация

- [ ] ASP.NET Core Identity: схема пользователей, хеширование паролей
- [ ] 🔑 JWT bearer: выпуск, подпись, валидация, время жизни
- [ ] Refresh-токены: хранение, ротация, отзыв 🔑
- [ ] 🔑 Cookie (httpOnly) vs Bearer в localStorage — риски XSS/CSRF 🏗
- [ ] Claims, роли, policy-based authorization
- [ ] `[Authorize]`, `[AllowAnonymous]`, политики по ресурсу (владелец записи) 🏗
- [ ] 🅰️ Параллель: `[Authorize]` ↔ `canActivate`/`canMatch` в Angular. Но фронтовый guard — это UX, а не защита 🔑
- [ ] Внешние провайдеры (Google/GitHub OAuth) — опционально
- [ ] Rate limiting на логине, защита от брутфорса 🏗

### Практика Части 6
- [ ] Регистрация/логин с JWT в DevLog
- [ ] Связка с `authInterceptor` в Angular (Часть 6 Angular-роадмапа)
- [ ] Проверить, что чужие задачи недоступны даже при прямом запросе к API

---

## Часть 7. Realtime и фоновая работа

- [ ] 🔑 SignalR: хабы, методы, группы
- [ ] Авторизация SignalR-подключений
- [ ] Angular-клиент `@microsoft/signalr` → мост в сигналы 🅰️
- [ ] Переподключение, состояние соединения, идемпотентность сообщений 🏗
- [ ] Масштабирование SignalR (backplane) — обзорно
- [ ] `BackgroundService`: напоминания о дедлайнах
- [ ] Обзорно: Hangfire / Quartz / очереди (RabbitMQ)

---

## Часть 8. Тестирование

- [ ] xUnit: `Fact`, `Theory`, `InlineData`, фикстуры
- [ ] Моки: **NSubstitute** (или Moq) 🅰️ *(в Angular ту же роль играет подмена провайдера в TestBed)*
- [ ] FluentAssertions — читаемые проверки
- [ ] 🔑 Интеграционные тесты: `WebApplicationFactory<Program>` — всё приложение в памяти
- [ ] 🔑 **Testcontainers** — настоящий PostgreSQL в Docker для тестов 🏗
- [ ] Изоляция тестов, сброс БД между тестами
- [ ] Тестирование авторизации (подделка токенов в тестах)
- [ ] 🏗 Что покрывать: доменную логику и эндпоинты. Что нет: EF-маппинг, DTO
- [ ] Coverage и разумные пороги

---

## Часть 9. Прод и эксплуатация

- [ ] `dotnet publish`, framework-dependent vs self-contained, AOT — обзорно
- [ ] Multi-stage Dockerfile для .NET 🏗
- [ ] Docker Compose: API + Postgres + фронт
- [ ] Обзорно: **.NET Aspire** — оркестрация дев-окружения одной командой
- [ ] Health checks и readiness/liveness пробы
- [ ] OpenTelemetry: трейсинг, метрики, логи
- [ ] 🔑 Миграции БД в CI/CD: как накатывать безопасно, zero-downtime
- [ ] Конфигурация и секреты в проде (env vars / vault) 🏗
- [ ] Производительность: connection pooling, кэширование (`IMemoryCache`, `HybridCache`)
- [ ] CI: `dotnet build` + `dotnet test` в GitHub Actions

---

## Часть 10. Best practices C# 🏗

- [ ] Async all the way, никогда `.Result`/`.Wait()` 🔑
- [ ] `CancellationToken` прокидывать сквозь все слои 🔑
- [ ] Nullable reference types включены, `!` — только осознанно
- [ ] `readonly` где возможно, иммутабельные DTO как `record`
- [ ] Не отдавать наружу EF-сущности 🔑
- [ ] Валидация на границе API
- [ ] `ProblemDetails` для всех ошибок
- [ ] Логировать структурно, не строками конкатенации
- [ ] Не ловить `Exception` без нужды, не глотать исключения
- [ ] UTC везде, `DateTimeOffset` вместо `DateTime` 🔑
- [ ] `decimal` для денег 🔑
- [ ] Анализаторы кода: `TreatWarningsAsErrors`, `.editorconfig`, StyleCop — обзорно
- [ ] Официальные [C# coding conventions](https://learn.microsoft.com/dotnet/csharp/fundamentals/coding-style/coding-conventions)

---

## Приложение А. Шпаргалка TypeScript/Nest/Angular → C#/ASP.NET 🔷

| TS / NestJS / Angular | C# / ASP.NET Core |
|---|---|
| `interface Foo {}` (стирается) | `interface IFoo` / `record Foo` (живёт в рантайме) |
| `type Dto = { ... }` | `record Dto(string Title, bool Done);` |
| `string \| null` | `string?` + `<Nullable>enable</Nullable>` |
| `Promise<T>` | `Task<T>` |
| `async/await` (event loop) | `async/await` (пул потоков) |
| `AbortController` | `CancellationToken` (сквозной, обязателен) |
| методы массива (`.map`/`.filter`) | LINQ (`Select`/`Where`) |
| `npm i` / `package.json` | `dotnet add package` / `.csproj` |
| Nest `@Module` + `providers` | `builder.Services.Add*` в `Program.cs` |
| Angular `providedIn: 'root'` | `AddSingleton<T>()` |
| провайдер на маршрут | `AddScoped<T>()` |
| новый инстанс каждый раз | `AddTransient<T>()` |
| Nest middleware / Angular interceptor | ASP.NET middleware (`app.Use...`) |
| Nest `@UseGuards` / Angular `canActivate` | `[Authorize]` + policies |
| Nest `@Controller` / `@Get` | `[ApiController]` / `[HttpGet]` |
| Nest DTO + `class-validator` | DTO + DataAnnotations / FluentValidation |
| Nest exception filter | `IExceptionHandler` + `ProblemDetails` |
| Prisma schema + `prisma migrate` | EF Core `DbContext` + `dotnet ef migrations` |
| Prisma `include` | EF `Include` / `ThenInclude` |
| `.env` | `appsettings.json` + user-secrets + env vars |
| Jest / Vitest | xUnit + NSubstitute + FluentAssertions |
| supertest | `WebApplicationFactory<Program>` |
| Nest WebSocket gateway | SignalR Hub |
| общий TS-пакет с типами | OpenAPI-схема → генерация TS-клиента |

## Приложение Б. Ресурсы

- [learn.microsoft.com/dotnet](https://learn.microsoft.com/dotnet) — официальная документация и бесплатные курсы
- [learn.microsoft.com/aspnet/core](https://learn.microsoft.com/aspnet/core) — ASP.NET Core
- [learn.microsoft.com/ef/core](https://learn.microsoft.com/ef/core) — EF Core
- [C# language reference](https://learn.microsoft.com/dotnet/csharp/) — справочник по языку
- [C# coding conventions](https://learn.microsoft.com/dotnet/csharp/fundamentals/coding-style/coding-conventions)
- [.NET Aspire](https://learn.microsoft.com/dotnet/aspire/)
- [Testcontainers for .NET](https://dotnet.testcontainers.org/)
- [NSwag](https://github.com/RicoSuter/NSwag) / [Kiota](https://learn.microsoft.com/openapi/kiota/) — генерация клиента
- «Pro ASP.NET Core» (Adam Freeman), «C# in Depth» (Jon Skeet) — книги

---

## Дневник прогресса

| Дата | Что пройдено | С кем | Заметки |
|---|---|---|---|
| | | | |
