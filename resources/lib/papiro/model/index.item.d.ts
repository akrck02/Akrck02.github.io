export declare class IndexItem {
    type: number;
    files: {
        [key: string]: IndexItem;
    };
    path: string;
}
export declare enum ItemType {
    Directory = 1,
    File = 2
}
export declare function getIndexItemFromRoute(index: IndexItem, route: string): IndexItem;
