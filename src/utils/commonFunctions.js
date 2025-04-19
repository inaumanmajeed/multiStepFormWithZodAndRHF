export const truncateString = (str, maxLength = 15) => {
  if (typeof str !== "string") {
    return str;
  }
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
};

export const cleanSubmittedValues = (data) => {
  if (Array.isArray(data)) {
    const cleanedArray = data.map(cleanSubmittedValues).filter((item) => {
      if (item && typeof item === "object") {
        if (item.isConnected === false) return false; 
        if (item.open === false) return false; 
      }
      return item !== null && item !== undefined && item !== "";
    });
    return cleanedArray.length > 0 ? cleanedArray : null; 
  } else if (typeof data === "object" && data !== null) {
    const cleanedObject = Object.entries(data).reduce((acc, [key, value]) => {
      const cleanedValue = cleanSubmittedValues(value);
      if (
        cleanedValue !== null &&
        cleanedValue !== undefined &&
        cleanedValue !== "" &&
        (!Array.isArray(cleanedValue) || cleanedValue.length > 0)
      ) {
        acc[key] = cleanedValue;
      }
      return acc;
    }, {});
    return Object.keys(cleanedObject).length > 0 ? cleanedObject : null;
  }
  return data;
};
