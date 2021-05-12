import { settings } from "../../config/settings.js";
import { create } from "../../lib/component.js";

/**
 * Creates the bar for maker view
 */
export const maker_bar = (properties) => {
  const bar = create({
    type: "minimal_bar",
    classes: ["minimal_bar","no_copy"],
    styles: {
      "box-shadow": "0px 2px 4px rgba(0,0,0,.1)",
      "justify-content": "space-between",
      height: "8vh",
    },
  });

  const info_bar = create({
    type : 'box',
    classes : ['box-row','b-6','box-y-center'] 
  });

  const title = create({
    type: "h1",
    text: properties.name,
    styles: {
      color: "#fff",
      "font-family": "Roboto",
      "font-weight": 400,
      "font-size": "1.2em",
    },
  });

  const status = create({
    type: "box",
    classes : ['status','square','rounded'],
    styles: {
      background : (properties.saved) ? "#6FCF97":"#CF6F6F",
      height: '1vh',
      width : '1vh',
    },
  });


  const icon_bar = create({
    type : 'box',
    classes : ['box-row','b-6','box-x-end','box-y-center'],
    styles : {height : '100%'} 
  });


  const search = create({
    type: "img",
    options: {
      src: settings.COMMON_ICONS + "search_white.svg",
    },
    styles: {
      height: "70%",
      margin : 0,
      'margin-right' : '5px',
      cursor: "pointer",
    },
  });

  const download = create({
    type: "img",
    options: {
      src: settings.COMMON_ICONS + "download_white.svg",
    },
    styles: {
      height: "70%",
      cursor: "pointer",
      margin : 0,
      'margin-right' : '15px',
    },
  });

  status.appendTo(info_bar.element);
  title.appendTo(info_bar.element);


  download.appendTo(icon_bar.element);
  search.appendTo(icon_bar.element);



  info_bar.appendTo(bar.element);
  icon_bar.appendTo(bar.element);

  return bar;
};
