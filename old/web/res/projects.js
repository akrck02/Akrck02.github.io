import { VIEWS } from "../settings/settings.js";

export const PROJECTS = () => {
  return {
    "Bubble UI": {
      langs: ["css", "lss", "javascript"],
      URL: VIEWS.BUBBLE,
    },
    "LSS Library": {
      langs: ["css", "lss", "javascript", "java"],
      URL: VIEWS.LSS_LIB,
    },
    "LSS Maker": {
      langs: ["html", "css", "lss", "javascript", "java"],
      URL: VIEWS.LSS_MAKER,
    },
    "GTD Library": {
      langs: ["javascript", "php"],
      URL: VIEWS.GTD_LIB,
    },
    "GTD Framework": {
      langs: ["javascript"],
      URL: VIEWS.GTD_FRAMEWORK,
    },
    "GTD Test": {
      langs: ["javascript", "java"],
      URL: VIEWS.GTD_TEST,
    },
    LittleStyles: {
      langs: ["java"],
      URL: VIEWS.LITTLESTYLES,
    },
  };
};

//returns a set of languages from all projects and filters repeated languages
export const getLanguages = () => {
  const projects = PROJECTS();
  const languages = {};
  for (const project in projects) {
    for (const lang in projects[project].langs) {
      languages[projects[project].langs[lang]] = true;
    }
  }
  return Object.keys(languages);
}