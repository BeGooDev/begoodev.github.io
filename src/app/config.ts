export const appConfig = {
    pseudo: "GiBoOw",
    email: "contact@begoodev.fr",
    githubUser: "giboow",
    twitterUser: "giboow",
    twitterRecipientId: "91543080",
    linkdeInUser: "pgibert",
    phoneNumber: "+33 6 74 82 21 91",
    maltId: "philippegibert",
};

export const getPseudo = () => appConfig.pseudo;

export const getTwitterUrl = () => "https://twitter.com/" + appConfig.twitterUser;

export const getTwitterUser = () => "@" + appConfig.twitterUser;

export const getLinkedInUrl = () => "https://linkedin.com/in/" + appConfig.linkdeInUser;

export const getGithubUrl = () => "https://github.com/" + appConfig.githubUser;

export const getPhoneNum = () => appConfig.phoneNumber;

export const getEmail = () => appConfig.email;

export const getEmailWithSpaces = () => appConfig.email.replace('@', ' @ ');

export const getTwitterDirectMessageUrl = () => "https://twitter.com/messages/compose?recipient_id=" + appConfig.twitterRecipientId;

export const getMaltUrl = () => "https://www.malt.fr/profile/" + appConfig.maltId;

export const company = {
    name: "BeGooDev",
    legalForm: "SARL",
    /** Capital social, e.g. "1 000 €" (obligatoire dans les mentions légales d'une société) */
    shareCapital: "1 000 €",
    siren: "903 017 168",
    siret: "903 017 168 00019",
    rcs: "RCS Rennes 903 017 168",
    vatNumber: "FR14903017168",
    address: "11 allée Madame de Sévigné, 35470 Bain-de-Bretagne, France",
    manager: "Philippe Gibert",
};
