import { toHex } from "../data/numeric";

/**
 * Convert rgb values to HEX
 * @param {*} r - Red color
 * @param {*} g - Green color
 * @param {*} b - Blue color
 * @returns HEX value of a color.
 */
export function rgbToHex (r: number, g:number , b:number) : string {
  return "#" + toHex(r) + toHex(g) + toHex(b);
}

/**
 * Convert HEX colors to RGB
 * @param {*} hex 
 * @returns RGB value of HEX color
 */
export function hexToRgb (hex) : {r: number, g: number, b: number} {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  