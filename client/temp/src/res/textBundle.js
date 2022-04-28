import { HomeBundleEn } from "./english/homeBundle_en.js";
import { SystemBundleEn } from "./english/systemBundle_en.js";
import { ValhallaBundleEn } from "./english/valhallaBundle_en.js";
import { SystemBundleEs } from "./spanish/systemBundle_es.js";
import { ValhallaBundleEs } from "./spanish/valhallaBundle_es.js";
import { HomeBundleEs } from "./spanish/homeBundle_es.js";
export class TextBundle {
    static get(lang) {
        //if contains ignore case 
        if (lang.toLowerCase().includes("es")) {
            return TextBundle.getBundleEs();
        }
        else {
            return TextBundle.getBundleEn();
        }
    }
    static getBundleEn() {
        return {
            system: SystemBundleEn,
            home: HomeBundleEn,
            valhalla: ValhallaBundleEn
        };
    }
    static getBundleEs() {
        return {
            system: SystemBundleEs,
            home: HomeBundleEs,
            valhalla: ValhallaBundleEs
        };
    }
}
