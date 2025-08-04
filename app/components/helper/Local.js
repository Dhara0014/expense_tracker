

export const getLocalStorage = (key, value=[]) => {
    try {

        const item = localStorage.getItem(key);

        if (!item || item === "undefined" || item === "null") {
          return value;
        }
    
        return JSON.parse(item);
    } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
    }
}

export const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
        return null;
      }
}