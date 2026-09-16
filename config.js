
const appConfig = {
    pseudo: "GiBoOw",
    email: "contact@begoodev.fr",
    githubUser: "giboow",
    twitterUser: "giboow",
    twitterRecipientId: "91543080",
    linkdeInUser: "pgibert",
    phoneNumber: "+33 6 74 82 21 91",
    maltId: "philippegibert"

}

const getPseudo = () => {
    return appConfig.pseudo;
}

/**
 * Get twitterUrl
 * @returns {string}
 */
const getTwitterUrl = () => {
    return "https://twitter.com/" +  appConfig.twitterUser;
}


/**
 * Get twitterUrl
 * @returns {string}
 */
const getTwitterUser = () => {
    return "@" +  appConfig.twitterUser;
}


/**
 * Get linkedInUrl
 * @returns {string}
 */
const getLinkedInUrl = () => {
    return "https://linkedin.com/in/" + appConfig.linkdeInUser;
}

/**
 * Get Github Url
 * @returns {string}
 */
const getGithubUrl = () => {
    return "https://github.com/" + appConfig.githubUser;
}

/**
 * Get phone number
 * @returns {string}
 */
const getPhoneNum = () => {
    return appConfig.phoneNumber;
}

/**
 * Get email
 * @returns {string}
 */
const getEmail = () => {
    return appConfig.email
}

const getEmailWithSpaces = () => {
    return appConfig.email.replace('@', ' @ ');
}

const getTwitterDirectMessageUrl = () => {
    return "https://twitter.com/messages/compose?recipient_id=" + appConfig.twitterRecipientId;
}

const getMaltUrl = () => {
    return "https://www.malt.fr/profile/" + appConfig.maltId;
}

const slogans = [
    {text: "Développement d'applications de qualité!", accent: "blue"},
    {text: "Boostez votre équipe avec un lead développeur passionné et engagé.", accent: "pink"},
    {text: "Transformez vos idées en réalité, avec un expert du développement.", accent: "green"},
    {text: "Votre imagination est la seule limite. Ensemble, dépassons-la!", accent: "navy"},
    {text: "L'art du code au service de votre vision.", accent: "orange"},
]


export default appConfig;

export {slogans, getTwitterUrl, getLinkedInUrl, getPhoneNum, getPseudo, getGithubUrl, getEmail, getTwitterDirectMessageUrl, getMaltUrl, getTwitterUser, getEmailWithSpaces};


