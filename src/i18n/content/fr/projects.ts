import type { ProjectCaseStudy } from "@/types/content";

/**
 * French text for each project, keyed by slug. Only language-dependent fields
 * are listed here; the stack, links and architecture diagrams are shared with
 * the English source in `src/lib/data/projects.ts`.
 */
export type ProjectTranslation = Pick<
  ProjectCaseStudy,
  | "tagline"
  | "collaboration"
  | "problem"
  | "solution"
  | "features"
  | "outcome"
  | "architectureSummary"
  | "decisions"
  | "testing"
  | "deployment"
  | "security"
  | "metrics"
>;

export const projectsFr: Record<string, ProjectTranslation> = {
  teamtrackingapp: {
    tagline:
      "Un outil léger de suivi des tâches pour une petite équipe opérationnelle : le support planifie qui prend en charge quelle tâche chaque semaine, les agents confirment leur travail chaque jour, et l'entraide entre collègues devient enfin visible.",

    problem:
      "Dans une petite équipe opérationnelle, une personne du support répartit chaque semaine des types de tâches récurrents entre les agents, puis doit savoir chaque jour qui a fait sa part et qui est venu aider sur une tâche qui n'était pas la sienne. Quand ce suivi se fait à la main, le support manque de visibilité au quotidien, et l'aide que les agents s'apportent passe facilement inaperçue. J'ai identifié ce besoin au sein de l'équipe d'opérations B2B dans laquelle je travaille chez TELUS International, et j'ai conçu et développé TeamTrackingApp dans le cadre de mon poste pour le digitaliser (voir Expérience).",

    solution:
      "J'ai volontairement gardé un produit simple, calqué sur le vocabulaire de l'équipe : une affectation hebdomadaire signifie « cet agent est responsable de cette tâche cette semaine », une validation quotidienne signifie « fait aujourd'hui », et une aide signifie « j'ai aussi aidé sur cette tâche aujourd'hui ». Le support planifie la semaine et consulte les rapports ; les agents ne voient et ne valident que leurs propres tâches, pour le jour même. Séparer l'aide des affectations officielles permet de reconnaître l'effort supplémentaire sans brouiller qui était responsable.",

    features: [
      {
        area: "Espace support",
        items: [
          "Planification hebdomadaire : autant d'agents que nécessaire sur chaque type de tâche (GTPS, WIP/IP, VOIP)",
          "Reprise des affectations de la semaine précédente en un clic, en ignorant les agents désactivés",
          "Suivi du jour et rapport hebdomadaire, chacun avec une version texte à copier dans le reporting opérationnel",
        ],
      },
      {
        area: "Espace agent",
        items: [
          "Vue du jour : valider une tâche affectée, ou annuler la validation, uniquement pour aujourd'hui",
          "Déclarer une aide apportée sur une autre tâche, avec une note facultative",
          "Historique personnel des semaines passées et des aides déclarées",
        ],
      },
      {
        area: "Équipe & accès",
        items: [
          "Deux rôles, Support et Agent, appliqués par l'API et pas seulement masqués dans l'interface",
          "Le support gère les comptes : création d'agents, renommage, réinitialisation de mot de passe, désactivation",
          "Un compte désactivé perd l'accès immédiatement, même si son token est encore valide",
        ],
      },
      {
        area: "Règles du workflow",
        items: [
          "Un même agent ne peut pas avoir deux fois la même tâche dans la semaine",
          "Une affectation qui a déjà des jours validés ne peut pas être supprimée : l'historique est conservé",
          "Un agent ne peut pas déclarer une aide sur une tâche qui lui est déjà officiellement affectée",
        ],
      },
    ],

    outcome:
      "Une application full stack fonctionnelle qui transforme une routine hebdomadaire manuelle en un outil partagé : le support dispose d'une vue quotidienne et hebdomadaire du travail de l'équipe, les agents voient leur entraide reconnue, et les règles métier du workflow sont appliquées par le backend et couvertes par des tests d'intégration de l'API.",

    architectureSummary:
      "L'application monopage React 19, construite avec Vite, monte un arbre de routes distinct pour chaque rôle et communique avec le backend via un client Axios qui ajoute le JWT. L'API Spring Boot 4 est organisée par fonctionnalité métier (affectations, validations, aides, rapports, utilisateurs), chacune avec son controller, son service, son repository et ses DTOs. L'authentification s'appuie sur le support JWT intégré à Spring Security : le token ne contient que l'identifiant de l'utilisateur, et le rôle comme le statut actif sont relus en base à chaque requête, si bien qu'une désactivation prend effet immédiatement. Les règles métier vivent dans des services transactionnels, appuyées par des contraintes en base, et un gestionnaire d'exceptions global renvoie des erreurs JSON cohérentes. Les données sont stockées dans MySQL via Spring Data JPA ; les tests d'intégration tournent sur une base H2 en mémoire.",

    decisions: [
      {
        title: "Partir du workflow et garder un périmètre réduit",
        detail:
          "L'application couvre exactement la boucle que l'équipe répète chaque semaine : planifier, valider, aider, rapporter. Il n'y a pas de couche générique de gestion de projet : chaque écran correspond à une vraie étape de la routine, et l'outil reste rapide à adopter.",
      },
      {
        title: "Affectations officielles et entraide sont deux concepts distincts",
        detail:
          "Les aides sont stockées dans leur propre table et ne sont jamais liées aux affectations. Déclarer une aide ne peut donc pas changer qui était officiellement responsable, et le rapport peut montrer les deux côte à côte.",
      },
      {
        title: "Préserver l'historique plutôt que permettre des modifications silencieuses",
        detail:
          "Une affectation qui a déjà des jours validés ne peut pas être supprimée, et les agents ne peuvent valider ou annuler que le travail du jour. Les données consultées par le support restent fiables après coup.",
      },
      {
        title: "Des droits vérifiés en base à chaque requête",
        detail:
          "Le JWT ne sert qu'à identifier l'utilisateur. Le rôle et le statut actif sont relus en base à chaque requête : désactiver un agent s'applique immédiatement, sans attendre l'expiration de son token.",
      },
      {
        title: "Des règles appliquées dans les services et dans le schéma",
        detail:
          "Les services refusent les affectations en double, l'aide déclarée sur une tâche déjà affectée à l'agent, et toute action sur l'affectation de quelqu'un d'autre. Une contrainte d'unicité sur l'agent, la semaine et le type de tâche garantit la règle au niveau de la base.",
      },
      {
        title: "Des rapports pensés pour leur usage réel",
        detail:
          "Les rapports quotidien et hebdomadaire se copient en texte brut, au format d'un reporting opérationnel : l'outil s'insère dans la routine de reporting existante au lieu d'en ajouter une nouvelle.",
      },
    ],

    testing: [
      "Six tests d'intégration Spring Boot testent l'API via MockMvc sur une base H2 en mémoire, sans avoir besoin de MySQL.",
      "Les tests couvrent les échecs d'authentification, la séparation des rôles entre endpoints Support et Agent, les règles d'affectation, la validation limitée à ses propres tâches, l'aide enregistrée à part des affectations et la perte d'accès d'un compte désactivé.",
      "La validation des requêtes et un gestionnaire d'exceptions global renvoient des erreurs JSON cohérentes pour les saisies invalides, les conflits et les ressources introuvables.",
    ],

    deployment: [
      "Le backend et le frontend tournent en local comme deux applications ; en développement, Vite relaie /api vers le serveur Spring Boot.",
      "L'URL de la base, les identifiants, le secret JWT et le premier compte Support se configurent par variables d'environnement, et l'application refuse de démarrer si le secret JWT est trop court.",
      "Le schéma MySQL est créé automatiquement au premier démarrage, et un compte Support est créé lorsque la table des utilisateurs est vide.",
    ],

    security: [
      "Authentification JWT stateless via le support resource server de Spring Security, avec hachage des mots de passe par BCrypt.",
      "Règles de rôles déclarées de manière centralisée : les endpoints agent sous /api/me exigent AGENT ; la planification, les rapports et la gestion des utilisateurs exigent SUPPORT.",
      "Un agent qui demande l'affectation de quelqu'un d'autre reçoit une réponse « introuvable » : les données des autres ne sont pas révélées.",
      "Le support ne peut pas désactiver son propre compte, ce qui évite de bloquer l'accès à toute l'équipe.",
    ],

    metrics: [
      { label: "Rôles utilisateurs", value: "2" },
      { label: "Tests d'intégration", value: "6" },
      { label: "Périmètre", value: "Full stack" },
      { label: "Workflow", value: "Hebdo + quotidien" },
    ],
  },

  banqueapp: {
    tagline:
      "Une plateforme de crédit full stack qui accompagne un prêt à la consommation de la première demande du client jusqu'au dernier remboursement, avec des espaces dédiés au personnel de la banque et un portail en libre-service pour les clients.",

    problem:
      "Un établissement de crédit doit gérer toute la vie d'un prêt : l'enregistrement des clients, la collecte des demandes, la vérification de l'éligibilité, l'évaluation du risque, l'octroi du prêt et le suivi de chaque mensualité. Plusieurs acteurs interviennent dans ce processus (administrateurs, agents bancaires et clients), et chacun ne doit voir et faire que ce que son rôle autorise. Quand ces règles ne vivent que dans l'interface ou sont dispersées dans le code, elles sont faciles à contourner et difficiles à faire évoluer.",

    solution:
      "J'ai d'abord modélisé le vrai workflow de crédit (qui agit, dans quel ordre et selon quelles règles), puis j'ai construit le produit autour : une API Spring Boot qui porte l'ensemble des règles métier et des permissions, une application React qui affiche un espace différent selon l'utilisateur connecté, et un service de machine learning séparé qui évalue le risque de crédit avant l'approbation d'un prêt.",

    features: [
      {
        area: "Accès & rôles",
        items: [
          "Inscription et connexion avec une authentification JWT stateless",
          "Trois rôles (administrateur, agent bancaire, client) appliqués côté serveur, et pas seulement masqués dans l'interface",
          "Gestion des utilisateurs par l'administrateur : création de comptes et attribution des rôles",
        ],
      },
      {
        area: "Workflow de crédit",
        items: [
          "Enregistrement des clients avec des références métier (CLI-1) plutôt que des identifiants de base de données",
          "Demandes de prêt avec contrôle d'éligibilité : profil complet, aucun prêt actif, aucune demande en attente",
          "File de revue pour les agents, avec des décisions d'approbation ou de refus qui créent automatiquement le prêt",
          "Échéancier mensuel généré à l'activation du prêt, avec un suivi des paiements jusqu'à sa clôture",
        ],
      },
      {
        area: "Portail client",
        items: [
          "Profil en libre-service avec upload de photo",
          "Vues personnelles des demandes, des prêts et de l'historique des paiements",
          "Notifications dans l'application avec un compteur de non-lus",
        ],
      },
      {
        area: "Évaluation du risque",
        items: [
          "Scoring du risque de crédit via un service Flask qui expose un modèle de réseau de neurones",
          "Une évaluation du risque (niveau et score) enregistrée pour chaque prêt",
        ],
      },
    ],

    outcome:
      "Un produit complet et fonctionnel qui couvre tout le cycle de vie d'un crédit pour trois rôles utilisateurs, où les règles métier ne peuvent pas être contournées depuis l'interface et où les services principaux sont couverts par des tests unitaires.",

    architectureSummary:
      "L'application monopage React 19 monte un arbre de routes différent pour le personnel et pour les clients, et communique avec le backend via un client Axios partagé qui ajoute le JWT à chaque requête. L'API Spring Boot suit une architecture en couches : les controllers gèrent la frontière HTTP, les services portent les règles métier, les repositories Spring Data JPA gèrent la persistance dans MySQL, et un mapper par entité tient les entités JPA à l'écart du contrat public de l'API. Spring Security valide le JWT à chaque requête et applique les règles de rôles de manière centralisée. Le scoring du risque de crédit est délégué en HTTP à un service Flask séparé, qui expose un réseau de neurones scikit-learn entraîné sur des données historiques de prêts.",

    decisions: [
      {
        title: "Modéliser le workflow avant d'écrire les endpoints",
        detail:
          "L'application suit la séquence réelle d'un processus de crédit : s'inscrire, compléter son profil, faire une demande, être évalué, obtenir un prêt, le rembourser. Chaque étape a des préconditions explicites, si bien que l'API reflète le fonctionnement du métier au lieu d'exposer un CRUD générique sur chaque table.",
      },
      {
        title: "Les règles métier vivent dans la couche service",
        detail:
          "Les contrôles d'éligibilité, la génération des échéanciers et les changements de statut se trouvent tous dans les services. Les controllers se contentent de traduire le HTTP en appels de service. Le statut d'un prêt est une machine à états contrôlée : un prêt passe à COMPLETED dès que toutes les mensualités sont payées, et revient à ACTIVE si un paiement est annulé, et cette transition est définie à un seul endroit.",
      },
      {
        title: "Des endpoints client sûrs vis-à-vis de la propriété des données",
        detail:
          "Chaque endpoint /me côté client identifie l'appelant à partir du JWT authentifié plutôt que de faire confiance à un identifiant envoyé par le navigateur. Un client ne peut donc jamais lire ou modifier les données d'un autre client en changeant un paramètre de requête.",
      },
      {
        title: "Des références métier plutôt que des identifiants techniques",
        detail:
          "Les clés primaires restent internes à la base de données, tandis que les consommateurs de l'API identifient les clients par des références comme CLI-1. Le contrat externe reste ainsi indépendant de la couche de persistance.",
      },
      {
        title: "Une approbation sûre en cas d'accès concurrents",
        detail:
          "Une demande est revalidée avec un verrouillage au niveau de la ligne au moment de la décision, afin que deux évaluateurs agissant au même instant ne puissent pas approuver deux fois la même demande ni créer de prêts en double.",
      },
      {
        title: "Le scoring du risque dans un service séparé",
        detail:
          "Le modèle Python tourne derrière sa propre API Flask et est appelé depuis Spring via RestClient. L'API bancaire reste indépendante de la stack ML, et le modèle peut être réentraîné sans toucher au code Java.",
      },
    ],

    testing: [
      "Sept classes de tests JUnit 5 et Mockito couvrent les services principaux : clients, demandes, prêts, paiements, utilisateurs et évaluation du risque.",
      "Un test de contrat vérifie le format des requêtes et des réponses échangées avec le service de scoring ML.",
      "Les endpoints sont testés avec Postman et Swagger UI, sur les cas de succès comme sur les erreurs métier.",
      "Un @RestControllerAdvice global convertit environ dix-huit exceptions métier en une réponse ApiError unique et cohérente.",
    ],

    deployment: [
      "L'API Spring Boot, le frontend React, la base MySQL et le service ML Flask tournent aujourd'hui comme des composants indépendants en développement.",
      "En développement, le frontend relaie les appels API vers la même origine, ce qui garde la configuration des endpoints hors du code applicatif.",
      "La conteneurisation et l'hébergement sont prévus comme prochaines étapes, plutôt qu'ajoutés avant que le workflow produit soit complet.",
    ],

    security: [
      "Authentification JWT stateless (HS512) avec hachage des mots de passe via BCrypt.",
      "Règles de rôles déclarées de manière centralisée dans la configuration Spring Security, et reflétées par des routes frontend spécifiques à chaque rôle.",
      "Les endpoints client /me déduisent l'identité du token, jamais d'un identifiant fourni par le client.",
      "L'attribution des rôles est restreinte : aucun compte ne peut être promu administrateur via l'API.",
    ],

    metrics: [
      { label: "Rôles utilisateurs", value: "3" },
      { label: "Classes de tests", value: "7" },
      { label: "Périmètre", value: "Full stack" },
      { label: "Modèle de risque", value: "Réseau de neurones" },
    ],
  },

  medpredict: {
    tagline:
      "Une plateforme de gestion de cabinet médical qui combine des workflows cliniques par rôle, des rappels automatiques pour les patients et un assistant de machine learning qui suggère des diagnostics probables à partir des symptômes.",
    collaboration: "Projet d'équipe",

    problem:
      "Un cabinet médical doit coordonner patients, médecins, rendez-vous, consultations et ordonnances entre des membres du personnel aux responsabilités très différentes, tandis que les patients s'attendent à pouvoir réserver et suivre leurs soins en ligne. Les rappels sont souvent gérés à la main, et les médecins disposent de peu d'aide pour affiner un diagnostic à partir d'une liste de symptômes.",

    solution:
      "Nous avons construit une plateforme unique qui tient compte des rôles pour tout le cabinet : une API REST qui modélise le workflow clinique de chaque type d'utilisateur, un portail patient pour la prise de rendez-vous en autonomie, des tâches en arrière-plan qui envoient automatiquement confirmations et rappels, et un service de machine learning séparé qui suggère les trois pathologies les plus probables pendant la consultation, le diagnostic final restant toujours au médecin.",

    features: [
      {
        area: "Gestion du cabinet",
        items: [
          "Dossiers patients et médecins avec antécédents médicaux, allergies et spécialisations",
          "Rendez-vous avec vue calendrier, workflow de statuts et contrôle des conflits de créneaux",
          "Consultations avec autocomplétion des symptômes et ordonnances exportées en PDF",
        ],
      },
      {
        area: "Rôles & portail patient",
        items: [
          "Quatre rôles : administrateur, médecin, secrétaire et patient",
          "Les patients réservent, modifient et annulent leurs propres rendez-vous et consultent leur dossier",
          "Un chatbot FAQ pour guider les patients dans le portail",
        ],
      },
      {
        area: "Automatisation",
        items: [
          "Emails de confirmation de rendez-vous envoyés en arrière-plan",
          "Rappels quotidiens à 8 h pour les rendez-vous du lendemain",
          "Tableau de bord sur l'évolution des consultations, les pathologies les plus fréquentes et l'usage de l'IA",
        ],
      },
      {
        area: "Diagnostic assisté par l'IA",
        items: [
          "Modèle Random Forest entraîné avec scikit-learn sur des données de symptômes",
          "Top 3 des pathologies suggérées avec un score de confiance, enregistré à côté du diagnostic du médecin",
        ],
      },
    ],

    outcome:
      "Une plateforme fonctionnelle qui couvre le quotidien d'un cabinet pour quatre types d'utilisateurs, décharge le personnel des rappels répétitifs et intègre l'IA à la consultation comme une aide à la décision plutôt qu'un verdict automatique.",

    architectureSummary:
      "Une API Django REST Framework expose les patients, les médecins, les rendez-vous, les consultations, les ordonnances, les statistiques du tableau de bord et un portail patient. Les ViewSets et APIViews gèrent la frontière HTTP, les serializers portent la validation et la représentation, et des classes de permission DRF appliquent quatre rôles : administrateur, médecin, secrétaire et patient. PostgreSQL stocke les données cliniques, avec des champs JSON pour les listes de symptômes, les suggestions de l'IA et les médicaments prescrits. Les confirmations de rendez-vous et un job de rappel quotidien à 8 h sont confiés à des workers Celery via Redis, avec des plannings gérés par django-celery-beat. Les suggestions de diagnostic viennent d'un service Flask séparé qui expose un Random Forest scikit-learn et renvoie les trois pathologies les plus probables avec leur score de confiance. Un frontend React et Vite consomme l'API via Axios, et l'ensemble de la stack tourne sous forme de services Docker Compose.",

    decisions: [
      {
        title: "Un contrôle d'accès par rôle via des classes de permission DRF composables",
        detail:
          "Un modèle User personnalisé porte un rôle (administrateur, médecin, secrétaire, patient), et de petites classes de permission comme IsAdminOrDoctor et IsDoctorOrSecretary sont attachées à chaque endpoint. Consultations, ordonnances et statistiques restent réservées au personnel soignant, la gestion des utilisateurs aux administrateurs, et la planification est partagée entre médecins et secrétaires : les règles d'accès sont déclarées à côté de chaque endpoint plutôt que dispersées dans la logique des vues.",
      },
      {
        title: "Un portail patient limité aux données de l'utilisateur connecté",
        detail:
          "Les comptes patients sont liés à un profil Patient par une relation un-à-un. Les endpoints du portail retrouvent ce profil à partir de l'utilisateur du JWT au lieu d'accepter un identifiant patient envoyé par le client : les patients consultent leurs rendez-vous, consultations et ordonnances, et réservent, modifient ou annulent leurs rendez-vous, sans pouvoir accéder aux données de quelqu'un d'autre.",
      },
      {
        title: "Des notifications asynchrones avec Celery et Redis",
        detail:
          "Les confirmations de rendez-vous sont envoyées avec .delay() après la création d'un rendez-vous, et un planning Celery Beat envoie chaque matin à 8 h les rappels des rendez-vous des 24 heures suivantes. L'envoi d'emails ne bloque jamais une réponse de l'API, et les plannings sont stockés en base grâce à django-celery-beat, ce qui permet de les ajuster depuis l'admin Django sans redéploiement.",
      },
      {
        title: "L'inférence ML isolée dans son propre service",
        detail:
          "Les symptômes sont encodés en vecteur de caractéristiques binaire et évalués par un Random Forest exposé par une API Flask dédiée. Le modèle, l'encodeur de labels et la liste ordonnée des caractéristiques sont enregistrés comme des artefacts séparés, la liste des caractéristiques servant de contrat d'entrée du modèle. Garder la stack ML Python hors du processus Django permet de réentraîner et redéployer le modèle indépendamment de l'application clinique.",
      },
      {
        title: "Une aide à la décision, pas un diagnostic automatique",
        detail:
          "Le modèle renvoie les trois pathologies les plus probables avec un score de confiance, et la consultation enregistre la suggestion de l'IA et le diagnostic du médecin dans des champs séparés. Le diagnostic final reste toujours au médecin, et conserver les deux valeurs permet de mesurer dans le temps la concordance du modèle avec les décisions cliniques réelles.",
      },
      {
        title: "Les règles de planification appliquées au niveau de l'API",
        detail:
          "Les rendez-vous suivent un workflow de statuts explicite (planifié, confirmé, en cours, terminé, annulé), et les serializers comme les vues du portail refusent les réservations qui entrent en conflit avec un créneau existant du même médecin. La validation métier s'applique donc de la même façon aux rendez-vous créés par le personnel et par les patients, sans dépendre de contrôles côté frontend.",
      },
    ],

    testing: [
      "Les endpoints de l'API sont testés via la documentation Swagger UI et ReDoc générée automatiquement, avec une authentification JWT Bearer.",
      "Les parcours propres à chaque rôle sont vérifiés manuellement pour les comptes administrateur, médecin, secrétaire et patient, y compris les accès qui doivent être refusés.",
      "Le pipeline de rappels peut être déclenché à la demande via un endpoint d'administration ou un script dédié, pour valider les tâches Celery et l'envoi d'emails sans attendre le planning quotidien.",
      "Le modèle est évalué sur un découpage entraînement/test stratifié 80/20. La prochaine étape est une couverture automatisée avec pytest-django pour la matrice de permissions et les règles de planification, ainsi que le suivi de la précision top 3 et du macro-F1 pour le modèle.",
    ],

    deployment: [
      "Le backend, PostgreSQL, Redis, le worker Celery, Celery Beat et le service ML sont orchestrés avec Docker Compose, avec des health checks qui conditionnent le démarrage du backend à la disponibilité de la base.",
      "Une surcouche Compose de développement ajoute le frontend Vite avec rechargement à chaud, tandis qu'une image frontend multi-étapes sert le build de production via Nginx, qui relaie aussi /api vers le backend.",
      "La configuration (identifiants de base de données, URL Redis, clé de signature JWT, paramètres SMTP) est fournie par des variables d'environnement.",
      "Le passage à gunicorn, la collecte des fichiers statiques et un profil Compose de production sont prévus comme prochaine étape d'infrastructure.",
    ],

    security: [
      "L'authentification repose sur des tokens d'accès JWT de courte durée (1 heure) et des refresh tokens renouvelés (7 jours) via SimpleJWT.",
      "Chaque endpoint de l'API exige une authentification par défaut, avec des classes de permission par rôle ajoutées par-dessus.",
      "Les endpoints du portail patient déduisent le patient du compte authentifié : un patient ne peut pas interroger le dossier d'un autre patient par son identifiant.",
      "Le durcissement est en cours : faire passer les prédictions ML par un endpoint Django authentifié, restreindre CORS à une liste d'origines autorisées et appliquer les contrôles de rôles de façon homogène sur chaque ressource.",
    ],

    metrics: [
      { label: "Rôles utilisateurs", value: "4" },
      { label: "Services Compose", value: "6" },
      { label: "Périmètre", value: "Full stack" },
      { label: "Sortie de l'IA", value: "Top 3 diagnostics" },
    ],
  },
};
