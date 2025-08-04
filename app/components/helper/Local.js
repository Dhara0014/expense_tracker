

export const getLocalStorage = (key, value=[]) => {
    try {
        // let data = localStorage.getItem(key, JSON.stringify(value));
        // return data ?? undefined;

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
    
        // const storedItem = localStorage.getItem(key);
        // return storedItem ? JSON.parse(storedItem) : null;
      } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
        return null;
      }
}