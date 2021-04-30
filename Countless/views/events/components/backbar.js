import { COMPONENT_TYPES } from "../../../config/constants/components.js";
import { settings } from "../../../config/settings.js";
import { CLASSES } from "../../../lib/BubbleClasses.js";
import { create } from "../../../lib/GTD_Component.js";
import { BACK } from "../../../lib/GTD_MaterialIcons.js";
import { EVENT_TYPES } from "../constants/components.js";

export const backbar = (properties) => {
    const back = create({
        type: EVENT_TYPES.INFO,
        classes: [CLASSES.BOX_ROW],
        styles: {
          padding: "10px",
          width: "100%",
          borderBottom: "1px solid #e9e9e9",
        },
      });
    
      const backIcon = create({
        type: COMPONENT_TYPES.ICON,
        text: BACK({
          size: "25px",
        }),
        styles: {
          cursor: "pointer",
        },
        events: {
          click: () => (location.href = settings().URL + "calendar/"),
        },
      });
    
      backIcon.appendTo(back.element);
      return back;
}