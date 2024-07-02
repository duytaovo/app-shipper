import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveTokenToStore(key: any, data: any) {
  try {
    await AsyncStorage.setItem(key, data);
    return true;
  } catch (e) {
    return false;
  }
}

export const getTokenFromStore = async (key: any) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (e) {
    return false;
  }
};

export async function removeTokenFromStore(key:any) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

