import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveTokenToStore(key, data) {
  try {
    await AsyncStorage.setItem(key, data);
    return true;
  } catch (e) {
    return false;
  }
}

export const getTokenFromStore = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (e) {
    return false;
  }
};

export async function removeTokenFromStore(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

