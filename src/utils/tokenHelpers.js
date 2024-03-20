import { getData, removeData, saveData } from "./secureStore";

async function saveTokenToStore(accessToken, keyName) {
  if (accessToken == "") {
    return false;
  }

  await saveData(keyName, accessToken);
  return true;
}

async function getTokenFromStore(keyName = process.env.ACCESS_TOKEN_KEY) {
  try {
    return await getData(keyName);
  } catch (err) {
    return err;
  }
}

async function removeTokenFromStore(keyName = process.env.ACCESS_TOKEN_KEY) {
  try {
    return await removeData(keyName);
  } catch (err) {
    return err;
  }
}

