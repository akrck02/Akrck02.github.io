import { HomeBundleEn } from "./english/homeBundle_en.js";
import { SystemBundleEn } from "./english/systemBundle_en.js";
import { ValhallaBundleEn } from "./english/valhallaBundle_en.js";
import { SystemBundleEs } from "./spanish/systemBundle_es.js";
import { ValhallaBundleEs } from "./spanish/valhallaBundle_es.js";
import { HomeBundleEs } from "./spanish/homeBundle_es.js";
export class TextBundle {
    static get(lang) {
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
