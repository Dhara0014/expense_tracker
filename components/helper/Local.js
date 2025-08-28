

export const getLocalStorage = (key, value=[]) => {
    try {
      if (typeof window == "undefined") return [];
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : [];
    } catch (error) {
        return [];
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