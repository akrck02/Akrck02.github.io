import { IndexItem } from "../model/index.item.js";
/** Links between pages: wiki route -> linked wiki routes */
export type WikiGraph = {
    [route: string]: string[];
};
export type WikiColors = {
    [route: string]: string;
};
/** A page found in the index */
export type WikiEntry = {
    route: string;
    item: IndexItem;
    directory: boolean;
};
/**
 * The files papiro-indexer wrote for a wiki, read from its folder url
 */
export declare class WikiData {
    private readonly base;
    private cache;
    index: IndexItem;
    /** page routes in the order of the index */
    routes: string[];
    constructor(source: string);
    /** absolute url of a file of the wiki */
    url(path: string): string;
    load(): Promise<void>;
    graph(): Promise<WikiGraph>;
    colors(): Promise<WikiColors>;
    /** the page or folder of a route, "" is the first page */
    entry(route: string): WikiEntry | null;
    /** the html of a page */
    html(entry: WikiEntry): Promise<string>;
    private collect;
    private json;
    /** files older indexers do not write, empty when missing */
    private optionalJson;
}
