import { PapiroTarget } from "./types.js";
export interface Router {
    current(): PapiroTarget;
    href(target: PapiroTarget): string;
    navigate(target: PapiroTarget): void;
    /** call back on every change, returns the way to stop listening */
    listen(callback: (target: PapiroTarget) => void): () => void;
    /** links must be handled by papiro instead of the browser */
    readonly intercepts: boolean;
}
/**
 * Keeps the page in the address hash, under a prefix so the host app keeps
 * its own routes: "#/wiki/route", or "#/docs/wiki/route" with prefix "docs"
 */
export declare class HashRouter implements Router {
    private readonly first;
    readonly intercepts = false;
    private readonly prefix;
    /**
     * @param prefix the section of the hash that belongs to papiro
     * @param first where to start while the address belongs to the host app
     */
    constructor(prefix: string, first: PapiroTarget);
    current(): PapiroTarget;
    href(target: PapiroTarget): string;
    navigate(target: PapiroTarget): void;
    listen(callback: (target: PapiroTarget) => void): () => void;
    /** the target of a hash, null when it belongs to the host app */
    private parse;
}
/** Keeps the page inside the instance, the address is never touched */
export declare class MemoryRouter implements Router {
    readonly intercepts = true;
    private target;
    private callbacks;
    constructor(first: PapiroTarget);
    current(): PapiroTarget;
    href(_: PapiroTarget): string;
    navigate(target: PapiroTarget): void;
    listen(callback: (target: PapiroTarget) => void): () => void;
}
