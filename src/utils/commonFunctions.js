export const truncateString = (str, maxLength = 15) => {
  // Check if the input is a string
  if (typeof str !== "string") {
    return str;
  }
  // Check if the string is longer than the maximum length
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
};
