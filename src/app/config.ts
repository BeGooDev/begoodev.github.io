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
