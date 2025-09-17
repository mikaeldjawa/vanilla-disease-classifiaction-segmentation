/**
 * Parses a cookie string into an object of key-value pairs.
 * @param str The cookie string to parse.
 * @returns An object representing the cookies.
 */
export default function parseCookies(str: string): { [key: string]: string } {
  return str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      // Ensure there's a key and value before setting
      if (v.length > 1 && v[0]) {
        // The key is the first part, the value is the rest joined back together
        const key = decodeURIComponent(v[0].trim());
        const value = decodeURIComponent(v.slice(1).join("=").trim());
        acc[key] = value;
      }
      return acc;
    }, {} as { [key: string]: string });
}
