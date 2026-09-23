import type { ProjectCaseStudy } from "@/types/content";

export const projects: ProjectCaseStudy[] = [
 {
  slug: "banqueapp",
  name: "BanqueApp",
  tagline:
    "A full-stack loan management platform combining banking workflows, secure REST APIs, and machine-learning-based credit risk assessment.",

  problem:
    "Loan management applications need to coordinate customer information, loan lifecycle operations, repayment calculations, access control, and credit-risk evaluation without tightly coupling business rules to the user interface or persistence layer. BanqueApp was built to explore how these concerns can be separated into a maintainable application architecture while exposing a clean REST API to the frontend.",

  architectureSummary:
    "A Spring Boot REST API exposes client and loan management use cases through DTO-based request and response models. Controllers handle the HTTP boundary, services contain business rules, Spring Data JPA repositories manage persistence in MySQL, and mapper components isolate JPA entities from the external API contract. Technical database identifiers remain internal while business references such as CLI-1 are exposed to API consumers. Authentication and authorization are handled with Spring Security and JWT. Credit-risk prediction is delegated to a separate Flask API exposing a Logistic Regression model, while the React frontend consumes the application APIs through Axios.",

  architectureDiagram: [
    "┌──────────────────┐        ┌──────────────────────┐",
    "│   React Frontend │───────▶│   Spring Boot API    │",
    "│   Axios / REST   │        │                      │",
    "└──────────────────┘        │  Controllers         │",
    "                            │       ↓              │",
    "                            │  DTOs / Mappers      │",
    "                            │       ↓              │",
    "                            │  Services            │",
    "                            │  - business rules    │",
    "                            │  - client lifecycle  │",
    "                            │  - loan management   │",
    "                            └───────┬───────┬──────┘",
    "                                    │       │",
    "                            ┌───────▼───┐   │",
    "                            │ Spring Data│   │",
    "                            │    JPA     │   │",
    "                            └───────┬────┘   │",
    "                                    │        │",
    "                            ┌───────▼────┐   │",
    "                            │   MySQL    │   │",
    "                            │ Clients    │   │",
    "                            │ Loans      │   │",
    "                            └────────────┘   │",
    "                                             │ risk request",
    "                                             ▼",
    "                                      ┌───────────────┐",
    "                                      │   Flask API   │",
    "                                      │ Logistic      │",
    "                                      │ Regression ML │",
    "                                      └───────────────┘",
  ],

  decisions: [
    {
      title: "Business references instead of exposing technical IDs",
      detail:
        "Database primary keys remain an internal persistence concern, while API consumers identify resources through business-facing references such as CLI-1. This keeps the external API contract independent from internal database identifiers and allows JPA to continue using technical IDs for entity relationships.",
    },
    {
      title: "DTOs and mappers isolate the REST contract from persistence",
      detail:
        "Request and response DTOs define exactly what the frontend can send and receive, while mapper components translate between DTOs and JPA entities. Update operations modify an existing managed entity rather than constructing a new one, preventing accidental inserts and protecting fields that are not meant to be changed by the client.",
    },
    {
      title: "Business rules live in the service layer",
      detail:
        "Controllers remain focused on HTTP concerns while services coordinate repository access and domain rules such as client creation, status transitions, reference generation, email uniqueness, and loan-related operations. This keeps transport concerns separate from application behavior.",
    },
    {
      title: "Centralized REST error handling",
      detail:
        "Business exceptions such as missing clients or conflicting data are translated into meaningful HTTP responses through a global @RestControllerAdvice. The API preserves HTTP semantics while returning structured error information that frontend clients can interpret without duplicating exception-handling logic across controllers.",
    },
    {
      title: "Machine-learning risk assessment as a separate service",
      detail:
        "Credit-risk prediction is exposed through a dedicated Flask API rather than embedding the Python model directly inside the Java application. The Spring application exchanges structured data with the ML service, keeping the prediction component independently maintainable from the core banking API.",
    },
  ],

  testing: [
    "REST endpoints are exercised with Postman across client management, loan operations, and credit-risk prediction flows.",
    "API behavior is verified for successful requests as well as business-error scenarios such as missing resources, duplicate data, and invalid operations.",
    "The project is being progressively structured for automated service and controller testing with JUnit 5 and Mockito.",
    "Persistence behavior is validated against MySQL while debugging JPA entity lifecycle, generated identifiers, relationships, and update semantics.",
  ],

  deployment: [
    "The Spring Boot backend, React frontend, MySQL database, and Flask ML service are currently developed and tested as independently running application components.",
    "Environment-specific API configuration keeps frontend-to-backend and backend-to-ML communication separated from application code.",
    "The project is actively evolving toward a more production-oriented setup, with deployment and containerization treated as later infrastructure concerns rather than prematurely adding operational complexity.",
  ],

  security: [
    "Spring Security and JWT are used to separate authentication from authorization and protect role-specific API routes.",
    "JWT authorization is handled through a request filter that restores authenticated user information into the Spring Security context.",
    "Technical database IDs are intentionally kept out of the public API in favor of business references.",
    "Client lifecycle rules favor status-based deactivation over destructive deletion where historical banking information must be preserved.",
  ],

  metrics: [
    { label: "Client records", value: "228+" },
    { label: "Loan records", value: "244+" },
    { label: "ML approach", value: "Logistic Regression" },
    { label: "Architecture", value: "Layered REST API" },
  ],

  stack: [
    "Java 21",
    "Spring Boot",
    "Spring Data JPA",
    "Spring Security",
    "JWT",
    "MySQL",
    "React",
    "Axios",
    "Python",
    "Flask",
    "Scikit-learn",
    "Postman",
  ],

  github: "https://github.com/mohcinelamtanez/BanqueApp-SpringBoot.git",
  apiDocsUrl: "Not yet",
  featured: true,
},

{
  slug: "medpredict",
  name: "MedPredict",
  tagline:
    "A medical practice management platform combining role-based clinical workflows, asynchronous patient reminders, and a machine-learning service that suggests likely diagnoses from symptoms.",

  problem:
    "A medical practice has to coordinate patients, doctors, appointments, consultations, and prescriptions across staff with very different responsibilities, while patients expect to book and follow their own care online. MedPredict was built to explore how these workflows can be modelled behind a single role-aware REST API, how time-based work such as appointment reminders can be moved out of the request cycle, and how a machine-learning model can assist, not replace, the physician during a consultation.",

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
    { label: "ML approach", value: "Random Forest" },
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
