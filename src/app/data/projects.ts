import { IconName } from '../components/icon/icons';

export interface Project {
    title: string;
    /** Période et rôle, ex. "2021 · Développeur seul sur le projet" */
    context: string;
    stack: string;
    description: string;
    icon: IconName;
}

export const projects: Project[] = [
    {
        title: "Projet numérique de l'État",
        context: "Depuis 2022 · Lead développeur en renfort d'équipe",
        stack: "Angular · Java · DSFR · Playwright · Gatling · Bash",
        description: "Renfort d'une équipe en tant que lead : choix techniques, développement des points critiques et accompagnement des juniors. Interfaces conformes au DSFR avec de forts enjeux d'accessibilité, tests E2E avec Playwright et tests de charge avec Gatling.",
        icon: "building-columns",
    },
    {
        title: "Contrôle des dépôts de déchets par caméras",
        context: "2021 · Développeur seul sur le projet",
        stack: "Angular · Java · RabbitMQ · Hikvision",
        description: "Conception et développement de bout en bout d'une plateforme qui contrôle les dépôts de déchets dans les différentes bennes d'une entreprise. Les caméras Hikvision envoient leurs événements à la plateforme, qui les place dans une file RabbitMQ pour les traiter.",
        icon: "video",
    },
    {
        title: "Suivi de flotte connecté pour transporteurs",
        context: "2018 – 2021 · Développeur full-stack chez Ekolis",
        stack: "Java · Angular · PostgreSQL · RabbitMQ · Android",
        description: "Suivi des véhicules à partir d'objets connectés (position GPS, pression des pneus, température des groupes frigorifiques), avec deux applications Android : l'une pour les clients, l'autre pour les techniciens chargés de l'installation du matériel.",
        icon: "truck",
    },
];
