import { WikiData } from "./data.js";
import { Router } from "./router.js";
import { PapiroFont, PapiroOptions, PapiroTarget, PapiroTheme, ResolvedOptions } from "./types.js";
export declare const THEME_EVENT = "papiro-theme";
/**
 * A papiro wiki inside an element of the page.
 * Every instance keeps its own data, address and theme, so several
 * can live in a page and none of them touches the rest of it.
 */
export default class Papiro {
    readonly root: HTMLElement;
    readonly options: ResolvedOptions;
    readonly data: WikiData;
    readonly router: Router;
    private main;
    private menu;
    private search;
    private themeMode;
    private cleanups;
    private renderId;
    private constructor();
    /**
     * Show a wiki inside an element
     * @param element where the wiki goes, it takes all its space
     * @param options the folder of the wiki and how to show it
     */
    static create(element: HTMLElement, options: PapiroOptions): Promise<Papiro>;
    private static resolve;
    private static firstTarget;
    private start;
    /** Go to a page ("" is the first one), the graph or the start page */
    navigate(target: PapiroTarget | string): void;
    /** The address of a target, for the href of a link */
    href(target: PapiroTarget): string;
    /** A link to a target that works with any routing */
    link(target: PapiroTarget, html: string, classes?: string[]): HTMLAnchorElement;
    /** There is no room for the side column: the reading area is narrow, not the window */
    isNarrow(): boolean;
    openSearch(): void;
    toggleMenu(): void;
    get theme(): PapiroTheme;
    get font(): PapiroFont;
    isDark(): boolean;
    /** light, dark, or auto to follow the system */
    setTheme(theme: PapiroTheme, notify?: boolean): void;
    toggleTheme(): void;
    setFont(font: PapiroFont, notify?: boolean): void;
    toggleFont(): void;
    /** papiro's reading fonts, loaded once and only when chosen */
    private static loadFonts;
    /** Remove the wiki and everything it listens to */
    destroy(): void;
    private render;
    private listenShortcuts;
    private watchSystemTheme;
}
