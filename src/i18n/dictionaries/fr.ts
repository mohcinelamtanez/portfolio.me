import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries/en";

/** French UI copy. Must mirror every key of the English dictionary. */
export const fr: Dictionary = {
  common: {
    skipToContent: "Aller au contenu",
    booting: "démarrage du portfolio",
  },

  language: {
    label: "Langue",
  },

  nav: {
    primary: "Navigation principale",
    home: `${siteConfig.name} — accueil`,
    about: "À propos",
    projects: "Projets",
    skills: "Compétences",
    experience: "Parcours",
    contact: "Contact",
    openTerminal: "Ouvrir la palette de commandes",
    githubProfile: "Profil GitHub",
    linkedinProfile: "Profil LinkedIn",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
  },

  hero: {
    availability: "Ouvert aux postes de Product / Software Engineer junior",
    role: siteConfig.role,
    roleDetail: "Background en Software Engineering",
    tagline: "Je pars du problème, puis je construis le logiciel qui le résout.",
    description:
      "Product Engineer en début de carrière, avec une solide base en software engineering sur Java, Spring Boot et React. J'interviens sur l'ensemble du produit : clarifier le besoin, prioriser ce qui mérite d'être construit en premier, concevoir l'API et le modèle de données, puis livrer une solution sécurisée et maintenable. J'utilise l'IA lorsqu'elle apporte une vraie valeur.",
    ctaPrimary: "Voir mes réalisations",
    ctaResume: "Télécharger mon CV",
    locationLabel: "Localisation",
    location: "Casablanca, Maroc · Ouvert au télétravail",
    linkedin: "linkedin",
  },

  about: {
    eyebrow: "// 00 — à propos",
    title: "Product Engineer avec une solide base en software engineering",
    description:
      "Pour moi, le product engineering consiste à prendre en charge tout le chemin qui mène d'un besoin à une solution qui fonctionne. Je suis en 5e année à l'ISGA Casablanca, et c'est en construisant des produits complets que j'apprends le mieux : comprendre pour qui ils sont faits, choisir ce qu'il faut construire en premier, et livrer chaque couche en soignant la sécurité et la maintenabilité. L'IA fait partie de ma façon de travailler : dans les produits lorsqu'elle résout un vrai problème, et au quotidien pour prototyper, explorer et déboguer plus vite.",
    approach: [
      {
        step: "01",
        title: "Comprendre le besoin",
        body: "Avant de choisir un framework, je cherche à savoir qui utilisera le logiciel, ce que ces personnes veulent accomplir et quelles règles le produit doit respecter : rôles, workflows, cas limites.",
      },
      {
        step: "02",
        title: "Cadrer et concevoir",
        body: "Je décide quelles fonctionnalités comptent pour une première version et je conçois juste assez d'architecture pour les porter : le modèle de données, le contrat d'API et l'emplacement de chaque règle métier.",
      },
      {
        step: "03",
        title: "Construire de bout en bout",
        body: "Je connecte moi-même chaque couche : interfaces React, APIs Spring Boot ou Django, bases de données relationnelles et services externes comme des modèles de ML, des tâches en arrière-plan ou l'envoi d'emails.",
      },
      {
        step: "04",
        title: "Construire pour durer",
        body: "La sécurité, les tests et la documentation font partie du produit, pas d'une étape finale. Je garde des solutions assez simples pour être comprises et faciles à faire évoluer quand le besoin change.",
      },
    ],
  },

  projects: {
    eyebrow: "// 01 — projets",
    title: "Les produits que j'ai construits",
    description:
      "Chaque projet part du besoin auquel il répond, puis présente ce qui a été construit et pourquoi. Les détails techniques (architecture, décisions, tests et sécurité) sont à un onglet de distance.",
    source: "Code source",
    apiDocs: "Doc API",
    live: "En ligne",
    need: "01 · Le besoin",
    solution: "02 · La solution",
    built: "03 · Ce qui a été construit",
    builtWith: "04 · Technologies",
    result: "05 · Le résultat",
    engineeringDetails: "Détails techniques",
    tabs: {
      architecture: "Architecture",
      decisions: "Décisions",
      testing: "Tests & déploiement",
      security: "Sécurité",
    },
    testingStrategy: "Stratégie de test",
    deployment: "Déploiement",
  },

  skills: {
    eyebrow: "// 02 — compétences",
    title: "Ce que j'apporte à un produit",
    description:
      "Regroupées par domaine, sans classement par niveau. Chaque élément s'appuie sur un projet ou une expérience présentés sur cette page, et ce que je suis encore en train d'apprendre est indiqué comme tel.",
  },

  experience: {
    eyebrow: "// 03 — parcours",
    title: "Expérience & formation",
    description:
      "Deux stages full stack, deux postes B2B successifs chez TELUS International et une 5e année d'études en informatique en cours.",
  },

  github: {
    eyebrow: "// 04 — github",
    title: "En direct de GitHub",
    stats: (repos: number, followers: number) =>
      `${repos} dépôts publics · ${followers} abonnés — récupérés en direct via l'API GitHub.`,
    fallbackDescription: "Dépôts épinglés et récemment actifs, récupérés en direct via l'API GitHub.",
    noDescription: "Aucune description.",
    updated: (date: string) => `mis à jour le ${date}`,
    recentlyPushed: "Derniers push",
    contributions: {
      title: "Activité de contribution",
      viewProfile: "voir le profil →",
      graphLabel: "Graphique des contributions GitHub sur les douze derniers mois",
      day: (date: string, count: number) => `${date} : ${count} contribution${count > 1 ? "s" : ""}`,
      less: "Moins",
      more: "Plus",
    },
  },

  contact: {
    eyebrow: "// 05 — contact",
    title: "Échangeons",
    description:
      "Ouvert aux postes de Product Engineer et de Software Engineer junior, aux stages, et aux projets où comprendre le problème compte autant que le code. Je lis tous les messages reçus ici.",
    linkedinProfile: "Profil LinkedIn",
    name: "Nom",
    email: "Email",
    message: "Message",
    send: "Envoyer le message",
    success: "Message envoyé — je vous réponds sous un ou deux jours.",
    error: (email: string) => `Une erreur est survenue. Écrivez-moi directement à ${email}.`,
  },

  footer: {
    builtWith: "Réalisé avec Next.js, TypeScript et Tailwind — code source sur GitHub.",
    rights: (year: number, name: string) => `© ${year} ${name}. Tous droits réservés.`,
    status: "Statut :",
    operational: "● opérationnel",
  },

  terminal: {
    title: "Terminal de commandes",
    description: "Tapez une commande pour naviguer sur le site, par exemple « projects » ou « contact ».",
    intro: (name: string) => `${name} — shell interactif`,
    helpHint: "tapez « help » pour voir les commandes disponibles",
    available: "Commandes disponibles :",
    openingResume: "Ouverture du CV…",
    opening: (target: string) => `Ouverture de ${target}…`,
    navigating: (section: string) => `Navigation vers #${section}…`,
    notFound: (cmd: string) => `commande introuvable : ${cmd} — tapez « help » pour la liste des commandes`,
    inputLabel: "Saisie de commande du terminal",
    placeholder: "tapez une commande…",
  },

  notFound: {
    eyebrow: "erreur 404",
    title: "page introuvable",
    body: "La page que vous cherchez n'existe pas ou a été déplacée. Essayez plutôt le terminal de commandes (⌘K).",
    home: "cd ~/accueil",
  },
};
