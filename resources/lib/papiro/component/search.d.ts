import Papiro from "../core/papiro.js";
/**
 * Search palette: pages by name, arrows to move, Enter to open, Esc to close
 */
export default class Search {
    private readonly papiro;
    readonly element: HTMLElement;
    private readonly input;
    private readonly results;
    private items;
    private selected;
    constructor(papiro: Papiro);
    open(): void;
    close(): void;
    toggle(): void;
    private onKey;
    private search;
    /** one selection, shared by the keyboard and the mouse */
    private select;
}
