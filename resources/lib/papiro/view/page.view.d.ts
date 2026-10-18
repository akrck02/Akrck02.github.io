import Papiro from "../core/papiro.js";
/**
 * A page of the wiki with its index, its local graph and the
 * links to the previous and next pages; a folder lists its pages
 */
export default class PageView {
    static show(papiro: Papiro, container: HTMLElement, route: string): Promise<void>;
    /** a folder lists its pages */
    private static folder;
    private static addReadingTime;
    /**
     * "On this page": it scrolls to the sections, the address
     * may belong to the router or to the host app
     */
    private static addTableOfContents;
    /** previous and next pages, in the order of the menu */
    private static pager;
}
