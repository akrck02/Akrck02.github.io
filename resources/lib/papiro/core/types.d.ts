/** Where a papiro instance is: its start page, a page of the wiki or the graph */
export type PapiroTarget = {
    view: "home";
} | {
    view: "page";
    route: string;
} | {
    view: "graph";
} | {
    view: "not-found";
};
export type PapiroTheme = "auto" | "light" | "dark";
export type PapiroFont = "system" | "papiro";
/**
 * What an instance shows:
 * - wiki: the whole wiki, with bar, menu, search and pages
 * - page: only the pages, starting at options.route (help inside an app)
 * - graph: only the graph of the wiki
 */
export type PapiroLayout = "wiki" | "page" | "graph";
export interface PapiroOptions {
    /** url of the folder written by papiro-indexer (index.json, graph.json, pages) */
    source: string;
    layout?: PapiroLayout;
    /**
     * hash: the address keeps the page, under options.hashPrefix ("#/docs/wiki/…")
     * memory: the instance keeps the page and never touches the address
     */
    routing?: "hash" | "memory";
    hashPrefix?: string;
    /** first page with memory routing or the page layout ("" is the first page) */
    route?: string;
    title?: string;
    description?: string;
    /** url of an svg logo */
    logo?: string;
    theme?: PapiroTheme;
    font?: PapiroFont;
    bar?: boolean;
    menu?: boolean;
    search?: boolean;
    graph?: boolean;
    startPage?: boolean;
    breadcrumb?: boolean;
    /** false, true for the papiro credits, or the html to show */
    footer?: boolean | string;
    /** Ctrl K / Cmd K opens the search, Shift T switches the theme */
    shortcuts?: boolean;
    onNavigate?: (target: PapiroTarget) => void;
    onThemeChange?: (theme: PapiroTheme) => void;
    onFontChange?: (font: PapiroFont) => void;
}
export type ResolvedOptions = Required<Omit<PapiroOptions, "onNavigate" | "onThemeChange" | "onFontChange">> & Pick<PapiroOptions, "onNavigate" | "onThemeChange" | "onFontChange">;
