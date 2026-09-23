import type { ProjectCaseStudy } from "@/types/content";

export const projects: ProjectCaseStudy[] = [
 {
  slug: "teamtrackingapp",
  name: "TeamTrackingApp",
  tagline:
    "A lightweight task tracker for a small operational team: support plans who owns which task each week, agents confirm their work every day, and extra help between colleagues is finally visible.",

  problem:
    "In a small operational team, a support person assigns recurring task types to agents every week, then needs to know each day who has done their part and who stepped in to help on a task that was not theirs. When this is tracked by hand, the support side has little day-to-day visibility, and the extra help agents give each other easily goes unrecorded. I identified this need in the B2B operations team I work in at TELUS International, and designed and developed TeamTrackingApp in my role there to digitalise it (see Experience).",

  solution:
    "I kept the product deliberately small and modelled it on the team's own vocabulary: a weekly assignment means \"this agent owns this task this week\", a daily completion means \"done today\", and a help record means \"I also helped with this today\". Support plans the week and reads the reports; agents only see and tick off their own tasks, for today. Keeping help records separate from official assignments means recognising extra effort never blurs who was responsible.",

  features: [
    {
      area: "Support workspace",
      items: [
        "Weekly planning: assign any number of agents to each task type (GTPS, WIP/IP, VOIP)",
        "Copy the previous week's assignments in one click, skipping inactive agents",
        "Daily status and weekly report, each with a plain-text version to copy into the operational report",
      ],
    },
    {
      area: "Agent workspace",
      items: [
        "Today view: mark an assigned task as done, or undo it, for the current day only",
        "Record help given on another task, with an optional note",
        "Personal history of past weeks and help records",
      ],
    },
    {
      area: "Team & access",
      items: [
        "Two roles, Support and Agent, enforced by the API rather than only hidden in the UI",
        "Support manages accounts: create agents, rename, reset passwords, deactivate",
        "A deactivated account loses access immediately, even with a token still valid",
      ],
    },
    {
      area: "Workflow rules",
      items: [
        "The same agent can't hold the same task twice in a week",
        "An assignment that already has completed days can't be deleted, so history is kept",
        "An agent can't record help on a task they already officially own that week",
      ],
    },
  ],

  outcome:
    "A working full-stack application that turns a manual weekly routine into one shared tool: support gets a daily and weekly view of the team's work, agents get recognition for the help they give, and the business rules of the workflow are enforced by the backend and covered by API integration tests.",

  architectureSummary:
    "A React 19 single-page application built with Vite mounts a separate route tree for each role and talks to the backend through an Axios client that attaches the JWT. The Spring Boot 4 API is organised by business feature (assignments, completions, help, reports, users), each with its own controller, service, repository and DTOs. Authentication uses Spring Security's built-in JWT support: the token only carries the user id, and the role and active flag are read from the database on every request, so deactivating an account takes effect immediately. Business rules live in transactional services, backed by database constraints, and a global exception handler returns consistent JSON errors. Data is stored in MySQL through Spring Data JPA; integration tests run against an in-memory H2 database.",

  architectureDiagram: [
    "┌──────────────────────┐        ┌───────────────────────┐",
    "│     React 19 SPA     │  JWT   │    Spring Boot API    │",
    "│  support: planning   │───────▶│                       │",
    "│  agent: today / help │        │  JWT → user from DB   │",
    "└──────────────────────┘        │  (role, active flag)  │",
    "                                │          ↓            │",
    "                                │  Controllers          │",
    "                                │          ↓            │",
    "                                │  Services             │",
    "                                │  - assignment rules   │",
    "                                │  - daily completions  │",
    "                                │  - help records       │",
    "                                │  - reports            │",
    "                                └───────────┬───────────┘",
    "                                            │ Spring Data JPA",
    "                                  ┌─────────▼──────────┐",
    "                                  │       MySQL        │",
    "                                  │ weekly_assignments │",
    "                                  │ daily_completions  │",
    "                                  │ help_records       │",
    "                                  │ users              │",
    "                                  └────────────────────┘",
  ],

  decisions: [
    {
      title: "Start from the workflow, keep the scope small",
      detail:
        "The app covers exactly the loop the team runs every week: plan, complete, help, report. There is no generic project-management layer, so each screen maps to a real step of the routine and the tool stays quick to adopt.",
    },
    {
      title: "Official assignments and help are separate concepts",
      detail:
        "Help records live in their own table and are never linked to assignments. Recording that someone helped can't change who was officially responsible, and the report can show both views side by side.",
    },
    {
      title: "Preserve history instead of allowing silent edits",
      detail:
        "An assignment that already has completed days can't be removed, and agents can only complete or undo work for the current day. The records the support side reads stay trustworthy after the fact.",
    },
    {
      title: "Access checked against the database on every request",
      detail:
        "The JWT only identifies the user. Role and active status are loaded from the database for each request, so deactivating an agent applies immediately without waiting for the token to expire.",
    },
    {
      title: "Rules enforced in services and in the schema",
      detail:
        "Services reject duplicate assignments, help on a task the agent already owns, and actions on someone else's assignment. A unique constraint on agent, week and task type backs the rule at the database level.",
    },
    {
      title: "Reports shaped for how they are used",
      detail:
        "Daily and weekly reports can be copied as plain text in the format of an operational report, so the tool fits into the existing reporting routine instead of adding a new one.",
    },
  ],

  testing: [
    "Six Spring Boot integration tests exercise the API through MockMvc against an in-memory H2 database, so they run without MySQL.",
    "The tests cover authentication failures, role separation between Support and Agent endpoints, assignment rules, agents completing only their own tasks, help recorded separately from assignments, and deactivated users losing access.",
    "Request validation and a global exception handler return consistent JSON errors for invalid input, conflicts and missing resources.",
  ],

  deployment: [
    "The backend and frontend run locally as two applications; Vite proxies /api to the Spring Boot server during development.",
    "Database URL, credentials, JWT secret and the first Support account are configured through environment variables, with the app refusing to start if the JWT secret is too short.",
    "The MySQL schema is created automatically on first start, and a Support account is seeded when the users table is empty.",
  ],

  security: [
    "Stateless JWT authentication with Spring Security's resource-server support and BCrypt password hashing.",
    "Role-based rules declared centrally: agent endpoints under /api/me require AGENT, planning, reports and user management require SUPPORT.",
    "An agent asking for someone else's assignment gets a \"not found\" response, so other people's records are not revealed.",
    "Support can't deactivate their own account, which prevents locking the team out.",
  ],

  metrics: [
    { label: "User roles", value: "2" },
    { label: "Integration tests", value: "6" },
    { label: "Scope", value: "Full stack" },
    { label: "Workflow", value: "Weekly + daily" },
  ],

  stack: [
    "Java 21",
    "Spring Boot",
    "Spring Security",
    "JWT",
    "Spring Data JPA",
    "MySQL",
    "React",
    "Vite",
    "Axios",
    "JUnit 5",
    "MockMvc",
    "H2",
  ],

  github: "https://github.com/mohcinelamtanez/TeamTrackingApp.git",
  featured: true,
},

 {
  slug: "banqueapp",
  name: "BanqueApp",
  tagline:
    "A full-stack lending platform that takes a consumer loan from the client's first request to its last repayment, with role-based workspaces for bank staff and a self-service portal for clients.",

  problem:
    "A lending institution has to manage the whole life of a credit: onboarding clients, collecting loan requests, checking eligibility, evaluating risk, issuing the loan, and tracking every monthly repayment. Different people take part in that process (administrators, bank agents, and the clients themselves) and each must see and do only what their role allows. When these rules live only in the user interface or are scattered across the code, they are easy to bypass and hard to evolve.",

  solution:
    "I modelled the real lending workflow first (who acts, in which order, under which rules) and built the product around it: a Spring Boot API that owns every business rule and permission, a React application that renders a different workspace depending on who is signed in, and a separate machine-learning service that scores credit risk before a loan is approved.",

  features: [
    {
      area: "Access & roles",
      items: [
        "Registration and login with stateless JWT authentication",
        "Three roles (admin, bank agent, client) enforced on the server, not only hidden in the UI",
        "Admin user management: create accounts and assign roles",
      ],
    },
    {
      area: "Lending workflow",
      items: [
        "Client onboarding with business references (CLI-1) instead of database IDs",
        "Loan applications with eligibility checks: complete profile, no active loan, no pending request",
        "Agent review queue with approve or reject decisions that automatically create the loan",
        "Monthly repayment schedule generated when a loan becomes active, with payments tracked until the loan is completed",
      ],
    },
    {
      area: "Client portal",
      items: [
        "Self-service profile with photo upload",
        "Personal views of applications, loans, and payment history",
        "In-app notifications with an unread counter",
      ],
    },
    {
      area: "Risk assessment",
      items: [
        "Credit-risk scoring through a Flask service serving a neural-network model",
        "A stored risk assessment (level and score) attached to every loan",
      ],
    },
  ],

  outcome:
    "A complete, working product that covers the full credit lifecycle across three user roles, where the business rules cannot be bypassed from the interface and the core services are covered by unit tests.",

  architectureSummary:
    "The React 19 single-page application mounts a different route tree for staff and for clients and talks to the backend through a shared Axios client that attaches the JWT. The Spring Boot API follows a layered design: controllers handle the HTTP boundary, services own the business rules, Spring Data JPA repositories manage persistence in MySQL, and one mapper per entity keeps JPA entities out of the public API contract. Spring Security validates the JWT on every request and applies role rules centrally. Credit-risk scoring is delegated over HTTP to a separate Flask service that serves a scikit-learn neural network trained on historical loan data.",

  architectureDiagram: [
    "┌──────────────────────┐        ┌───────────────────────┐",
    "│     React 19 SPA     │  JWT   │    Spring Boot API    │",
    "│  staff workspace     │───────▶│                       │",
    "│  client portal       │        │  JWT filter + roles   │",
    "└──────────────────────┘        │          ↓            │",
    "                                │  Controllers          │",
    "                                │          ↓            │",
    "                                │  DTOs / Mappers       │",
    "                                │          ↓            │",
    "                                │  Services             │",
    "                                │  - eligibility rules  │",
    "                                │  - loan state machine │",
    "                                │  - payment schedule   │",
    "                                └─────┬────────────┬────┘",
    "                                      │            │ RestClient",
    "                              ┌───────▼───────┐ ┌──▼────────────┐",
    "                              │ Spring Data   │ │   Flask API   │",
    "                              │ JPA · MySQL   │ │ neural network│",
    "                              │ clients loans │ │ risk scoring  │",
    "                              │ payments      │ └───────────────┘",
    "                              └───────────────┘",
  ],

  decisions: [
    {
      title: "Model the workflow before writing endpoints",
      detail:
        "The application follows the real sequence of a lending process: register, complete a profile, apply, get reviewed, receive a loan, repay it. Each step has explicit preconditions, so the API reflects how the business works instead of exposing generic CRUD on every table.",
    },
    {
      title: "Business rules live in the service layer",
      detail:
        "Eligibility checks, schedule generation, and status transitions all sit in services. Controllers only translate HTTP into service calls. Loan status is a controlled state machine: a loan moves to COMPLETED once every installment is paid and back to ACTIVE if a payment is reverted, and that transition lives in one place.",
    },
    {
      title: "Ownership-safe endpoints for clients",
      detail:
        "Every client-facing /me endpoint resolves the caller from the authenticated JWT rather than trusting an ID sent by the browser, so a client can never read or act on another client's data by changing a request parameter.",
    },
    {
      title: "Business references instead of technical IDs",
      detail:
        "Database primary keys stay internal, while API consumers identify clients through references such as CLI-1. The external contract stays independent of the persistence layer.",
    },
    {
      title: "Safe approval under concurrency",
      detail:
        "An application is re-validated with row-level locking at decision time, so two reviewers acting at the same moment cannot approve the same request twice or create duplicate loans.",
    },
    {
      title: "Risk scoring as a separate service",
      detail:
        "The Python model runs behind its own Flask API and is called from Spring through RestClient. The banking API stays independent of the ML stack, and the model can be retrained without touching the Java code.",
    },
  ],

  testing: [
    "Seven JUnit 5 and Mockito test classes cover the core services: clients, applications, loans, payments, users, and risk assessment.",
    "A contract test checks the request and response shape exchanged with the ML scoring service.",
    "Endpoints are exercised with Postman and Swagger UI across success and business-error scenarios.",
    "A global @RestControllerAdvice maps around eighteen business exceptions to one consistent ApiError response.",
  ],

  deployment: [
    "The Spring Boot API, React frontend, MySQL database, and Flask ML service currently run as independent components in development.",
    "The frontend proxies API calls to the same origin in development, keeping endpoint configuration out of application code.",
    "Containerization and hosting are planned as next steps rather than added before the product workflow was complete.",
  ],

  security: [
    "Stateless JWT authentication (HS512) with BCrypt password hashing.",
    "Role rules declared centrally in the Spring Security configuration and mirrored by role-specific frontend routes.",
    "Client /me endpoints derive identity from the token, never from a client-supplied ID.",
    "Role assignment is restricted: no account can be promoted to administrator through the API.",
  ],

  metrics: [
    { label: "User roles", value: "3" },
    { label: "Test classes", value: "7" },
    { label: "Scope", value: "Full stack" },
    { label: "Risk model", value: "Neural network" },
  ],

  stack: [
    "Java 21",
    "Spring Boot",
    "Spring Security",
    "JWT",
    "Spring Data JPA",
    "MySQL",
    "React",
    "Vite",
    "Tailwind CSS",
    "Axios",
    "i18next",
    "Python",
    "Flask",
    "Scikit-learn",
    "JUnit 5",
    "Mockito",
    "Swagger / OpenAPI",
  ],

  github: "https://github.com/mohcinelamtanez/BanqueApp-SpringBoot.git",
  featured: true,
},

{
  slug: "medpredict",
  name: "MedPredict",
  tagline:
    "A medical practice management platform that combines role-based clinical workflows, automatic patient reminders, and a machine-learning assistant that suggests likely diagnoses from symptoms.",
  collaboration: "Team project",

  problem:
    "A medical practice has to coordinate patients, doctors, appointments, consultations, and prescriptions across staff with very different responsibilities, while patients expect to book and follow their own care online. Reminders are often handled by hand, and doctors get little help when narrowing down a diagnosis from a list of symptoms.",

  solution:
    "We built a single role-aware platform for the whole practice: a REST API that models the clinical workflow for each type of user, a patient portal for self-service booking, background jobs that send confirmations and reminders automatically, and a separate machine-learning service that suggests the three most likely pathologies during a consultation, while the final diagnosis always stays with the doctor.",

  features: [
    {
      area: "Practice management",
      items: [
        "Patient and doctor records with medical history, allergies, and specialisations",
        "Appointments with a calendar view, a status workflow, and slot-conflict checks",
        "Consultations with symptom autocomplete and prescriptions exported as PDF",
      ],
    },
    {
      area: "Roles & patient portal",
      items: [
        "Four roles: admin, doctor, secretary, and patient",
        "Patients book, edit, and cancel their own appointments and see their records",
        "A FAQ chatbot to guide patients through the portal",
      ],
    },
    {
      area: "Automation",
      items: [
        "Booking confirmation emails sent in the background",
        "Daily 08:00 reminders for next-day appointments",
        "Dashboard of consultation trends, top pathologies, and AI usage",
      ],
    },
    {
      area: "AI-assisted diagnosis",
      items: [
        "Random Forest model trained with scikit-learn on symptom data",
        "Top-3 pathology suggestions with confidence scores, stored alongside the doctor's own diagnosis",
      ],
    },
  ],

  outcome:
    "A working platform that covers the daily operations of a practice for four types of users, takes repetitive reminders off the staff's plate, and brings AI into the consultation as decision support rather than an automated verdict.",

  architectureSummary:
    "A Django REST Framework API exposes patients, doctors, appointments, consultations, prescriptions, dashboard statistics, and a patient portal. ViewSets and APIViews handle the HTTP boundary, serializers own validation and representation, and DRF permission classes enforce four roles: admin, doctor, secretary, and patient. PostgreSQL stores the clinical data, with JSON fields for symptom lists, AI suggestions, and prescribed medications. Appointment confirmations and a daily 08:00 reminder job are pushed to Celery workers through Redis, with schedules managed by django-celery-beat. Diagnosis suggestions come from a separate Flask service that serves a scikit-learn Random Forest and returns the three most likely pathologies with confidence scores. A React and Vite frontend consumes the API through Axios, and the whole stack runs as Docker Compose services.",

  architectureDiagram: [
    "┌──────────────────┐         ┌───────────────────────┐",
    "│    React SPA     │  /api   │    Django REST API    │",
    "│   Vite · Axios   │────────▶│                       │",
    "└────────┬─────────┘         │  ViewSets / APIViews  │",
    "         │                   │          ↓            │",
    "         │                   │  Serializers          │",
    "         │                   │  - input validation   │",
    "         │                   │  - slot conflicts     │",
    "         │                   │          ↓            │",
    "         │                   │  Role permissions     │",
    "         │                   │  admin · doctor ·     │",
    "         │                   │  secretary · patient  │",
    "         │                   └─────┬────────────┬────┘",
    "         │                         │            │ .delay()",
    "         │                 ┌───────▼───────┐ ┌──▼──────────┐",
    "         │                 │  PostgreSQL   │ │    Redis    │",
    "         │                 │ patients      │ │   broker    │",
    "         │                 │ appointments  │ └──────┬──────┘",
    "         │                 │ consultations │        │",
    "         │                 └───────────────┘ ┌──────▼──────┐",
    "         │                                   │   Celery    │",
    "         │                                   │ worker/beat │",
    "         │                                   │ 08:00 daily │",
    "         │                                   └──────┬──────┘",
    "         │ /predict                                 │ SMTP",
    "         ▼                                          ▼",
    "┌─────────────────┐                        reminder emails",
    "│    Flask API    │",
    "│  Random Forest  │",
    "│  top-3 disease  │",
    "└─────────────────┘",
  ],

  decisions: [
    {
      title: "Role-based access through composable DRF permission classes",
      detail:
        "A custom User model carries a role (admin, doctor, secretary, patient), and small permission classes such as IsAdminOrDoctor and IsDoctorOrSecretary are attached per endpoint. Consultations, prescriptions, and dashboard statistics stay restricted to clinical staff, user management to administrators, and scheduling is shared between doctors and secretaries, so access rules are declared next to each endpoint rather than scattered through view logic.",
    },
    {
      title: "A patient portal scoped to the authenticated user's own records",
      detail:
        "Patient accounts are linked one-to-one to a Patient profile. Portal endpoints resolve that profile from the JWT user instead of accepting a patient identifier from the client, so patients can view their appointments, consultations, and prescriptions, and book, edit, or cancel appointments, without being able to address anyone else's data.",
    },
    {
      title: "Asynchronous notifications with Celery and Redis",
      detail:
        "Booking confirmations are dispatched with .delay() after an appointment is created, and a Celery Beat schedule sends reminders every morning at 08:00 for appointments in the next 24 hours. Email delivery never blocks an API response, and schedules are stored in the database through django-celery-beat so they can be adjusted from the Django admin without a redeploy.",
    },
    {
      title: "Machine-learning inference isolated in its own service",
      detail:
        "Symptoms are encoded as a binary feature vector and scored by a Random Forest served from a dedicated Flask API. The model, label encoder, and ordered feature list are persisted as separate artifacts, with the feature list acting as the model's input contract. Keeping the Python ML stack out of the Django process lets the model be retrained and redeployed independently of the clinical application.",
    },
    {
      title: "Decision support, not automated diagnosis",
      detail:
        "The model returns the three most likely pathologies with a confidence score, and the consultation stores the AI suggestion and the physician's own diagnosis in separate fields. The final diagnosis always stays with the doctor, and keeping both values makes it possible to measure model agreement against real clinical decisions over time.",
    },
    {
      title: "Scheduling rules enforced at the API boundary",
      detail:
        "Appointments follow an explicit status workflow (planned, confirmed, in progress, completed, cancelled), and serializers and portal views reject bookings that conflict with an existing slot for the same doctor. Business validation therefore applies equally to staff-created and patient-created appointments rather than depending on frontend checks.",
    },
  ],

  testing: [
    "API endpoints are exercised through the auto-generated Swagger UI and ReDoc documentation using JWT bearer authentication.",
    "Role-specific flows are verified manually for admin, doctor, secretary, and patient accounts, including access that must be refused.",
    "The reminder pipeline can be triggered on demand through an admin endpoint or a standalone script to validate Celery tasks and email delivery without waiting for the daily schedule.",
    "The model is evaluated on a stratified 80/20 train/test split, and the next step is automated coverage with pytest-django for the permission matrix and scheduling rules, plus top-3 accuracy and macro-F1 reporting for the model.",
  ],

  deployment: [
    "The backend, PostgreSQL, Redis, Celery worker, Celery Beat, and ML service are orchestrated with Docker Compose, with health checks gating the backend on database readiness.",
    "A development compose overlay adds the Vite frontend with hot reload, while a multi-stage frontend image serves the production build through Nginx, which also proxies /api to the backend.",
    "Configuration such as database credentials, Redis URL, JWT signing key, and SMTP settings is supplied through environment variables.",
    "Moving to gunicorn, collected static files, and a production compose profile is planned as the next infrastructure step.",
  ],

  security: [
    "Authentication uses short-lived JWT access tokens (1 hour) with rotating refresh tokens (7 days) through SimpleJWT.",
    "Every API endpoint requires authentication by default, with role-specific permission classes layered on top.",
    "Patient portal endpoints derive the patient from the authenticated account, so patients cannot query other patients' records by identifier.",
    "Hardening is actively in progress: routing ML predictions through an authenticated Django endpoint, tightening CORS to an allow-list, and applying role checks consistently to every resource.",
  ],

  metrics: [
    { label: "User roles", value: "4" },
    { label: "Compose services", value: "6" },
    { label: "Scope", value: "Full stack" },
    { label: "AI output", value: "Top-3 diagnoses" },
  ],

  stack: [
    "Python",
    "Django",
    "Django REST Framework",
    "SimpleJWT",
    "PostgreSQL",
    "Celery",
    "Redis",
    "Flask",
    "Scikit-learn",
    "React",
    "Vite",
    "Tailwind CSS",
    "Docker",
    "Swagger",
  ],

  github: "https://github.com/mohcinelamtanez/medPredict.git",
  featured: true,
},

];

export const featuredProjects = projects.filter((p) => p.featured);
