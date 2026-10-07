export type ArticleBlock =
    | { type: 'p'; text: string }
    | { type: 'h2'; text: string }
    | { type: 'ul'; items: string[] }
    | { type: 'takeaway'; text: string };

export interface Article {
    /** URL de l'article : /articles/<slug> */
    slug: string;
    /** Titre affiché (h1) */
    title: string;
    /** Balise <title>, « – BeGooDev » compris : 20 à 65 caractères */
    metaTitle: string;
    /** Meta description et résumé dans la liste : 70 à 160 caractères */
    description: string;
    category: string;
    /** Date de publication, AAAA-MM-JJ */
    date: string;
    content: ArticleBlock[];
    /**
     * Brouillon : la page est générée et consultable par son lien, mais en noindex,
     * absente de la liste du blog, de « À lire aussi » et du sitemap.
     */
    draft?: boolean;
}

const rawArticles: Article[] = [
    {
        slug: 'demo-chaque-semaine',
        title: "Une démo chaque semaine plutôt qu'un effet tunnel de six mois",
        metaTitle: "Une démo par semaine plutôt qu'un effet tunnel – BeGooDev",
        description:
            "Montrer l'avancement d'un projet chaque semaine, même inachevé, évite les surprises à la livraison. Comment organiser ces démos et ce qu'elles changent.",
        category: 'Pilotage',
        date: '2026-10-07',
        content: [
            {
                type: 'p',
                text: "Le scénario est classique : un cahier des charges, un devis, un planning de six mois, puis plus grand-chose jusqu'à la livraison, à part quelques points d'étape où l'on annonce que « tout avance bien ». Le jour de la présentation, le client découvre un outil conforme au document, mais pas à ce qu'il avait en tête. Et il reste peu de temps et de budget pour corriger.",
            },
            {
                type: 'p',
                text: "C'est ce qu'on appelle l'effet tunnel. Le remède est simple : montrer régulièrement ce qui a été fait. On recommande souvent une démo toutes les deux semaines. Je préfère toutes les semaines.",
            },
            { type: 'h2', text: 'Pourquoi chaque semaine' },
            {
                type: 'p',
                text: "Une semaine, c'est assez court pour qu'une incompréhension ne coûte que quelques jours de travail. Au bout de deux semaines, une mauvaise piste a déjà eu le temps de s'installer dans le reste du projet.",
            },
            {
                type: 'p',
                text: "C'est aussi un rythme facile à tenir pour le client : un rendez-vous fixe, toujours le même jour, qui devient une habitude plutôt qu'une réunion exceptionnelle qu'on prépare pendant des jours.",
            },
            {
                type: 'p',
                text: "Et c'est une discipline pour le prestataire : chaque semaine, il faut avoir quelque chose de concret à montrer. Difficile de rester bloqué longtemps sur un sujet sans que cela se voie.",
            },
            { type: 'h2', text: 'Comment se passe une démo' },
            {
                type: 'ul',
                items: [
                    '30 minutes au maximum, en visio ou sur place.',
                    "On montre l'outil qui fonctionne, pas des diapositives ni des maquettes.",
                    'On présente ce qui a été fait, ce qui est en cours et ce qui pose question.',
                    "Le client manipule lui-même dès que c'est possible.",
                    'On repart avec les décisions prises et les priorités de la semaine suivante, notées dans un court compte rendu.',
                ],
            },
            { type: 'h2', text: 'Ce que ça change' },
            {
                type: 'p',
                text: "Les mauvaises surprises disparaissent. Le client voit le produit grandir semaine après semaine : le jour de la mise en production, il n'y a plus rien à découvrir.",
            },
            {
                type: 'p',
                text: "Les priorités s'ajustent en continu. En voyant l'outil, on se rend compte qu'une fonctionnalité jugée indispensable ne l'est pas, ou qu'un détail oublié est en fait essentiel. Mieux vaut le découvrir à la troisième semaine qu'à la vingt-quatrième.",
            },
            {
                type: 'p',
                text: "La confiance s'installe. Un client qui voit l'avancement n'a pas besoin de relancer pour savoir où on en est. Et quand un retard arrive, il est visible tôt et se discute calmement.",
            },
            {
                type: 'p',
                text: "Les utilisateurs peuvent être associés. Inviter de temps en temps une personne de terrain à la démo est un moyen simple de vérifier qu'on construit le bon outil, et de préparer son adoption.",
            },
            { type: 'h2', text: 'Les objections habituelles' },
            {
                type: 'p',
                text: "« On n'a pas le temps. » Trente minutes par semaine, c'est peu au regard des semaines de reprise qu'évite une incompréhension détectée tôt.",
            },
            {
                type: 'p',
                text: "« Certaines semaines, il n'y aura rien à montrer. » Il y a toujours quelque chose : un écran, un import de données, une difficulté rencontrée et la façon dont on la contourne. Une semaine sans rien à montrer est d'ailleurs une information utile en soi.",
            },
            {
                type: 'p',
                text: "« Le client va vouloir tout changer. » Il le voudra de toute façon. Mieux vaut qu'il le dise tôt, quand les changements coûtent peu ; la démo sert justement à arbitrer ce qui entre, ce qui attend et ce qui sort.",
            },
            { type: 'h2', text: 'À retenir' },
            {
                type: 'takeaway',
                text: "Un projet qu'on montre chaque semaine ne peut pas dériver longtemps sans que quelqu'un s'en aperçoive. La démo hebdomadaire est le moyen le plus simple et le moins coûteux de réduire les risques d'un projet.",
            },
        ],
    },
    {
        slug: 'valider-chaque-evolution-en-video',
        title: 'Une courte vidéo pour faire valider chaque évolution',
        metaTitle: 'Faire valider chaque évolution en vidéo – BeGooDev',
        description:
            "Avant de livrer une évolution, j'enregistre une vidéo de quelques minutes qui la montre en action. Le client valide quand il veut, sans réunion ni installation.",
        category: 'Validation',
        date: '2026-10-07',
        content: [
            {
                type: 'p',
                text: "Entre deux démos, le travail continue d'avancer : un nouvel écran, une correction, un formulaire qui change. Comment faire valider ces évolutions sans multiplier les réunions ni demander au client d'installer quoi que ce soit ?",
            },
            {
                type: 'p',
                text: "Ma réponse : une courte vidéo. Pour chaque évolution, j'enregistre mon écran pendant que je l'utilise, en commentant à voix haute. La vidéo est jointe à la demande de validation de l'évolution (la « pull request », pour les initiés), là où le client peut la regarder, réagir et donner son accord avant que la modification soit mise en ligne.",
            },
            { type: 'h2', text: "Pourquoi une vidéo plutôt qu'une capture ou un texte" },
            {
                type: 'p',
                text: "Une capture d'écran montre un état, pas un comportement. Elle ne dit pas ce qui se passe quand on clique, quand on se trompe dans un champ ou quand la liste est vide.",
            },
            {
                type: 'p',
                text: "Un texte demande un effort d'imagination et laisse place à l'interprétation : « le bouton enregistre et renvoie vers la liste » peut se comprendre de plusieurs façons.",
            },
            {
                type: 'p',
                text: "Une vidéo de deux minutes montre exactement ce qui a été fait, dans l'ordre où l'utilisateur le vivra. Il n'y a rien à deviner.",
            },
            { type: 'h2', text: 'Ce que contient une bonne vidéo' },
            {
                type: 'ul',
                items: [
                    'Une durée courte : une à trois minutes, une seule évolution par vidéo.',
                    'Le contexte en une phrase : quel besoin on traite, et pour qui.',
                    'Le parcours complet, comme un utilisateur le ferait, avec des données réalistes.',
                    "Les cas particuliers : message d'erreur, liste vide, droits insuffisants.",
                    "Ce qui n'est pas encore fait, dit clairement, pour éviter les malentendus.",
                ],
            },
            { type: 'h2', text: 'Ce que ça change pour le client' },
            {
                type: 'p',
                text: "Il valide quand il veut. Pas besoin de trouver un créneau commun : la vidéo se regarde entre deux rendez-vous, sur un ordinateur comme sur un téléphone.",
            },
            {
                type: 'p',
                text: "Il peut la faire circuler. La personne à l'origine du besoin, souvent un utilisateur de terrain, peut donner son avis directement, sans réunion à plusieurs.",
            },
            {
                type: 'p',
                text: "Les retours sont précis. « À 1 min 20, je m'attendais à revenir sur la fiche plutôt que sur la liste » est bien plus utile qu'un « ce n'est pas tout à fait ça ».",
            },
            {
                type: 'p',
                text: "Il garde une trace. Six mois plus tard, quand on se demande pourquoi un écran fonctionne de telle manière, la vidéo et la validation qui l'accompagne sont toujours là.",
            },
            { type: 'h2', text: 'Ce que ça change pour le prestataire' },
            {
                type: 'p',
                text: "S'enregistrer en train d'utiliser son propre travail est un excellent contrôle qualité. En préparant la vidéo, on repère souvent un libellé ambigu ou un cas oublié, corrigé avant même l'envoi.",
            },
            {
                type: 'p',
                text: 'Et les allers-retours diminuent : une évolution validée en vidéo arrive en production sans surprise.',
            },
            { type: 'h2', text: 'Avec la démo hebdomadaire, pas à sa place' },
            {
                type: 'p',
                text: "La vidéo ne remplace pas la démo hebdomadaire. La démo sert à échanger, prendre du recul et arbitrer les priorités ; la vidéo sert à valider rapidement une évolution précise. Ensemble, elles gardent le client au plus près du projet sans lui prendre beaucoup de temps.",
            },
            { type: 'h2', text: 'À retenir' },
            {
                type: 'takeaway',
                text: "Deux minutes de vidéo valent mieux qu'une page de description. Le client voit exactement ce qui sera livré, valide à son rythme, et personne ne découvre de surprise en production.",
            },
        ],
    },
    {
        slug: 'projet-livre-mais-inutilise',
        title: "Le projet est livré… et personne ne l'utilise",
        metaTitle: "Un outil livré mais inutilisé : comment l'éviter – BeGooDev",
        description:
            "Livré à temps, sans bug… et pourtant inutilisé. Pourquoi un nouvel outil n'est pas adopté par les équipes, et comment préparer son arrivée dès le départ.",
        category: 'Adoption',
        date: '2026-10-07',
        content: [
            {
                type: 'p',
                text: "La mise en production est passée, la recette est validée, le prestataire a été payé. Trois mois plus tard, les équipes utilisent toujours le tableur partagé, les mails et les post-it. L'outil existe, il fonctionne, mais personne ne s'en sert.",
            },
            {
                type: 'p',
                text: "Ce scénario est plus courant qu'on ne le croit, et il est rarement dû à un problème technique. Le logiciel fait ce qu'on lui a demandé. Le problème, c'est souvent ce qu'on lui a demandé, pour qui, et la façon dont il est arrivé dans le quotidien des gens.",
            },
            { type: 'h2', text: 'Les signes qui ne trompent pas' },
            {
                type: 'ul',
                items: [
                    "Les utilisateurs saisissent les données deux fois : dans l'outil « parce qu'il faut », et dans leur ancien fichier « pour être sûrs ».",
                    "Les questions au support portent sur « où trouver » plutôt que sur des bugs.",
                    "Une seule personne s'en sert vraiment, et les autres passent par elle.",
                    "Les chiffres de l'outil ne sont jamais repris en réunion.",
                ],
            },
            { type: 'h2', text: 'Pourquoi ça arrive' },
            {
                type: 'p',
                text: "Le projet a été pensé par ceux qui décident, pas avec ceux qui l'utilisent. Le cahier des charges décrit ce que la direction veut voir : tableaux de bord, indicateurs. Mais la personne qui saisit les informations sur le terrain, sur un téléphone, entre deux interventions, n'a jamais été consultée.",
            },
            {
                type: 'p',
                text: "L'outil ajoute du travail au lieu d'en enlever. S'il faut cinq clics de plus qu'avant pour la même tâche, l'ancienne méthode gagnera toujours, même si la nouvelle est « mieux » sur le papier.",
            },
            {
                type: 'p',
                text: "Personne n'a organisé l'arrivée de l'outil. Un mail annonçant la mise en ligne, avec un lien, ne suffit pas : les habitudes ne changent pas parce qu'un logiciel est disponible.",
            },
            {
                type: 'p',
                text: "L'ancien système n'a jamais été arrêté. Tant que le tableur reste accessible et accepté, il reste l'option la plus confortable.",
            },
            { type: 'h2', text: 'Impliquer les utilisateurs dès le départ' },
            {
                type: 'p',
                text: "La meilleure prévention reste de rencontrer les futurs utilisateurs avant de concevoir quoi que ce soit. Passer une demi-journée à leurs côtés, regarder comment ils travaillent vraiment, quels contournements ils ont inventés, ce qui les agace. On y apprend toujours quelque chose qu'aucune réunion n'aurait fait remonter.",
            },
            {
                type: 'p',
                text: "Ensuite, les associer aux démonstrations régulières pendant le développement. Un utilisateur qui a vu l'outil évoluer, et dont les remarques ont été prises en compte, en devient naturellement le meilleur ambassadeur.",
            },
            { type: 'h2', text: 'Préparer la mise en service comme une étape du projet' },
            {
                type: 'ul',
                items: [
                    'Désigner un ou deux référents par équipe, formés en avance, qui répondront aux questions de leurs collègues.',
                    "Prévoir une courte prise en main en situation réelle plutôt qu'une longue formation théorique.",
                    "Reprendre les données existantes pour que personne ne reparte d'une page blanche.",
                    "Fixer une date à partir de laquelle l'ancien fonctionnement n'est plus accepté, et s'y tenir.",
                    'Réserver du temps juste après le lancement : les premiers jours font remonter des irritants simples à corriger.',
                ],
            },
            { type: 'h2', text: "Et si l'outil est déjà livré ?" },
            {
                type: 'p',
                text: "Tout n'est pas perdu. Il suffit souvent de retourner voir les utilisateurs et de leur poser une question simple : « Qu'est-ce qui vous empêche de l'utiliser ? » Les réponses sont généralement concrètes et peu coûteuses à traiter : un champ obligatoire inutile, un écran trop chargé, une information introuvable, un export qui manque.",
            },
            {
                type: 'p',
                text: "Corriger trois ou quatre de ces irritants, puis le faire savoir, change souvent davantage la perception de l'outil qu'une nouvelle fonctionnalité.",
            },
            { type: 'h2', text: 'À retenir' },
            {
                type: 'takeaway',
                text: "Un projet n'est pas terminé quand il est livré, mais quand il est utilisé. Préparer l'adoption dès le début coûte peu ; la rattraper après coup coûte beaucoup plus cher.",
            },
        ],
    },
];

/** French typography: non-breaking space before « : ; ! ? » and inside « guillemets ». */
const typo = (text: string) =>
    text
        .replace(/ ([:;!?»])/g, ' $1')
        .replace(/« /g, '« ')
        .replace(/(\d) (min|ans?|minutes|semaines?)\b/g, '$1 $2');

/** Tous les articles, brouillons compris, du plus récent au plus ancien. */
export const allArticles: Article[] = rawArticles.map((article) => ({
    ...article,
    title: typo(article.title),
    description: typo(article.description),
    content: article.content.map((block) =>
        block.type === 'ul' ? { ...block, items: block.items.map(typo) } : { ...block, text: typo(block.text) },
    ),
}));

/** Articles publiés, du plus récent au plus ancien. */
export const articles = allArticles.filter((article) => !article.draft);

export const drafts = allArticles.filter((article) => article.draft);

export const findArticle = (slug: string) => allArticles.find((article) => article.slug === slug);

/** Temps de lecture estimé, à 200 mots par minute. */
export const readingTime = (article: Article) => {
    const words = article.content
        .flatMap((block) => (block.type === 'ul' ? block.items : [block.text]))
        .join(' ')
        .split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
};

/** « 7 octobre 2026 » ; independent of the app locale, which stays the default en-US. */
export const formatDate = (date: string) =>
    new Date(`${date}T00:00:00Z`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
