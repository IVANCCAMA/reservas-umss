/**
 * Saves value into localStorage, saves JSON object
 * @param param {string}
 * @param value {any}
 */
export const storageSave = (param, value) => {
  localStorage.setItem(param, JSON.stringify(value));
};

/**
 * Gets value from localStorage from a JSON object
 * @param param {string}
 * @param defaultValue {any}
 * @returns {any | null}
 */
export const storageGet = (param, defaultValue = null) => {
  const item = localStorage.getItem(param);
  if (item) {
    return JSON.parse(item);
  } else {
    return defaultValue;
  }
};

/**
 * Deletes value by param from localStorage
 * @param param {string}
 */
export const storageDelete = (param) => {
  localStorage.removeItem(param);
};
