import { bar } from "../../components/bar.js";
import { create, setEvents } from "../../lib/GTD_Component.js";
import { PLUS } from "../../lib/GTD_MaterialIcons.js";
import { getMonth } from "../../core/monthCalc.js";
import { getMonthEventService } from "../../services/eventService.js";
import { getProperty , USER_SETTINGS } from "../../config/userSettings.js";
import { COMPONENT_TYPES } from "../../config/constants/components.js";
import { EVENT_BUNDLE } from "./bundles/bundle_es.js";
import { isSmallDevice } from "../../lib/GTD_ResponsiveTools.js";
import { CLASSES } from "../../lib/BubbleClasses.js";
import { desktopEventPanel } from "./components/desktopEventPanel.js";
import { eventList } from "./components/eventList.js";
import { mobileEventPanel } from "./components/mobileEventPanel.js";
import { sleep } from "../../lib/GTD_TimeTools.js";
import { backbar } from "./components/backbar.js";

/**
 * Create events view
 * @param {*} params
 */
export const eventView = (params) => {
  const web_tittle = "Countless - Events";
  window.title = web_tittle;
  document.title = web_tittle;

  const view = create({
    type: COMPONENT_TYPES.VIEW,
    classes: [CLASSES.MAIN, CLASSES.BOX_COLUMN, CLASSES.NO_COPY],
    styles: {
      width: "100vw",
      height: "100vh",
      overflow: "auto",
      overflowX: "hidden",
    },
  });

  const title = bar(
    {
      title: EVENT_BUNDLE.EVENTS_BAR_TITLE
      .replace("$1", params[1])
      .replace("$2",getMonth(+params[2]-1))
    }
  );
  const back = backbar();

  title.appendTo(view.element);
  back.appendTo(view.element);

  getMonthEventService(
    (json) => {
      const wrapper = create({
        type: COMPONENT_TYPES.WRAPPER,
        classes: [CLASSES.BOX_ROW],
        styles: {
          height: "100%",
          transition: ".25s",
        },
      });

      if (json.success) 
        params[3] = json.content[+params[2]][+params[1]];

      wrapper.appendTo(view.element);
      eventList(wrapper, params);

      if (isSmallDevice()) {
        const newEventButton = create({
          type: COMPONENT_TYPES.ACTION,
          classes: [CLASSES.BOX_CENTER],
          text: PLUS({
            fill: "#404040",
            size: "25px",
          }),
          styles: {
            position: "fixed",
            bottom: "5vh",
            right: "7vw",
            padding: "10px",
            background: "#f0f0f0",
            boxShadow: "0px 2px 4px rgba(0,0,0,.15)",
            borderRadius: "100px",
          },
        });
        setEvents(newEventButton.element, {
          click: () => {
            wrapper.hide(100);
            const panel = mobileEventPanel();
            sleep(250).then(() => {
              panel.appendTo(view.element);
              panel.show(100);
              newEventButton.hide();
            });
            document.body.removeChild(newEventButton.element);
            view.removeChild(wrapper.element);
          },
        });

        newEventButton.appendTo(document.body);
      } else desktopEventPanel(wrapper, params);
    },
    getProperty(USER_SETTINGS.AUTH),
    new Date().getFullYear() + "-" + +params[2] + "-" + (+params[1] - 1),
    new Date().getFullYear() + "-" + +params[2] + "-" + (+params[1] + 1)
  );

  view.appendTo(document.body);
};
