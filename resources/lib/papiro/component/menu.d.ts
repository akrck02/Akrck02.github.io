import Papiro from "../core/papiro.js";
/**
 * The pages of the wiki, following its folders.
 * On phones it is a drawer over the page.
 */
export default class Menu {
    readonly element: HTMLElement;
    private readonly links;
    constructor(papiro: Papiro);
    private option;
    /** Mark the page being read */
    select(route: string | null): void;
    toggle(): void;
    close(): void;
}
