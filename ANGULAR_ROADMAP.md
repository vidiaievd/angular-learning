# Angular + ASP.NET Roadmap: от основ до продвинутого уровня

> Персональный план изучения **Angular 21** (основной трек) и **C# / ASP.NET Core** (параллельный трек)
> с учётом опыта в React / Next.js / NestJS / TypeScript.
> Проект-песочница: `to-do-list/` · Финальный пет-проект: `devlog/` (см. Части 15–16)

## Как пользоваться

**Статусы пунктов:**

| Метка | Значение |
|---|---|
| `- [ ]` | не пройдено |
| `- [~]` | в процессе |
| `- [x]` | пройдено с Claude — разобрано и подтверждено |
| `- [c]` | **пройдено с Copilot — ждёт ревью от Claude** |
| `- [x]` 🔄 | пройдено с Copilot и **проверено** Claude (ревью прошло) |

Пункт со статусом `[c]` считается закрытым только после ревью — см. Приложение В, раздел «Режим двух ассистентов».

- Каждый пункт = маленькая практическая задача, а не «прочитать статью».
- Пункты со значком 🔑 — концепции, без которых дальше идти бессмысленно.
- Пункты со значком ⚛️ — там, где Angular принципиально отличается от React (главные точки переучивания).
- Пункты со значком 🔷 — там, где C# принципиально отличается от TypeScript.
- Пункты со значком 🏗 — best practice / архитектурное правило, а не фича фреймворка.

**Два трека.** Части 0–14 — Angular. Часть 16 — C#/ASP.NET Core. Часть 15 (пет-проект DevLog) — место, где они сходятся: каждый этап проекта закрывает пункты из обоих треков сразу.

**Рекомендуемый порядок:** пройти Части 1–7 по Angular (чтобы фронт перестал быть узким местом) → параллельно начать 16.1–16.3 по C# → на практике «переезда to-do-list с json-server на свой ASP.NET API» связать их → дальше идти этапами DevLog, добирая теорию из обоих треков по мере надобности.

**Важно про текущий сетап:** приложение создано в *zoneless*-режиме (нет `zone.js`), билдер — `@angular/build` (Vite под капотом), тесты — Vitest, SSR включён. Это значит: реактивность держится **на сигналах**, а не на «магии» Zone.js — что сильно ближе к React-модели, чем классический Angular из туториалов 2020 года. Старые статьи с `NgModule`, `*ngIf`, `ChangeDetectionStrategy.OnPush` как обязательным приёмом — читай с поправкой на это.

---

## Часть 0. Уже пройдено ✅

Фундамент, который мы прошли в `to-do-list/`.

- [x] Инициализация приложения через Angular CLI (`ng new`)
- [x] 🔑 Сигналы: `signal()`, чтение как вызов функции, `.set()`, `.update()`
- [x] Иммутабельные обновления сигналов (`map`/`filter`/spread вместо мутации)
- [x] `@Component`: `selector`, `imports`, `templateUrl`, `styleUrl` ⚛️ *(метаданных у React-компонента просто нет)*
- [x] Standalone-компоненты и явный массив `imports` ⚛️ *(в React импорта в файл достаточно; тут компонент/директиву надо ещё и «зарегистрировать» в `imports`)*
- [x] Интерполяция `{{ }}`
- [x] Property binding `[prop]="value"` и event binding `(event)="handler()"`
- [x] Control flow в шаблоне: `@for (... ; track ...)` ⚛️ *(`track` обязателен — аналог `key`)*
- [x] `input.required<T>()` — входные данные (props)
- [x] `output<T>()` + `.emit(value)` — исходящие события (callbacks), `$event` в шаблоне
- [x] Разделение smart / dumb компонентов (`TaskList` владеет данными, `TaskItem` только рисует) 🏗
- [x] Reactive Forms: `FormBuilder`, `form.group()`, `Validators.required`, `[formGroup]`, `formControlName`, `(ngSubmit)`
- [x] Роутинг: `Routes`, `provideRouter`, `<router-outlet />`, `routerLink`
- [x] Организация `pages/` (роутовые компоненты) vs `features/` (переиспользуемые фичи) 🏗
- [x] 🔑 Dependency Injection: `@Injectable({ providedIn: 'root' })`, `inject()`
- [x] Вынос состояния в сервис-синглтон как shared state ⚛️ *(аналог Zustand/Context, но встроен во фреймворк)*
- [x] `provideHttpClient()`, `HttpClient` (`get`/`post`/`patch`/`delete`)
- [x] `httpResource()` — signal-based загрузка данных, `.value()`, `.reload()`
- [x] Первое знакомство с Observable и `.subscribe()`
- [x] Локальный фейковый REST API на `json-server`

---

## Часть 1. Основы: закрыть пробелы

Всё, что рядом с уже пройденным, но мы пропустили.

### 1.1 Шаблоны

- [ ] `@if` / `@else if` / `@else` — условный рендер
- [ ] `@switch` / `@case` / `@default`
- [ ] `@empty` внутри `@for` — состояние пустого списка
- [ ] Переменные `@for`: `$index`, `$first`, `$last`, `$even`, `$odd`, `$count`
- [ ] `@let` — локальная переменная в шаблоне (чтобы не звать `store.foo().bar` пять раз)
- [ ] Template reference variables: `<input #nameInput>` и обращение `nameInput.value` ⚛️ *(грубый аналог `ref`, но работает прямо в шаблоне)*
- [ ] Два вида биндинга атрибутов: `[class.active]="isActive()"`, `[style.width.px]="w()"`, `[attr.aria-label]="..."`
- [ ] Разница `[attr.disabled]` vs `[disabled]` (атрибут HTML vs свойство DOM) ⚛️
- [ ] 🏗 Правило: **никакой тяжёлой логики в шаблоне** — `{{ tasks().filter(...).length }}` заменить на `computed()` (см. 2.1). В нашем `about.html` сейчас как раз анти-паттерн — исправить.

### 1.2 Компоненты

- [ ] `input()` с default-значением и трансформацией: `input(0, { transform: numberAttribute })`
- [ ] Алиасы входов/выходов: `input(0, { alias: 'value' })`
- [ ] 🔑 `model()` — двусторонний биндинг `[(value)]` (banana-in-a-box) ⚛️ *(в React такого нет вообще — только value + onChange вручную)*
- [ ] `host` в `@Component` — биндинги и слушатели на самом хост-элементе
- [ ] Инлайновые `template` / `styles` — когда уместно (маленькие компоненты)
- [ ] 🔑 View encapsulation: почему стили компонента не «протекают» наружу и как это устроено (эмуляция Shadow DOM атрибутами)
- [ ] `ViewEncapsulation.None` — когда осознанно нужно и почему это опасно
- [ ] `:host` и `:host-context()` селекторы в CSS компонента
- [ ] 🏗 Соглашения об именовании файлов Angular 21 (`task-list.ts`, а не `task-list.component.ts`) и что старые гайды пишут иначе

### 1.3 Жизненный цикл

- [ ] `ngOnInit` — и почему в signal-эпоху он нужен реже, чем раньше ⚛️
- [ ] `ngOnDestroy` и `DestroyRef` + `takeUntilDestroyed()` для отписок
- [ ] `ngOnChanges` — и почему `input()` + `computed()`/`effect()` его вытесняют
- [ ] `afterNextRender()` / `afterEveryRender()` — работа с DOM и браузерными API (важно при SSR!)
- [ ] 🏗 Правило: не лезь в DOM руками, пока не исчерпал биндинги

### Практика Части 1
- [ ] Добавить в `to-do-list` фильтр «Все / Активные / Выполненные» через `@if`/`@switch`
- [ ] Показать `@empty`-состояние («Задач пока нет»)
- [ ] Вынести подсчёты из `about.html` в `computed()` внутри `TaskStore`

---

## Часть 2. Сигналы и реактивность (ядро современного Angular) 🔑

Самая важная часть. В zoneless-приложении сигналы — это буквально движок отрисовки.

- [ ] 🔑 `computed()` — производное значение, пересчитывается лениво и кэшируется ⚛️ *(аналог `useMemo`, но без массива зависимостей — граф строится автоматически)*
- [ ] Почему `computed` **не должен** иметь побочных эффектов
- [ ] 🔑 `effect()` — реакция на изменения ⚛️ *(похоже на `useEffect`, но зависимости тоже собираются автоматически, и он не про «после рендера»)*
- [ ] Когда `effect()` — правильный инструмент, а когда это code smell (логирование, синхронизация с localStorage — да; вычисление состояния — нет)
- [ ] Очистка в `effect()` через `onCleanup`
- [ ] `untracked()` — прочитать сигнал, не подписываясь на него
- [ ] 🔑 `linkedSignal()` — writable-сигнал, который сбрасывается при изменении источника (например, выбранный элемент при смене списка)
- [ ] `signal.asReadonly()` — 🏗 отдавать наружу read-only, менять только через методы сервиса
- [ ] Равенство сигналов: параметр `equal`, почему объекты по умолчанию сравниваются по ссылке
- [ ] `resource()` — асинхронный ресурс общего вида (не только HTTP), `loader`, `params`
- [ ] Статусы ресурса: `.value()`, `.status()`, `.isLoading()`, `.error()`, `.hasValue()`
- [ ] `httpResource` продвинуто: реактивный URL, `params`, `parse` со схемой (Zod), `map`
- [ ] `rxResource()` — мост между RxJS и сигналами
- [ ] `toSignal()` / `toObservable()` из `@angular/core/rxjs-interop`
- [ ] 🏗 Паттерн: «сигналы для состояния, RxJS для событий/потоков»

### Практика Части 2
- [ ] Переписать `TaskStore`: `tasks` read-only, `activeCount`/`doneCount`/`filteredTasks` через `computed()`
- [ ] Фильтр из Части 1 сделать сигналом, а `filteredTasks` — `computed()` от `tasks` и `filter`
- [ ] Сохранять выбранный фильтр в `localStorage` через `effect()` (и корректно читать при старте, помня про SSR)
- [ ] Показать спиннер по `tasksResource.isLoading()` и ошибку по `.error()`

---

## Часть 3. RxJS: столько, сколько реально нужно ⚛️

Даже в signal-эпоху RxJS никуда не делся: HTTP, события роутера, формы, WebSocket, debounce.

- [ ] Observable vs Promise: ленивость, множественность значений, отмена
- [ ] `subscribe()`, `unsubscribe()`, утечки подписок и `takeUntilDestroyed()`
- [ ] 🔑 Операторы трансформации: `map`, `filter`, `tap`
- [ ] 🔑 Higher-order: `switchMap` (отменить предыдущий — поиск), `mergeMap`, `concatMap` (очередь), `exhaustMap` (игнорировать пока идёт — двойной клик по «Сохранить»)
- [ ] Когда какой из четырёх — это классический вопрос на собеседовании и реальный источник багов 🔑
- [ ] `debounceTime`, `distinctUntilChanged`, `startWith`, `shareReplay`
- [ ] Обработка ошибок: `catchError`, `retry`, `retryWhen`
- [ ] `combineLatest`, `forkJoin`, `merge`
- [ ] Subjects: `Subject`, `BehaviorSubject`, `ReplaySubject` — и почему в 2026 их чаще заменяет `signal`
- [ ] `AsyncPipe` (`| async`) — и почему `toSignal()` обычно лучше в новом коде
- [ ] 🏗 Правило: не подписывайся вручную там, где хватит `httpResource`/`toSignal`

### Практика Части 3
- [ ] Живой поиск по задачам: `input` → `debounceTime(300)` → `switchMap` → запрос к API
- [ ] Защитить кнопку «Добавить» от дабл-клика через `exhaustMap`

---

## Часть 4. Формы (глубоко)

Reactive Forms — большая, недооценённая часть Angular, где он реально сильнее React.

- [ ] 🔑 Typed Reactive Forms — строгая типизация `FormGroup` и `form.value`
- [ ] `FormControl`, `FormGroup`, `FormArray` (динамические списки полей)
- [ ] `FormBuilder` через `inject(FormBuilder)` вместо `new FormBuilder()` 🏗 *(в нашем коде сейчас `new` — поправить)*
- [ ] `nonNullable: true` — и почему `form.value.title!` с восклицательным знаком это костыль
- [ ] Состояния контрола: `valid`, `invalid`, `pristine`, `dirty`, `touched`, `pending`
- [ ] Показ ошибок только после `touched`/`dirty` 🏗
- [ ] Встроенные валидаторы + кастомный синхронный валидатор
- [ ] Асинхронный валидатор (проверка уникальности на сервере)
- [ ] Кросс-полевая валидация (пароль + подтверждение) на уровне `FormGroup`
- [ ] `valueChanges` / `statusChanges` как Observable
- [ ] `setValue` vs `patchValue`, `reset()` и подводные камни
- [ ] `updateOn: 'blur' | 'submit'` — когда валидировать
- [ ] 🔑 `ControlValueAccessor` — свой компонент как полноценный контрол формы ⚛️ *(мощная штука без прямого аналога в React)*
- [ ] Template-driven forms (`ngModel`) — знать, что есть, и **не использовать** в новых проектах 🏗
- [ ] Заглянуть в экспериментальный Signal Forms (`@angular/forms/signals`) — куда всё движется

### Практика Части 4
- [ ] Типизировать `AddTaskForm`, убрать `!`
- [ ] Форма редактирования задачи: title, описание, приоритет (select), дедлайн (date), теги через `FormArray`
- [ ] Свой компонент `<app-star-rating>` через `ControlValueAccessor`

---

## Часть 5. Роутинг (продвинутый)

- [ ] Параметры маршрута `:id` и чтение через `withComponentInputBinding()` ⚛️ *(параметр приходит прямо в `input()` — очень удобно)*
- [ ] `ActivatedRoute`, `paramMap`, `queryParamMap` как сигналы/Observable
- [ ] Query params: фильтры и пагинация в URL 🏗
- [ ] `Router.navigate()` / `navigateByUrl()`, `relativeTo`
- [ ] `routerLinkActive` для подсветки активной вкладки
- [ ] Вложенные (child) маршруты и несколько `<router-outlet>`
- [ ] 🔑 Lazy loading: `loadComponent` и `loadChildren` ⚛️ *(явный аналог `next/dynamic`, только на уровне роутинга)*
- [ ] Guards как функции: `canActivate`, `canMatch`, `canDeactivate` (защита от ухода с несохранённой формы)
- [ ] `Resolve` — предзагрузка данных до активации маршрута (и когда лучше `httpResource` в компоненте)
- [ ] `Title` service / `title` в route config
- [ ] Стратегии предзагрузки (`PreloadAllModules`, кастомные)
- [ ] `withViewTransitions()` — анимации переходов через View Transitions API
- [ ] Скролл-позиция: `withInMemoryScrolling()`
- [ ] Обработка 404 (`path: '**'`) и редиректы

### Практика Части 5
- [ ] Страница `/tasks/:id` с деталями задачи через `withComponentInputBinding`
- [ ] Фильтр задач хранить в query params (чтобы ссылка была шарящейся)
- [ ] `/about` перевести на `loadComponent` (lazy)
- [ ] Guard, не дающий уйти со страницы редактирования при несохранённых изменениях
- [ ] Страница 404

---

## Часть 6. HTTP (продвинутый)

- [ ] 🔑 Функциональные интерцепторы: `withInterceptors([...])` ⚛️ *(аналог middleware/axios interceptors)*
- [ ] Интерцептор авторизации (подстановка JWT)
- [ ] Интерцептор логирования и глобальной обработки ошибок
- [ ] Интерцептор индикатора загрузки (глобальный прогресс-бар)
- [ ] Retry с экспоненциальной задержкой
- [ ] `HttpParams`, `HttpHeaders`, типизация ответов
- [ ] `HttpErrorResponse` и нормализация ошибок API 🏗
- [ ] Загрузка файлов и отслеживание прогресса (`reportProgress`, `HttpEventType`)
- [ ] `withFetch()` — fetch-бэкенд вместо XHR
- [ ] SSR-специфика: `TransferState` / `withHttpTransferCacheOptions()` — не делать один и тот же запрос дважды (на сервере и на клиенте) 🔑
- [ ] Тестирование HTTP: `provideHttpClientTesting`, `HttpTestingController`
- [ ] 🏗 Слой API: не размазывать URL по компонентам, а держать типизированные сервисы-клиенты
- [ ] Валидация ответов сервера через Zod (и `parse` в `httpResource`) 🏗

### Практика Части 6
- [ ] Вынести `API_URL` в `environments` / `InjectionToken`
- [ ] Глобальный error-интерцептор + тост об ошибке
- [ ] Оптимистичное обновление задачи (менять UI сразу, откатывать при ошибке) вместо `.reload()` после каждой мутации

---

## Часть 7. State management

- [ ] 🏗 Уровни состояния: локальное в компоненте → сервис фичи → глобальный сервис → серверный кэш (`httpResource`). Не тащить всё в глобальный store ⚛️
- [ ] Сервис с сигналами как основной паттерн (у нас уже есть — довести до идиоматичного вида: private writable + public readonly)
- [ ] 🔑 NgRx SignalStore (`@ngrx/signals`) — `signalStore`, `withState`, `withComputed`, `withMethods`, `withHooks`
- [ ] `signalStore` на уровне фичи vs `providedIn: 'root'`
- [ ] `rxMethod` для асинхронных операций в SignalStore
- [ ] Кастомные фичи SignalStore (переиспользуемые куски, напр. `withEntities`, `withLogger`)
- [ ] Обзорно: классический NgRx (Store/Actions/Reducers/Effects) — знать, что это, уметь читать чужой код ⚛️ *(это Redux, знакомо)*
- [ ] Когда классический NgRx оправдан, а когда это оверинжиниринг 🏗
- [ ] Обзорно: альтернативы (Elf, Akita — legacy) — просто чтобы узнавать в вакансиях

### Практика Части 7
- [ ] Переписать `TaskStore` на `@ngrx/signals` SignalStore и сравнить с ручным сервисом

---

## Часть 8. Директивы, пайпы, композиция UI

- [ ] 🔑 Атрибутивные директивы: своя `appHighlight`, `appAutofocus`
- [ ] Директивы с `input()` и `host`-биндингами
- [ ] 🔑 `hostDirectives` — композиция поведения без наследования 🏗 ⚛️ *(закрывает то, для чего в React были HOC/хуки)*
- [ ] Структурные директивы и `TemplateRef` / `ViewContainerRef` — как это работает под капотом
- [ ] Свой пайп (`@Pipe`), `pure` vs `impure` и почему impure опасны для производительности
- [ ] Встроенные пайпы: `date`, `currency`, `decimal`, `percent`, `json`, `keyvalue`, `slice`
- [ ] 🔑 Content projection: `<ng-content>`, множественные слоты с `select` ⚛️ *(это `children` и «слоты» в React)*
- [ ] `ng-template` + `ngTemplateOutlet` — передача кусков разметки как параметров ⚛️ *(аналог render-props)*
- [ ] `ng-container` — группировка без лишнего DOM-узла
- [ ] `viewChild()` / `viewChildren()` / `contentChild()` как сигналы
- [ ] `ElementRef`, `Renderer2` — и почему прямой доступ к DOM ломает SSR 🏗
- [ ] Динамические компоненты: `createComponent`, `NgComponentOutlet`
- [ ] `@defer` — ленивая загрузка куска шаблона: триггеры `on viewport`, `on interaction`, `on idle`, блоки `@placeholder`/`@loading`/`@error` 🔑
- [ ] CDK: `@angular/cdk` — overlay, portal, a11y, drag-drop, virtual scroll (без Material)

### Практика Части 8
- [ ] Свой `<app-modal>` с content projection
- [ ] Директива `appAutofocus` для поля ввода задачи
- [ ] Пайп «сколько времени назад» для дедлайна
- [ ] Тяжёлый блок статистики обернуть в `@defer (on viewport)`

---

## Часть 9. Dependency Injection (глубоко) ⚛️

Здесь Angular совсем не похож на React — и это его главная архитектурная сила.

- [ ] Иерархия инжекторов: root → route → component
- [ ] `providers` на уровне компонента/маршрута — инстанс на каждый компонент/маршрут
- [ ] 🔑 `InjectionToken<T>` — типобезопасные токены для конфигов
- [ ] `useValue`, `useClass`, `useExisting`, `useFactory`
- [ ] `multi: true` провайдеры (как устроены интерцепторы)
- [ ] Опции `inject()`: `optional`, `skipSelf`, `self`, `host`
- [ ] `EnvironmentInjector`, `runInInjectionContext` — что делать, когда `inject()` «вне контекста»
- [ ] Паттерн «provide-функций» (`provideX()`) для настройки библиотек 🏗
- [ ] `APP_INITIALIZER` / `provideAppInitializer` — загрузка конфига до старта приложения
- [ ] 🏗 DI как способ подменять реализации в тестах — без jest.mock-магии
- [ ] `@Injectable` с абстрактным классом/интерфейсом как контрактом (инверсия зависимостей) — знакомо по NestJS

### Практика Части 9
- [ ] `API_URL` через `InjectionToken` вместо константы в файле
- [ ] Абстрактный `TasksApi` + две реализации: HTTP и in-memory (для тестов/демо)

---

## Часть 10. Change detection и производительность 🔑

- [ ] Как Angular обновляет DOM: dirty-marking и проход по дереву компонентов ⚛️
- [ ] Zone.js: что это было, почему от него уходят, и почему у тебя его уже нет
- [ ] 🔑 Zoneless change detection: `provideZonelessChangeDetection()` — как реактивность держится на сигналах
- [ ] Что «ломает» zoneless: изменение обычных полей класса без сигнала, `setTimeout` с мутацией состояния
- [ ] `ChangeDetectionStrategy.OnPush` — почему в zoneless это по сути норма 🏗
- [ ] `ChangeDetectorRef`: `markForCheck`, `detectChanges` — легаси-инструменты, знать для чужого кода
- [ ] Angular DevTools: профайлер отрисовки, граф компонентов, инспектор сигналов 🔑
- [ ] `track` в `@for`: почему неправильный track = переотрисовка всего списка
- [ ] `NgOptimizedImage` (`ngSrc`) — картинки, LCP, priority
- [ ] Virtual scroll (CDK) для длинных списков
- [ ] Анализ бандла: `ng build --stats-json` + `esbuild-visualizer` / `source-map-explorer`
- [ ] Budgets в `angular.json` — упасть в CI, если бандл распух 🏗
- [ ] Core Web Vitals: LCP / CLS / INP и что на них влияет в Angular-приложении

### Практика Части 10
- [ ] Профилировать список из 5000 задач в DevTools, найти и убрать лишние отрисовки
- [ ] Прикрутить virtual scroll и сравнить метрики

---

## Часть 11. Тестирование

- [ ] Как устроен `ng test` на Vitest в этом проекте (билдер `@angular/build:unit-test`)
- [ ] 🔑 Юнит-тест сервиса без TestBed (просто `new`/`inject` — сигналы тестируются легко)
- [ ] `TestBed.configureTestingModule` — конфигурация тестового DI
- [ ] `ComponentFixture`, `detectChanges()`, `fixture.componentInstance`
- [ ] Подмена зависимостей через `providers` (вместо мока модуля) 🏗 ⚛️
- [ ] Тестирование `input()`/`output()`: `fixture.componentRef.setInput()`
- [ ] Тестирование HTTP: `HttpTestingController`, `expectOne`, `flush`
- [ ] Асинхронность: `fakeAsync`, `tick`, `flush`, `waitForAsync`
- [ ] Тестирование роутинга: `provideRouter` + `RouterTestingHarness`
- [ ] Тестирование форм
- [ ] 🏗 Что тестировать, а что нет: сервисы и логика — обязательно; вёрстка — по необходимости
- [ ] Component Test Harnesses (CDK) — стабильные тесты UI без селекторов по CSS
- [ ] E2E на Playwright: happy path, авторизация, CI
- [ ] Coverage и разумные пороги 🏗

### Практика Части 11
- [ ] Полностью покрыть `TaskStore` тестами (включая ошибки HTTP)
- [ ] Тест `TaskItem`: клик по чекбоксу эмитит `toggle` с нужным id
- [ ] E2E-сценарий: добавил задачу → отметил → удалил

---

## Часть 12. SSR, гидратация, деплой

- [ ] Как устроен SSR в этом проекте: `main.server.ts`, `server.ts`, `app.config.server.ts`
- [ ] 🔑 `provideClientHydration()` и что такое гидратация ⚛️ *(знакомо по Next.js)*
- [ ] `withEventReplay()` — что это даёт (клики до гидратации не теряются)
- [ ] Incremental hydration: `@defer (hydrate on ...)` 🔑
- [ ] Ошибки гидратации (NG0500 и компания) — причины и отладка
- [ ] Что нельзя делать в SSR: `window`, `document`, `localStorage` напрямую
- [ ] `isPlatformBrowser()` / `afterNextRender()` как правильное решение 🏗
- [ ] `TransferState` — переиспользование данных с сервера на клиенте
- [ ] Prerender / SSG: `app.routes.server.ts`, `RenderMode.Prerender | Server | Client` 🔑
- [ ] SEO: `Meta` и `Title` сервисы
- [ ] Продакшн-сборка, `ng build`, что лежит в `dist/`
- [ ] Деплой: статика (Netlify/Vercel/Pages) vs Node-сервер (Docker)
- [ ] Dockerfile для SSR-приложения

### Практика Части 12
- [ ] Починить/проверить, что `httpResource` не дублирует запрос при SSR
- [ ] `/about` сделать prerender, `/tasks/:id` — server-render
- [ ] Собрать Docker-образ и запустить локально

---

## Часть 13. Архитектура и best practices 🏗

Главная часть для перехода на «проф уровень» — тут не фичи, а решения.

### 13.1 Структура проекта

- [ ] Feature-based структура: `core/` (синглтоны, интерцепторы, guards), `shared/` (переиспользуемое), `features/` (фичи), `pages/` (роуты)
- [ ] Правило «фича не импортирует из другой фичи» — только через `shared`/`core` 🔑
- [ ] Barrel-файлы (`index.ts`): плюсы и минусы для tree-shaking
- [ ] Границы через ESLint-правила (`@angular-eslint`, `eslint-plugin-boundaries`)
- [ ] Path aliases в `tsconfig` (`@core/*`, `@features/*`) вместо `../../../`
- [ ] Обзорно: Nx-монорепо и библиотеки — как это делают в больших командах

### 13.2 Правила написания кода

- [ ] Официальный Angular Style Guide (переписан в 2025 — читать актуальную версию)
- [ ] Компоненты: только представление; логика — в сервисах 🔑
- [ ] Всегда `OnPush`-совместимый код (никаких мутаций входных объектов)
- [ ] Не подписываться в компоненте, если можно `httpResource`/`toSignal`
- [ ] Всегда отписываться там, где подписался (`takeUntilDestroyed`)
- [ ] `readonly` для инжектированных зависимостей и сигналов
- [ ] Приватные сигналы + публичные `computed`/`asReadonly`
- [ ] Никакой бизнес-логики в шаблоне
- [ ] Строгий TypeScript: `strict`, `strictTemplates`, отказ от `any`
- [ ] `ESLint` + `Prettier` в проекте и в CI
- [ ] Осмысленные имена: `TaskStore` vs `TaskService` vs `TasksApi` — разные роли, разные суффиксы

### 13.3 Качество и процессы

- [ ] Обработка ошибок: глобальный `ErrorHandler`, дружелюбные сообщения, Sentry
- [ ] Логирование и мониторинг (Sentry / OpenTelemetry)
- [ ] Feature flags
- [ ] `environments` и конфиг для разных стендов
- [ ] Версионирование и обновление Angular: `ng update`, чтение changelog, deprecations
- [ ] CI: lint + test + build на каждый PR (GitHub Actions)
- [ ] Conventional commits, PR-ревью, changelog

### 13.4 Доступность и интернационализация

- [ ] a11y: семантика, `aria-*`, фокус, клавиатурная навигация
- [ ] CDK a11y: `FocusTrap`, `LiveAnnouncer`
- [ ] Проверка `axe` / Lighthouse
- [ ] i18n: встроенный `@angular/localize` vs `transloco` — плюсы/минусы
- [ ] Локализация дат/чисел/валют, `LOCALE_ID`
- [ ] Тёмная тема и `prefers-color-scheme`

### 13.5 Безопасность

- [ ] Как Angular защищает от XSS (санитизация) и как её случайно отключают (`bypassSecurityTrust*`)
- [ ] `[innerHTML]` — когда можно и что проверить
- [ ] CSRF/XSRF: `withXsrfConfiguration()`
- [ ] Хранение токенов: localStorage vs httpOnly cookie 🔑
- [ ] CSP и Angular
- [ ] Не полагаться на фронтовые guard'ы как на защиту — авторизация всегда на сервере 🔑

---

## Часть 14. Экосистема и инструменты

- [ ] Angular CLI глубже: `ng generate` со схемами, `--dry-run`, `ng add`
- [ ] Свои schematics (генератор фичи по шаблону команды)
- [ ] Angular Material / CDK — когда брать, как темизировать
- [ ] Альтернативы UI: PrimeNG, Spartan/ng, Tailwind + свои компоненты
- [ ] Tailwind в Angular (у тебя уже подключён — освоить осознанно)
- [ ] Storybook для Angular
- [ ] Angular DevTools (расширение браузера)
- [ ] Angular Language Service в редакторе
- [ ] `@angular/pwa`: сервис-воркер, офлайн, обновления
- [ ] WebSockets / SSE в Angular
- [ ] Работа с картами/графиками (ECharts, Chart.js) в Angular-обёртке
- [ ] Обзорно: Angular Elements (компонент как web-component), микрофронтенды (Module Federation)

---

## Часть 15. Пет-проект: **DevLog** 🚀

> Финальный проект, где всё вышеперечисленное применяется в бою. Со своим сервером на **C# / ASP.NET Core** — учим два стека параллельно на одном домене (см. параллельный трек в Части 16).

### Идея

**DevLog** — трекер пет-проектов и обучения. Мета-проект: в нём ты ведёшь свои же проекты (включая изучение Angular по этому роадмапу).

Почему именно он: он требует ровно тех фич, которые надо освоить — авторизация, вложенные сущности, канбан с drag&drop, таймтрекинг (реальное время → RxJS), графики (агрегация), загрузка файлов, фильтры в URL, realtime-обновления, оффлайн.

**Домен:**
- `Project` — пет-проект (название, описание, стек, статус, обложка)
- `Task` — задача в проекте (канбан-колонки: backlog / in progress / review / done, приоритет, теги, дедлайн)
- `TimeEntry` — залогированное время по задаче (запуск/остановка таймера)
- `Note` — заметка/дневниковая запись в проекте (markdown)
- `User` — авторизация, свой профиль

**Стек:**
- Backend: **ASP.NET Core Web API (.NET 10 LTS)** + **EF Core** + PostgreSQL (Docker Compose), JWT-авторизация, **SignalR** для realtime
- Frontend: Angular 21 (zoneless, SSR), Tailwind, CDK, NgRx SignalStore
- Контракт между фронтом и бэком: **OpenAPI/Swagger → автогенерация типизированного TS-клиента** (NSwag или Kiota) ⚛️
  *Это ключевое отличие от монорепо с Nest: общий TS-пакет не сделать, зато схема API становится единственным источником правды и типы фронта генерируются из C#-контроллеров.*
- Локальная оркестрация: Docker Compose (или **.NET Aspire** — посмотреть как альтернативу)

**Проверь SDK:** сейчас у тебя `dotnet 8.0.130`. Для нового проекта поставь актуальный LTS (.NET 10) — `dotnet --list-sdks` покажет, что установлено.

### Этапы

Каждый этап закрывает пункты из **обоих** треков: слева Angular (Части 1–14), справа C#/ASP.NET (Часть 16).

**Этап 1 — Каркас** *(Angular: 1, 5, 13.1 · C#: 16.1–16.3)*
- [ ] Структура репозитория: `src/Api` (ASP.NET), `src/Web` (Angular), `docker-compose.yml`
- [ ] `dotnet new webapi` + solution-файл, первый эндпоинт `/health`
- [ ] Docker Compose с PostgreSQL
- [ ] EF Core: `DbContext`, первые сущности, первая миграция, `dotnet ef database update`
- [ ] CORS-политика для дев-режима Angular
- [ ] Swagger/OpenAPI включён, генерация TS-клиента для Angular (NSwag)
- [ ] Структура Angular-приложения: `core/`, `shared/`, `features/`, `pages/` + path aliases
- [ ] Layout: шапка, боковое меню, `<router-outlet>`, lazy-маршруты

**Этап 2 — Авторизация** *(Angular: 6, 9, 5 · C#: 16.6)*
- [ ] ASP.NET Identity + JWT bearer: регистрация/логин, refresh-токены
- [ ] Authorization policies и `[Authorize]` на контроллерах
- [ ] Хеширование паролей, валидация, rate limiting на логине
- [ ] Angular: формы логина/регистрации с валидацией
- [ ] `AuthStore` на сигналах, `authInterceptor` с подстановкой токена
- [ ] Интерцептор рефреша токена при 401
- [ ] `authGuard` (`canMatch`) на приватные маршруты
- [ ] Безопасное хранение токенов (httpOnly cookie)

**Этап 3 — CRUD проектов** *(Angular: 2, 4, 6, 7 · C#: 16.4–16.5)*
- [ ] Контроллеры/Minimal API для проектов, DTO и маппинг сущность↔DTO
- [ ] Валидация запросов (DataAnnotations или FluentValidation)
- [ ] `ProblemDetails` как единый формат ошибок API 🏗
- [ ] EF Core: связи, `Include`, проекции в DTO, пагинация и сортировка
- [ ] Angular: список проектов с фильтрами и поиском (фильтры в query params)
- [ ] Создание/редактирование в модалке (свой `<app-modal>` с content projection)
- [ ] `httpResource` для чтения + оптимистичные мутации
- [ ] Загрузка обложки проекта с прогрессом (на бэке — `IFormFile` и хранение файлов)
- [ ] Скелетоны, состояния загрузки/ошибки/пустоты

**Этап 4 — Канбан задач** *(Angular: 8, 10 · C#: 16.4)*
- [ ] API перемещения задач между колонками (порядок сортировки, конкурентные правки)
- [ ] Доска с колонками, CDK drag-and-drop
- [ ] Оптимистичное перемещение карточек + откат при ошибке
- [ ] Инлайновое редактирование карточки
- [ ] Фильтры по тегам/приоритету/дедлайну через `computed()`
- [ ] Virtual scroll для больших колонок
- [ ] Клавиатурная навигация и a11y для доски

**Этап 5 — Таймтрекинг** *(Angular: 3 · C#: 16.4, 16.7)*
- [ ] API таймера: старт/стоп, защита от двух активных таймеров (транзакции)
- [ ] Работа с датами и таймзонами на бэке (`DateTimeOffset`, UTC везде) 🏗
- [ ] Старт/стоп таймера по задаче, тикающий счётчик (RxJS `interval` → сигнал)
- [ ] Восстановление активного таймера после перезагрузки страницы
- [ ] Ручное добавление/правка записей времени (`FormArray`)
- [ ] Защита от двойного запуска (`exhaustMap`)

**Этап 6 — Аналитика** *(Angular: 2, 8, 10 · C#: 16.5)*
- [ ] Агрегации на бэке средствами LINQ/EF: время по дням/проектам, скорость закрытия задач
- [ ] Кэширование тяжёлых агрегатов (`IMemoryCache` / `HybridCache`)
- [ ] Графики (heatmap активности «как на GitHub», burndown)
- [ ] Тяжёлые виджеты через `@defer (on viewport)`
- [ ] Экспорт отчёта в CSV (стриминг ответа с бэка)

**Этап 7 — Realtime и заметки** *(Angular: 3, 8 · C#: 16.7)*
- [ ] **SignalR**-хаб в ASP.NET, авторизация подключений
- [ ] Angular-клиент SignalR (`@microsoft/signalr`) → мост в сигналы
- [ ] Обновление доски у всех открытых вкладок в реальном времени
- [ ] Заметки в markdown с безопасным рендером (санитизация!)
- [ ] Уведомления/тосты
- [ ] Фоновые задачи на бэке (`BackgroundService`: напоминания о дедлайнах)

**Этап 8 — Прод-качество** *(Angular: 11, 12, 13, 14 · C#: 16.8–16.9)*
- [ ] Бэкенд: юнит-тесты (xUnit) + интеграционные (`WebApplicationFactory` + Testcontainers)
- [ ] Фронт: юнит-тесты сторов и компонентов, E2E на Playwright (сквозь настоящий API)
- [ ] Структурированное логирование (Serilog), health checks, метрики (OpenTelemetry)
- [ ] SSR + prerender публичных страниц, метатеги для шаринга проекта
- [ ] i18n (ru/en), тёмная тема
- [ ] Глобальный `ErrorHandler` на фронте + `ProblemDetails` с бэка, Sentry
- [ ] CI: `dotnet build/test` + `ng lint/test/build`, budgets
- [ ] Docker-образы фронта и бэка (multi-stage), деплой
- [ ] PWA: офлайн-режим и установка

### Запасные идеи пет-проекта
- **Home Lab Dashboard** — мониторинг домашних сервисов: realtime-графики, WebSocket, много агрегаций
- **Recipe Planner** — рецепты → план питания на неделю → автосписок покупок: сложные формы, drag&drop, оффлайн
- **Reading Tracker** — библиотека книг, прогресс чтения, цитаты, статистика: работа с изображениями, поиск, теги

---

## Часть 16. Параллельный трек: C# и ASP.NET Core 🎯

> Изучается **параллельно** с Angular на одном и том же домене (DevLog). Хорошая новость: NestJS был вдохновлён Angular, а Angular — во многом .NET-подходами. DI, декораторы/атрибуты, пайплайн middleware, слоистая архитектура — всё это ты уже знаешь концептуально, меняется только синтаксис. 🔷 = места, где C# принципиально отличается от TypeScript.

### 16.1 Язык C# для TypeScript-разработчика

- [ ] Установка актуального SDK (.NET 10 LTS), `dotnet --list-sdks`, выбор IDE (Rider / VS Code + C# Dev Kit)
- [ ] `dotnet new`, `dotnet run`, `dotnet build`, `dotnet watch`, `.csproj` и `.sln` — устройство проекта
- [ ] NuGet вместо npm: `dotnet add package`, где живут зависимости
- [ ] 🔷 Компиляция и статическая типизация: типы существуют в рантайме (в отличие от стёртых типов TS!) 🔑
- [ ] Типы-значения vs ссылочные: `struct` vs `class`, где живут в памяти
- [ ] `record` — иммутабельные типы с value-семантикой (идеально для DTO) 🔑
- [ ] `var`, target-typed `new()`, объектные инициализаторы
- [ ] 🔷 Nullable reference types (`string?`, `!`, `?.`, `??`) — включить `<Nullable>enable</Nullable>` 🏗
- [ ] Свойства (`get`/`set`/`init`), автосвойства, `required`
- [ ] Интерфейсы, абстрактные классы, наследование (в C# оно живое и используется чаще, чем в TS)
- [ ] Дженерики и ограничения (`where T : class`)
- [ ] 🔑 **LINQ**: `Where`, `Select`, `OrderBy`, `GroupBy`, `Any`, `First`/`FirstOrDefault`, `Sum` — это как методы массива, только лениво и над любым источником, включая SQL
- [ ] `IEnumerable<T>` vs `IQueryable<T>` — и почему второе превращается в SQL 🔑
- [ ] 🔑 `async` / `await` / `Task<T>` — синтаксис знаком, но семантика другая (пул потоков, а не event loop) 🔷
- [ ] `CancellationToken` — сквозная отмена операций 🏗 *(без аналога в привычном TS-коде)*
- [ ] Pattern matching: `switch`-выражения, `is`, деконструкция
- [ ] Коллекции: `List<T>`, `Dictionary<K,V>`, `HashSet<T>`, collection expressions `[1, 2, 3]`
- [ ] Исключения: `try/catch/finally`, свои типы исключений, когда бросать
- [ ] `using` / `IDisposable` — детерминированное освобождение ресурсов 🔷
- [ ] Extension methods 🔷 *(добавить метод к чужому типу — в TS так нельзя)*
- [ ] Атрибуты (`[Authorize]`, `[HttpGet]`) — аналог декораторов, знакомо по Nest
- [ ] Namespaces, `using`-директивы, file-scoped namespaces
- [ ] Соглашения именования: `PascalCase` для методов и свойств, `_camelCase` для приватных полей 🏗

### 16.2 Основы .NET-платформы

- [ ] `Program.cs` и minimal hosting model: `WebApplicationBuilder`
- [ ] 🔑 Встроенный DI-контейнер: `AddSingleton` / `AddScoped` / `AddTransient` ⚛️
      *Прямая параллель: `Singleton` ≈ `providedIn: 'root'`, `Scoped` ≈ провайдер на маршрут, `Transient` ≈ новый инстанс каждый раз*
- [ ] Ошибка «captive dependency» (Singleton держит Scoped) — классический баг 🔑
- [ ] Конфигурация: `appsettings.json`, `appsettings.Development.json`, переменные окружения, user-secrets
- [ ] 🔑 Options pattern: `IOptions<T>`, типизированный конфиг вместо строковых ключей 🏗
- [ ] Логирование: `ILogger<T>`, уровни, структурированные логи, Serilog
- [ ] `IHostedService` / `BackgroundService` — фоновые задачи
- [ ] Environments (`Development` / `Staging` / `Production`)

### 16.3 ASP.NET Core: web API

- [ ] 🔑 Пайплайн middleware — прямая аналогия с HTTP-интерцепторами Angular и middleware Nest
- [ ] Порядок middleware имеет значение (частый источник багов) 🔑
- [ ] Controllers vs Minimal API — выбрать подход и понимать разницу 🏗
- [ ] Роутинг, атрибуты `[HttpGet]`/`[HttpPost]`, параметры маршрута и query
- [ ] Model binding и валидация (`[ApiController]`, DataAnnotations, FluentValidation)
- [ ] 🔑 `ProblemDetails` (RFC 9457) — стандартный формат ошибок вместо своих JSON-обёрток 🏗
- [ ] Глобальная обработка исключений (`IExceptionHandler`)
- [ ] Статус-коды и `Results`/`ActionResult`: что и когда возвращать 🏗
- [ ] CORS — обязательно для связки с `ng serve`
- [ ] 🔑 OpenAPI/Swagger, генерация клиента для Angular (NSwag / Kiota) 🏗
- [ ] Версионирование API
- [ ] Rate limiting, `OutputCache`, `ResponseCompression`
- [ ] Загрузка и отдача файлов (`IFormFile`, стриминг)
- [ ] `IHttpClientFactory` — если API ходит в другие API

### 16.4 EF Core (данные)

- [ ] `DbContext`, `DbSet<T>`, конфигурация сущностей (Fluent API vs атрибуты)
- [ ] Провайдер Npgsql для PostgreSQL
- [ ] 🔑 Миграции: `dotnet ef migrations add` / `database update`, как их ревьюить
- [ ] Связи: один-ко-многим, многие-ко-многим, каскадное удаление
- [ ] Запросы LINQ → SQL, `Include` / `ThenInclude`
- [ ] 🔑 Проблема N+1 и как её ловить (логирование SQL) 🏗
- [ ] Проекции `Select` в DTO вместо загрузки целых сущностей 🏗
- [ ] Change tracking, `AsNoTracking()` для чтения 🏗
- [ ] Транзакции, конкурентность и `RowVersion` (optimistic concurrency) 🔑
- [ ] Пагинация: `Skip`/`Take`, keyset-пагинация
- [ ] Сидинг данных, `EnsureCreated` vs миграции
- [ ] Когда EF не нужен: raw SQL, Dapper — обзорно

### 16.5 Архитектура серверного приложения 🏗

- [ ] Слои: Api → Application → Domain → Infrastructure, куда что класть
- [ ] DTO vs сущности домена — и почему нельзя отдавать сущности EF наружу 🔑
- [ ] Маппинг: вручную / Mapster / AutoMapper (и почему многие выбирают руками)
- [ ] Repository и Unit of Work: нужны ли, если EF уже и то и другое (дискуссия, знать аргументы)
- [ ] CQRS и MediatR — когда оправдано, когда оверинжиниринг
- [ ] Vertical Slice Architecture — современная альтернатива слоям
- [ ] Валидация на границе, доменные инварианты внутри
- [ ] Идемпотентность и повторные запросы

### 16.6 Аутентификация и авторизация

- [ ] ASP.NET Core Identity: пользователи, пароли, хеширование
- [ ] 🔑 JWT bearer: выпуск, валидация, время жизни, refresh-токены
- [ ] Cookie vs Bearer, httpOnly-cookie как безопасный вариант для SPA 🔑
- [ ] Claims, роли, policy-based authorization
- [ ] `[Authorize]` / `[AllowAnonymous]`, авторизация на уровне ресурса (владелец записи)
- [ ] Внешние провайдеры (Google/GitHub OAuth) — опционально
- [ ] Секреты: user-secrets в деве, переменные окружения/vault в проде 🏗

### 16.7 Realtime и интеграции

- [ ] 🔑 SignalR: хабы, группы, авторизация подключений
- [ ] Angular-клиент `@microsoft/signalr`, обёртка над ним → сигналы
- [ ] Переподключение, состояние соединения, идемпотентность сообщений
- [ ] Обзорно: очереди и фоновая обработка (Hangfire / Quartz / RabbitMQ)

### 16.8 Тестирование бэкенда

- [ ] xUnit: структура теста, `Fact` / `Theory`
- [ ] Моки: NSubstitute или Moq
- [ ] `FluentAssertions` для читаемых проверок
- [ ] 🔑 Интеграционные тесты: `WebApplicationFactory<Program>` — поднять всё приложение в памяти
- [ ] **Testcontainers** — настоящий PostgreSQL в Docker для тестов 🏗
- [ ] Тестовые данные и изоляция между тестами
- [ ] Что покрывать: доменную логику и эндпоинты; не покрывать — EF-маппинг

### 16.9 Прод и эксплуатация

- [ ] Публикация: `dotnet publish`, self-contained vs framework-dependent
- [ ] Multi-stage Dockerfile для .NET
- [ ] Health checks (`/health/live`, `/health/ready`)
- [ ] OpenTelemetry: трейсинг, метрики, логи
- [ ] Обзорно: **.NET Aspire** — оркестрация дев-окружения (API + БД + фронт одной командой)
- [ ] Миграции БД в CI/CD: как накатывать безопасно 🔑
- [ ] Производительность: async всю дорогу, connection pooling, кэширование
- [ ] Конфигурация в проде, отсутствие секретов в репозитории 🏗

### Практика Части 16 (до старта DevLog)

- [ ] «Hello API»: `dotnet new webapi`, эндпоинт, Swagger, запуск
- [ ] Перенести **тот же самый to-do список** с `json-server` на свой ASP.NET API 🔑
      *Отличная первая задача: домен уже знаком, фронт менять почти не надо — меняется только источник данных*
- [ ] Подключить EF Core + PostgreSQL к этому API, сделать миграцию
- [ ] Сгенерировать TS-клиент из Swagger и подключить его в `to-do-list`
- [ ] Написать первый интеграционный тест на эндпоинт задач

---

## Приложение А. Шпаргалка React → Angular ⚛️

| React / Next.js | Angular 21 |
|---|---|
| `useState` | `signal()` + `.set()` / `.update()` |
| `useMemo` | `computed()` (без массива зависимостей) |
| `useEffect` | `effect()` (для сайд-эффектов) / `afterNextRender()` (для DOM) |
| props | `input()` / `input.required()` |
| callback-props (`onChange`) | `output()` + `.emit()` |
| `value` + `onChange` | `model()` + `[(value)]` |
| `key` в `.map()` | `track` в `@for` (обязателен) |
| `children` | `<ng-content>` |
| render-props | `ng-template` + `ngTemplateOutlet` |
| `ref` | `viewChild()` / `#templateVar` |
| Context / Zustand | сервис с `@Injectable({providedIn:'root'})` + `inject()` |
| React Query `useQuery` | `httpResource()` / `resource()` |
| `next/dynamic` | `loadComponent` / `@defer` |
| `<Link>` | `routerLink` |
| файловый роутинг | явный `Routes`-конфиг |
| middleware / axios interceptors | HTTP-интерцепторы (`withInterceptors`) |
| `jest.mock` | подмена провайдера в `TestBed` |
| custom hooks | сервисы + `hostDirectives` |
| Zod-валидация формы | Reactive Forms + `Validators` (или Signal Forms) |

## Приложение Б. Шпаргалка TypeScript/Nest/Angular → C#/ASP.NET 🔷

| TS / NestJS / Angular | C# / ASP.NET Core |
|---|---|
| `interface Foo {}` (стирается) | `interface IFoo` / `record Foo` (живёт в рантайме) |
| `type Dto = { ... }` | `record Dto(string Title, bool Done);` |
| `string \| null` | `string?` + `<Nullable>enable</Nullable>` |
| `Promise<T>` | `Task<T>` |
| `async/await` (event loop) | `async/await` (пул потоков) |
| `AbortController` | `CancellationToken` (сквозной, обязателен) |
| методы массива (`.map/.filter`) | LINQ (`Select` / `Where`) |
| `npm i` / `package.json` | `dotnet add package` / `.csproj` |
| Nest `@Module` + `providers` | `builder.Services.Add*` в `Program.cs` |
| Angular `providedIn: 'root'` | `AddSingleton<T>()` |
| провайдер на маршрут | `AddScoped<T>()` (обычно = на HTTP-запрос) |
| новый инстанс каждый раз | `AddTransient<T>()` |
| Nest middleware / Angular interceptor | ASP.NET middleware (`app.Use...`) |
| Nest `@UseGuards` / Angular `canActivate` | `[Authorize]` + authorization policies |
| Nest `@Controller`/`@Get` | `[ApiController]` / `[HttpGet]` |
| Nest DTO + `class-validator` | DTO + DataAnnotations / FluentValidation |
| Nest exception filter | `IExceptionHandler` + `ProblemDetails` |
| Prisma schema + `prisma migrate` | EF Core `DbContext` + `dotnet ef migrations` |
| Prisma `include` | EF `Include` / `ThenInclude` |
| `.env` | `appsettings.json` + user-secrets + env vars |
| Jest / Vitest | xUnit + NSubstitute + FluentAssertions |
| supertest | `WebApplicationFactory<Program>` |
| Nest WebSocket gateway | SignalR Hub |
| общий TS-пакет с типами | OpenAPI-схема → генерация TS-клиента ⚛️ |

## Приложение В. Работа с несколькими ИИ-ассистентами 🤖

Да, этот план — обычный markdown-файл, его понимает любой ассистент. Но чтобы они реально были полезны, а не мешали учиться, есть нюансы.

### Режим двух ассистентов: Claude (основной) + Copilot (запасной) 🔑

**Роли:**

- **Claude — основной репетитор.** Объясняет теорию, даёт задания, проверяет код, ведёт по плану, решает архитектурные вопросы.
- **Copilot — «сменщик»** на рабочем компьютере и когда у Claude кончились лимиты. Работает по тому же плану, но с более узким мандатом (см. ниже).
- **Claude — ещё и ревьюер работы Copilot.** При возврате разбирает всё, что помечено `[c]`, и выносит вердикт.

**Цикл:**

```
Claude: теория + задание
      ↓
 [переключение] лимиты / рабочий комп
      ↓
Copilot: прохождение пунктов → отметка [c] + запись в журнал передачи
      ↓
 [возврат к Claude]
      ↓
Claude: ревью пунктов [c] → вердикт:
        ✅ ок          → [x] 🔄
        ⚠️ закрепить   → мини-задание на ту же тему
        🔧 переделать  → разбор, почему архитектура другая
```

**Правила для тебя при работе с Copilot:**

- [ ] Отмечать пройденное как `- [c]`, **не** `- [x]` — иначе оно не попадёт в очередь на ревью
- [ ] 🔑 Делать коммит на каждый пункт (или логичную группу): `feat(part2): computed для счётчиков задач [copilot]` — именно по этим коммитам Claude потом восстанавливает картину
- [ ] Записывать в «Журнал передачи» (в конце файла): что делал, что было непонятно, где сомневался
- [ ] Не молчать о сомнениях: строчка «не понял, зачем тут `untracked()`» экономит целый раунд ревью
- [ ] 🏗 Не менять архитектуру самостоятельно — см. границы мандата ниже

**Что Copilot делать хорошо, а что лучше отложить до Claude** 🏗

Главный риск режима — **архитектурный дрейф**: за одну автономную сессию можно уехать в подход, который потом придётся переделывать целым куском. Поэтому мандат разный:

| Тип задачи | С Copilot |
|---|---|
| Практика уже разобранной темы | ✅ да, идеально |
| Повторяющаяся рутина (ещё один похожий компонент, тесты по образцу) | ✅ да |
| Пункты-«прочитать/попробовать API» | ✅ да |
| Рефакторинг по уже согласованному правилу | ✅ да |
| **Новая тема из плана «с нуля»** | ⚠️ можно, но помечать `[c]` и быть готовым переделать |
| **Архитектурные решения** (структура папок, выбор SignalStore vs сервис, слои на бэке) | 🛑 лучше дождаться Claude |
| **Стартовые этапы DevLog** (каркас, авторизация) | 🛑 дождаться — цена ошибки высокая |

**Что Claude проверяет при ревью** (чтобы ты понимал критерии заранее):

- [ ] Актуальность API: нет `NgModule`, `*ngIf`, `@Input()`-декораторов, `constructor`-инъекции, лишних `BehaviorSubject`
- [ ] Совместимость с zoneless: состояние в сигналах, нет мутаций «мимо» реактивности
- [ ] Логика в сервисах, а не в компонентах и не в шаблонах
- [ ] Иммутабельность обновлений, `readonly`, приватные writable-сигналы наружу как `computed`/`asReadonly`
- [ ] Отписки там, где есть ручные подписки
- [ ] Границы модулей: фича не лезет в другую фичу
- [ ] Типизация: нет `any`, нет `!` там, где можно `nonNullable`
- [ ] Соответствие уже принятым в проекте решениям (единообразие важнее «умнее»)
- [ ] 🔑 **Понимание, а не только работающий код** — Claude может задать 1–2 вопроса «почему именно так», и это часть ревью

**Инфраструктура, без которой режим не работает:**

- [ ] 🔑 Git-репозиторий с осмысленными коммитами (сейчас в `to-do-list` один `initial commit` — исправить)
- [ ] Роадмап **внутри** репозитория, чтобы галочки версионировались вместе с кодом
- [ ] Пуш на удалённый репозиторий — иначе рабочий и домашний компьютеры не синхронизируются
- [ ] `.github/copilot-instructions.md` с теми же правилами стека, что и у Claude
- [ ] Тег `[copilot]` в сообщении коммита — быстрый фильтр `git log --grep=copilot`

### Как подключить план к разным инструментам

- [ ] `CLAUDE.md` в корне репозитория — Claude Code читает автоматически
- [ ] `.github/copilot-instructions.md` — GitHub Copilot читает автоматически
- [ ] `AGENTS.md` — растущий кросс-инструментальный стандарт (Cursor, Codex и др.)
- [ ] 🏗 Не дублировать содержимое: держать **один** источник правды (`ANGULAR_ROADMAP.md`), а в файлах инструкций — короткие ссылки на него и правила поведения
- [ ] Хранить эти файлы в git — тогда правила переезжают вместе с проектом

### Что писать в файл инструкций (пример смысловых пунктов)

- [ ] Версии стека: Angular 21, **zoneless**, standalone, `@angular/build`, Vitest, SSR; .NET 10, EF Core, PostgreSQL
- [ ] 🔑 Запрет на устаревшие API: никаких `NgModule`, `*ngIf`/`*ngFor`, `@Input()`/`@Output()`-декораторов, `ChangeDetectorRef`-хаков, `constructor`-инъекции вместо `inject()`
- [ ] Требование: control flow `@if`/`@for`, сигналы, `inject()`, `input()`/`output()`
- [ ] Ссылка на `angular.dev/ai/develop-with-ai` и `llms.txt` Angular — официальный контекст для моделей 🔑
- [ ] Ссылка на текущий этап роадмапа, чтобы ассистент не забегал вперёд

### Главный риск: модель знает Angular «из 2021 года» ⚠️

Angular 21 и zoneless-режим очень новые. Модели (все, включая меня) склонны предлагать старые паттерны, потому что их в обучающих данных на порядки больше.

- [ ] 🔑 Всегда сверяй сгенерированный код с [angular.dev](https://angular.dev) — не с ответом модели
- [ ] Красные флаги в ответе ассистента: `NgModule`, `declarations:`, `*ngIf`, `@Input()`, `BehaviorSubject` как основное состояние, `zone.js`
- [ ] Проси модель указывать версию Angular, для которой она пишет код
- [ ] Если модель спорит с документацией — права документация

### Как использовать ИИ, не мешая учёбе 🏗

Ты явно хочешь **уметь повторить сам**. Это накладывает ограничения на то, как просить помощь:

- [ ] ✅ Хорошо: «объясни, чем `computed` отличается от `effect`», «сделай ревью моего кода», «почему у меня ошибка NG0500»
- [ ] ✅ Хорошо: «дай задание на эту тему», «проверь, правильно ли я понял, что…»
- [ ] ❌ Плохо на этапе обучения: «напиши мне весь компонент» — код появится, понимание нет
- [ ] 🔑 Правило: сначала пишешь сам → потом просишь ревью → потом спрашиваешь «как бы сделал ты и почему»
- [ ] Раздели роли: **Claude** — репетитор/объяснения/ревью; **Copilot** — автодополнение рутины (когда тема уже понята) 🏗
- [ ] Отключай агрессивный автокомплит, когда изучаешь новую тему — иначе он допишет за тебя раньше, чем ты подумаешь
- [ ] Прогресс отмечай в этом файле **только после того, как написал код руками**

## Приложение Г. Ресурсы

- [angular.dev](https://angular.dev) — официальная документация (актуальная, с интерактивными туториалами)
- [angular.dev/style-guide](https://angular.dev/style-guide) — официальный style guide (обновлён в 2025)
- [angular.dev/tutorials](https://angular.dev/tutorials) — Learn Angular + Deferrable Views
- [Angular Blog](https://blog.angular.dev) — что нового в релизах
- [NgRx SignalStore docs](https://ngrx.io/guide/signals)
- [Angular DevTools](https://angular.dev/tools/devtools) — расширение для профайлинга
- [update.angular.dev](https://update.angular.dev) — гайд по обновлению версий
- [`angular.dev/ai/develop-with-ai`](https://angular.dev/ai/develop-with-ai) — актуальные правила для AI-ассистентов (полезно и человеку)

### C# / .NET
- [learn.microsoft.com/dotnet](https://learn.microsoft.com/dotnet) — официальная документация и бесплатные курсы
- [learn.microsoft.com/aspnet/core](https://learn.microsoft.com/aspnet/core) — ASP.NET Core
- [learn.microsoft.com/ef/core](https://learn.microsoft.com/ef/core) — EF Core
- [C# language reference](https://learn.microsoft.com/dotnet/csharp/) — справочник по языку
- [.NET Aspire](https://learn.microsoft.com/dotnet/aspire/) — оркестрация дев-окружения
- [Testcontainers for .NET](https://dotnet.testcontainers.org/)
- «C# in Depth» (Jon Skeet) / «Pro ASP.NET Core» (Adam Freeman) — книги, если зайдёт формат

---

## Дневник прогресса

| Дата | Что пройдено | С кем | Заметки |
|---|---|---|---|
| 2026-08-16 | Часть 0 полностью | Claude | Сигналы, компоненты, формы, роутинг, DI, HTTP |
| | | | |

---

## Журнал передачи (Copilot → Claude) 🔄

> Заполняется при работе с Copilot. Claude читает этот раздел первым делом при возврате.
> Строка живёт до ревью, после — переносится в «Дневник прогресса» с вердиктом.

**Шаблон записи:**

```
### <дата> · Пункты <номера> · Copilot
- Что сделано: ...
- Коммиты: <хеши или ветка>
- Было непонятно: ...
- Сомнения / где мог ошибиться: ...
- Вопросы к Claude: ...
- Статус ревью: ⏳ ждёт
```

<!-- ↓ новые записи добавляй сюда ↓ -->

*(пока пусто)*

---

## Вердикты ревью

| Дата ревью | Пункты | Вердикт | Что доработано |
|---|---|---|---|
| | | | |
