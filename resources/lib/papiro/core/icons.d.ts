import collection from "../../resources/icons/materialicons.json";
export type IconName = keyof typeof collection;
/** An svg icon of the bundled set, as html */
export declare function icon(name: IconName, size?: number): string;
