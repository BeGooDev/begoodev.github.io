export interface Service {
    /** Ancre de la section sur la page /prestations */
    id: string;
    name: string;
    /** Résumé affiché sur l'accueil et repris dans le JSON-LD */
    summary: string;
    illustration: string;
    /** Détail affiché sur la page /prestations */
    details: string[];
}

export const services: Service[] = [
    {
        id: 'developpement',
        name: "Développement d'applications web et mobiles",
        summary:
            "Conception et développement de votre application web ou mobile, avec une architecture solide et un code de qualité, testé et maintenable.",
        illustration: '/svg/undraw_Web_developer_re_h7ie.svg',
        details: [
            "Analyse du besoin, choix de l'architecture applicative puis développement du front-end (Angular, React) et du backend (Java/Spring Boot, PHP/Laravel).",
            "Tests automatisés à chaque niveau : tests unitaires (JUnit, PHPUnit), tests de bout en bout avec Playwright et tests de charge avec Gatling.",
            "Interfaces accessibles, y compris conformes au Système de Design de l'État (DSFR) pour les services publics.",
        ],
    },
    {
        id: 'audit-performance',
        name: 'Audit de performance',
        summary:
            "Votre application est lente ? J'analyse l'architecture, les requêtes SQL et les échanges de flux pour identifier les goulets d'étranglement.",
        illustration: '/svg/undraw_Code_thinking_re_gka2.svg',
        details: [
            "Analyse de l'architecture, des requêtes SQL (PostgreSQL, MySQL, MariaDB) et des échanges de flux (RabbitMQ, API) pour trouver ce qui ralentit votre application.",
            "Tests de charge avec Gatling pour mesurer la tenue en charge avant et après les corrections.",
            "Recommandations concrètes et priorisées, et mise en œuvre des corrections si vous le souhaitez.",
        ],
    },
    {
        id: 'lead-technique',
        name: 'Lead technique et conseil',
        summary:
            "Choix technologiques, outillage, qualité logicielle et CI/CD : je renforce votre équipe en tant que lead développeur et accompagne vos développeurs.",
        illustration: '/svg/undraw_Mobile_apps_re_3wjf.svg',
        details: [
            "Renfort d'équipe en tant que lead développeur : choix techniques et développement des points critiques.",
            "Accompagnement des développeurs juniors : revues de code, bonnes pratiques, montée en compétences.",
            "Mise en place de l'outillage d'un développement de qualité : Git, intégration et déploiement continus (GitLab CI, GitHub Actions), scripts Bash.",
        ],
    },
];

export interface Faq {
    question: string;
    answer: string;
}

export const faq: Faq[] = [
    {
        question: 'Où intervenez-vous ?',
        answer:
            "Je suis basé à Bain-de-Bretagne, au sud de Rennes. J'interviens à Rennes et en Bretagne, et à distance partout en France.",
    },
    {
        question: 'Avec quelles technologies travaillez-vous ?',
        answer:
            "Principalement Java (Spring Boot) et PHP (Laravel) côté backend, Angular et React côté front-end, avec PostgreSQL, MySQL, RabbitMQ, ElasticSearch ou Redis. Je teste avec JUnit, PHPUnit, Playwright et Gatling, et j'automatise avec GitLab CI ou GitHub Actions.",
    },
    {
        question: 'Pouvez-vous reprendre une application existante ?',
        answer:
            "Oui. Je commence par un état des lieux (architecture, qualité du code, performances) avant de faire évoluer l'application, de la fiabiliser ou d'en corriger les lenteurs.",
    },
    {
        question: 'Travaillez-vous seul ou en équipe ?',
        answer:
            "Les deux : je peux mener un projet seul de bout en bout, ou rejoindre votre équipe en renfort ou en tant que lead développeur.",
    },
    {
        question: 'Êtes-vous disponible ?',
        answer:
            "Je suis actuellement en mission à temps plein, mais je reste à l'écoute de vos projets : contactez-moi pour préparer une future collaboration.",
    },
    {
        question: 'Sous quel statut travaillez-vous ?',
        answer:
            "Je facture via ma société, BeGooDev SARL, créée en 2021. Vous pouvez aussi passer par la plateforme Malt.",
    },
];
