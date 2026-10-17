export default class StringService {
    static readonly DEFAULT_TOLERANCE = 2;
    static levenshteinDistance(a: string, b: string): number;
    /**
     * Get if the text contains the searcher with typo tolerance
     * @param text The text to search in
     * @param query The text to search for
     * @returns True if the text contains the searcher
     */
    static search(text: string, query: string): boolean;
    /**
     * Get if the text contains the searcher with typo tolerance
     * @param text The text to search in
     * @param query The text to search for
     * @param tolerance The tolerance to use
     * @returns True if the text contains the searcher
     */
    static containsMatchingWordWithTolerance(text: string, query: string, tolerance: number): boolean;
    /**
     * Get if the text contains the searcher with typo tolerance
     * @param text The text to search in
     * @param query The text to search for
     * @param tolerance The tolerance to use
     * @returns True if the text contains the searcher
     */
    static searchWithTolerance(text: string, query: string, tolerance: number): boolean;
    /**
     * Returns a word matching with typo tolerance
     * @param text The text to search in
     * @param query The word to search for
     * @param tolerance The tolerance to use
     * @return
     */
    static getMatching(text: string, query: string, tolerance: number): string[];
    /**
     * Returns a word matching with typo tolerance
     * @param text The text to search in
     * @param searcher The word to search for
     * @param tolerance The tolerance to use
     * @return
     */
    static getMatchingWord(text: string, searcher: string, tolerance: number): string;
    /**
     * Escape html special characters
     * @param text The text to escape
     * @returns the escaped text
     */
    static escape(text: string): string;
    /**
     * Get normalized text (no accents)
     * @param text
     * @return the text without accents
     */
    static normalized(text: string): string;
}
