export interface ExperienceStep {
    year: string;
    title: string;
    place: string;
    description: string;
    /** Font Awesome 4 icon class shown on the timeline, e.g. 'fa-briefcase' */
    icon: string;
    stack?: string[];
    missions?: Mission[];
}

export interface Mission {
    period: string;
    title: string;
    description: string;
    icon: string;
    stack?: string[];
}

// Repris de https://github.com/giboow/giboow.github.io (components/pages/about) sur demande de Philippe.
export const experience: ExperienceStep[] = [
    {
        year: "2003 – 2009",
        title: "Formation d'ingénieur informatique",
        place: "IUT de Valence puis ENIB, Brest",
        description: "DUT Informatique (option systèmes industriels), Licence Pro Conception et Administration de Systèmes d'Informations, puis diplôme d'ingénieur informatique.",
        icon: "fa-graduation-cap",
    },
    {
        year: "2009 – 2014",
        title: "Ingénieur R&D",
        place: "Advert Stream — Lyon",
        description: "Mise en place de l'architecture de développement (Apache, Subversion, Jenkins, PHPUnit), conception de la nouvelle plateforme publicitaire (PHP, Zend Framework) et de son moteur de diffusion à fort trafic, optimisation MySQL.",
        icon: "fa-briefcase",
        stack: ["PHP", "Zend Framework", "MySQL", "Apache", "Jenkins", "Subversion"],
    },
    {
        year: "2014 – 2015",
        title: "Développeur Full-Stack",
        place: "StartingPlex / HotAlert — Vannes",
        description: "Développement d'API pour des applications Android, iOS et Web (PHP, Laravel, RabbitMQ, MongoDB, AngularJS), architecture de développement à base de containers Docker.",
        icon: "fa-briefcase",
        stack: ["PHP", "Laravel", "RabbitMQ", "MongoDB", "AngularJS", "Docker"],
    },
    {
        year: "2015 – 2018",
        title: "Ingénieur R&D",
        place: "Wizdeo — Rennes",
        description: "Développement de la plateforme d'analyse d'audience YouTube Wizdeo (CakePHP, MySQL, MongoDB, ElasticSearch) et d'applications mobiles iOS/Android (Ionic2, Angular2), en méthode Scrum.",
        icon: "fa-briefcase",
        stack: ["CakePHP", "MySQL", "MongoDB", "ElasticSearch", "Angular", "Ionic"],
    },
    {
        year: "2018 – 2021",
        title: "Développeur Full-Stack",
        place: "Ekolis — Rennes",
        description: "Développement backend/frontend de la plateforme de suivi de flotte Ekolis pour les transporteurs (Java, Angular, PostgreSQL, RabbitMQ) : remontée des données des objets connectés embarqués dans les véhicules (position GPS, pression des pneus, température des groupes frigorifiques). Développement de deux applications Android natives (Java/Kotlin) : l'une pour les clients, l'autre pour les techniciens afin de faciliter l'installation du matériel.",
        icon: "fa-briefcase",
        stack: ["Java", "Angular", "PostgreSQL", "RabbitMQ", "Android", "Kotlin"],
    },
    {
        year: "Depuis 2021",
        title: "Développeur freelance — BeGooDev",
        place: "Bassin rennais",
        description: "Création de BeGooDev pour accompagner les entreprises et les administrations sur leurs projets web, du cadrage technique à la mise en production.",
        icon: "fa-rocket",
        missions: [
            {
                period: "2021",
                title: "Plateforme de contrôle des dépôts de déchets",
                description: "Développement d'une plateforme de contrôle des dépôts de déchets dans les différentes bennes d'une entreprise. Des caméras Hikvision détectent chaque dépôt et remontent les événements à la plateforme, qui les centralise pour permettre le suivi et le contrôle des dépôts.",
                icon: "fa-video-camera",
            },
            {
                period: "Depuis 2022",
                title: "Lead développeur sur un projet numérique de l'État",
                description: "Référent technique de l'équipe : aide aux choix d'architecture et de technologies, prise en charge du développement des points critiques de l'application et accompagnement des développeurs juniors au quotidien (revues de code, partage de bonnes pratiques, montée en compétences) pour garantir la qualité et la pérennité du produit.",
                icon: "fa-university",
            },
        ],
    },
];
