import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveTokenToStore(key: any, data: any) {
  try {
    console.log(key)
    console.log(data)
    await AsyncStorage.setItem(key, data);
    return true;
  } catch (e) {
    return false;
  }
}

export const getTokenFromStore = async (key: any) => {
  try {
    const data = await AsyncStorage.getItem(key);
    console.log(key)
    console.log(data)
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

