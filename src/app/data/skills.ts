export interface SkillGroup {
    category: string;
    items: string[];
}

export const skills: SkillGroup[] = [
    {
        category: "Backend",
        items: [
            "Java (SpringBoot)",
            "Tests Java (JUnit, Mockito)",
            "PHP (Laravel)",
            "Tests PHP (PHPUnit, Atoum)",
            "Tests de charge (Gatling)",
            "PostgreSQL / MySQL / MariaDB",
            "ElasticSearch · MongoDB · Redis",
            "Apache · Nginx · RabbitMQ",
        ],
    },
    {
        category: "Front-end",
        items: [
            "HTML / CSS",
            "Tailwind CSS / DSFR",
            "Angular",
            "ReactJS",
            "JQuery",
            "Tests E2E (Playwright)",
        ],
    },
    {
        category: "Méthodes de travail",
        items: [
            "Git",
            "Agile / Scrum",
            "Qualité logicielle",
            "CI/CD (GitLab CI, GitHub Actions)",
            "Scripts Bash / Zsh",
        ],
    },
];
