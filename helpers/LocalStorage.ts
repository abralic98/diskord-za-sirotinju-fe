export enum LocalStorageKeys {
  TOKEN = "token",
}

export const saveToLocalStorage = (
  key: LocalStorageKeys,
  value: string,
): void => {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const getFromLocalStorage = (key: LocalStorageKeys): string | null => {
  try {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  } catch (error) {
    console.error("Error retrieving from localStorage:", error);
    return null;
  }
};

export const removeFromLocalStorage = (key: LocalStorageKeys): void => {
  try {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

export const clearLocalStorage = (): void => {
  try {
    if (typeof window === "undefined") return;
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
