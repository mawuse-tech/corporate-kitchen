import localforage from "localforage";

localforage.config({
  name: "CorporateKitchens",
  storeName: "app_storage"
});

export const saveItem = async (key, value) => {
  return await localforage.setItem(key, value);
};

export const getItem = async (key) => {
  return await localforage.getItem(key);
};

export const removeItem = async (key) => {
  return await localforage.removeItem(key);
};
