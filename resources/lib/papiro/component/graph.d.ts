import { WikiColors, WikiGraph } from "../core/data.js";
import Papiro from "../core/papiro.js";
/**
 * Graphs of the links between pages, placed with a small force
 * simulation and drawn on a canvas with the theme colours.
 */
export default class Graph {
    static readonly LOCAL_CLASS = "papiro-local-graph";
    static readonly LOCAL_SIZE = 220;
    static readonly LOCAL_MIN_NODES = 6;
    static readonly LOCAL_MAX_NODES = 40;
    static readonly STEPS = 300;
    /**
     * The page, the pages it links to or is linked from,
     * and their neighbours when there are few
     */
    static createLocal(papiro: Papiro, route: string, graph: WikiGraph, colors?: WikiColors): HTMLElement;
    /**
     * Every page of the wiki
     */
    static createGlobal(papiro: Papiro, graph: WikiGraph, colors?: WikiColors): HTMLCanvasElement;
    /** Set the drawing size of a graph canvas */
    static resize(canvas: HTMLCanvasElement, width: number, height: number): void;
    private static neighbours;
    /**
     * Create the nodes and place them: they push each other away,
     * links pull like springs and a soft gravity keeps them together
     */
    private static layout;
    private static canvas;
    private static shorten;
}
