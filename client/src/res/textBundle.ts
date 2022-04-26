import { SystemBundleEn } from "./english/systemBundle_en.js";
import { ValhallaBundleEn } from "./english/valhallaBundle_en.js";
import { SystemBundleEs } from "./spanish/systemBundle_es.js";
import { ValhallaBundleEs } from "./spanish/valhallaBundle_es.js";

export class TextBundle {

    public static get (lang : string) {
      //lang = "es";
      switch (lang) {
        case "en":
            return this.getBundleEn();
        case "es":
            return this.getBundleEs();
        default:
            return this.getBundleEn();
      }

    }


    public static getBundleEn() {
        return {
            system : SystemBundleEn,
            valhalla: ValhallaBundleEn
        };
    }

    public static getBundleEs() {
        return {
            system : SystemBundleEs,
            valhalla: ValhallaBundleEs
        };
    }

}