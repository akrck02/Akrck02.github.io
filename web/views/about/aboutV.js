import { CLASS } from "../../core/css.js";
import { create } from "../../lib/GTD_Component.js";
import { FAVORITE } from "../../lib/GTD_MaterialIcons.js";
import { GITHUB, TWITCH, TWITTER, YOUTUBE } from "../../res/icons.js";
import { AKRCK02 } from "../../settings/settings.js";

export const aboutV = (params) => {
  const view = create({
    classes: [CLASS.BOX_COLUMN, CLASS.BOX_X_CENTER, CLASS.BOX_Y_CENTER],
    styles: {
      width: "100%",
      minHeight: "100%",
      backgroundColor: "#ffffff",
    },
  });

  const love = FAVORITE({
    size: 24,
    fill: "#2F80ED",
  });

  const title = create({
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
      <b>I love GNU/linux and open source</b> so I let most of my code open on <b><a href=${AKRCK02.GITHUB}>github</a></b>
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
      fill: "#2F80ED",
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
      fill: "#404040",
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
      fill: "#9147ff",
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
      fill: "#f00",
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

  title.appendTo(view);
  text.appendTo(view);
  social_media_box.appendTo(view);

  view.appendTo(document.body);
};
