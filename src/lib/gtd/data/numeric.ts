export function toHex (number : number) : string {
    var hex = number.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};
