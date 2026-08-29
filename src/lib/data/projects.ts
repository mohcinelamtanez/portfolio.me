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

];

export const featuredProjects = projects.filter((p) => p.featured);
