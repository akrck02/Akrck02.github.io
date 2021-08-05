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
