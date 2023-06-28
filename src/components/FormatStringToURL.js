export default function formatStringToURL(string) {
    return string
        .replace(/'/g, "")  // Replace single quotes with empty string
        .replace(/[^a-zA-Z0-9]+/g, "-")  // Replace non-alphanumeric characters with hyphens
        .toLowerCase();

}
