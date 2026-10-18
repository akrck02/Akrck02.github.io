import Papiro from "../core/papiro.js";
/**
 * The html of a page, as papiro-indexer wrote it: internal links go through
 * the instance router, images and files come from the wiki folder
 */
export default class Content {
    static create(papiro: Papiro, html: string): HTMLElement;
    /** "./route" is a page, "./file.pdf" a file of the wiki, "#id" a section */
    private static prepareLink;
    private static prepareImage;
    /** quotes starting with a bold title are callouts (the obsidian indexer writes them that way) */
    private static prepareCallout;
    /** the language of a code block and a button to copy it */
    private static prepareCode;
}
