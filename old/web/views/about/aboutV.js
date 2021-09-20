import { CLASS } from "../../core/css.js";
import { create } from "../../lib/GTD_Component.js";
import { FAVORITE } from "../../lib/GTD_MaterialIcons.js";
import { isShortDevice, isSmallDevice } from "../../lib/GTD_ResponsiveTools.js";
import { GITHUB, TWITCH, TWITTER, YOUTUBE } from "../../res/icons.js";
import { AKRCK02, PATHS, SETTINGS } from "../../settings/settings.js";

export const aboutV = (params) => {

  let title = SETTINGS.APP_NAME + " - About me";
  window.title = title;
  document.title = title;

  const view = create({
    classes: [CLASS.BOX_COLUMN, CLASS.BOX_X_CENTER, CLASS.BOX_Y_CENTER],
    styles: {
      width: "100%",
      minHeight:  "100%",
      overflowY: "auto",
      background: "URL('" + PATHS.IMAGES + "Wallpaper.png')",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    },
  });

  let height = "auto";
  height = isShortDevice() ? "100%" : height;

  const content = create({
    classes: [CLASS.BOX_COLUMN, CLASS.BOX_X_CENTER, CLASS.BOX_Y_CENTER],
    styles: {
      width: "100%",
      minHeight: "100%",
      height: height,
      background: "RGBA(255,255,255,0.5)",
      paddingTop: "15px",
    },
  });

  const love = FAVORITE({
    size: 24,
    fill: "#202020",
  });

  const main_title = create({
    text: "ABOUT ME " + love,
    classes: [CLASS.H1],
    styles: {
      marginBottom: "10px",
    },
  });

  const text = create({
    styles: {
      maxWidth: "800px",
      padding: "40px",
    },
    text: `
      Hi there! im Akrck02, a 20 year old <b>software developer</b> with some experince in web development.<br>
      I live in Spain and my <b>favorite language is Java.</b> <br>
      <br>
      <b>I also like video games</b><br>
      I'm a big fan of <b>The legend of Zelda</b> and indie titles such as celeste && VA11 Hall-A.<br>
      <br>
      I founded a small company called <b>Nightlight Studios</b> that is currently working on a game called <b>Starlight</b>. </br>
      <br>
      <b>I love GNU/linux and open source</b> so I let most of my code open on <b><a style="color:#202020" href=${AKRCK02.GITHUB}>github</a></b>
      `,
  });

  const social_media_box = create({
    classes: [CLASS.BOX_ROW, CLASS.BOX_X_CENTER, CLASS.BOX_Y_CENTER],
    styles: {
      margin: "10px",
      padding: "10px",
      width: "100%",
    },
  });

  const twitter = create({
    text: TWITTER({
      fill: "#202020",
      size: 32,
    }),
    styles: {
      margin: "7px",
      cursor: "pointer",
    },
    events : {
      click : () => location.href = AKRCK02.TWITTER,
    }
  });

  const github = create({
    text: GITHUB({
      fill: "#202020",
      size: 32,
    }),
    styles: {
      margin: "7px",
      cursor: "pointer",
    },
    events : {
      click : () => location.href = AKRCK02.GITHUB,
    }
  });

  const twitch = create({
    text: TWITCH({
      fill: "#202020",
      size: 32,
    }),
    styles: {
      margin: "7px",
      cursor: "pointer",
    },
    events : {
      click : () => location.href = AKRCK02.TWITCH,
    }
  });

  const youtube = create({
    text: YOUTUBE({
      fill: "#202020",
      size: 32,
    }),
    styles: {
      margin: "7px",
      cursor: "pointer",
    },
    events : {
      click : () => location.href = AKRCK02.YOUTUBE,
    }
  });

  twitter.appendTo(social_media_box);
  github.appendTo(social_media_box);
  twitch.appendTo(social_media_box);
  youtube.appendTo(social_media_box);

  main_title.appendTo(content.element);
  text.appendTo(content.element);
  social_media_box.appendTo(content.element);

  content.appendTo(view);
  view.appendTo(document.body);
};