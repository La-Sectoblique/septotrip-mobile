import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// import { fr, en, de } from "./translations";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    compatibilityJSON: "v3",
    lng: "fr",
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false,
    },
    ns: ["locale"],
    defaultNS: "locale",
    resources: {
      fr: {
        locale: {
          signup: "S'inscrire",
          signin: "Se connecter",
          firstname: "Prénom...",
          name: "Nom...",
          email: "Email...",
          password: "Mot de passe...",
          createUser: "Utilisateur créé ! Connectez-vous !",
          error: {
            default:
              "Une erreur est survenue...Veuillez réessayer ultérieurement",
            userexists: "L'utilisateur saisi existe déjà",
            firstname: "Prénom invalide ou manquant...",
            name: "Nom invalide ou manquant...",
            email: "Email invalide ou manquant...",
            password: "Mot de passe invalide ou manquant...",
          },
        },
      },
      en: {
        locale: {
          signup: "Sign up",
          signin: "Sign in",
          firstname: "First name...",
          name: "Name...",
          email: "Email...",
          password: "Password...",
          createUser: "User created ! Log in !",
          error: {
            default:
              "Une erreur est survenue...Veuillez réessayer ultérieurement",
            userexists: "L'utilisateur saisi existe déjà",
            firstname: "Prénom invalide ou manquant...",
            name: "Nom invalide ou manquant...",
            email: "Email invalide ou manquant...",
            password: "Mot de passe invalide ou manquant...",
          },
        },
      },
      de: {
        locale: {
          signup: "Sign up",
          signin: "Sign in",
          firstname: "First name...",
          name: "Name...",
          email: "Email...",
          password: "Password...",
          createUser: "User created ! Log in !",
          error: {
            default:
              "Une erreur est survenue...Veuillez réessayer ultérieurement",
            userexists: "L'utilisateur saisi existe déjà",
            firstname: "Prénom invalide ou manquant...",
            name: "Nom invalide ou manquant...",
            email: "Email invalide ou manquant...",
            password: "Mot de passe invalide ou manquant...",
          },
        },
      },
      sv: {
        locale: {
          signup: "Sign up",
          signin: "Sign in",
          firstname: "First name...",
          name: "Name...",
          email: "Email...",
          password: "Password...",
          createUser: "User created ! Log in !",
          error: {
            default:
              "Une erreur est survenue...Veuillez réessayer ultérieurement",
            userexists: "L'utilisateur saisi existe déjà",
            firstname: "Prénom invalide ou manquant...",
            name: "Nom invalide ou manquant...",
            email: "Email invalide ou manquant...",
            password: "Mot de passe invalide ou manquant...",
          },
        },
      },
    },
  });

export default i18n;
