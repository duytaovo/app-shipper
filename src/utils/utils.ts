import axios, { AxiosError, HttpStatusCode } from "axios";
import { ErrorResponse } from "../types/utils.type";

export const payloadCreator =
  (asyncFunc: any) => async (arg: any, thunkAPI: any) => {
    try {
      const res = await asyncFunc(arg);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  };
export const rateSale = (original: number, sale: number) =>
  Math.round(((original - sale) / original) * 100) + "%";
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntityError<FormError>(
  error: unknown,
): error is AxiosError<FormError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.UnprocessableEntity
  );
}

export function isAxiosUnauthorizedError<UnauthorizedError>(
  error: unknown,
): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.InternalServerError
  );
}

export function isAxiosExpiredTokenError<UnauthorizedError>(
  error: unknown,
): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(
      error,
    ) && error.response?.data?.data?.name === "EXPIRED_TOKEN"
  );
}

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str?.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    "",
  );

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name)?.replace(/\s/g, "-") + `-i-${id}`;
};

export const getIdFromNameId = (name: string) => {
  const arr = name?.split("-i-");
  return arr[arr?.length - 1];
};

// export const getAvatarUrl = (avatarName?: string) =>
//   avatarName ? `${config.baseUrl}images/${avatarName}` : userImage;

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat("de-DE").format(currency);
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(value)
    .replace(".", ",")
    .toLowerCase();
}

export const convertAddressToCommonFormat = (addressData: any) => {
  if (addressData && addressData.geometry) {
    // Nếu có dữ liệu hình học, sử dụng nó để xác định tọa độ
    const { coordinates } = addressData.geometry;
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: coordinates.reverse(), // Lưu ý: leaflet sử dụng [lat, lng]
      },
      properties: {
        layer: "venue",
        name: addressData.properties.name || "",
        distance: addressData.properties.distance || null,
        accuracy: "point",
        region: addressData.properties.region || "",
        region_gid: addressData.properties.region_gid || "",
        county: addressData.properties.county || "",
        county_gid: addressData.properties.county_gid || "",
        locality: addressData.properties.locality || "",
        locality_gid: addressData.properties.locality_gid || "",
        label: addressData.properties.label || "",
        address: addressData.properties.addendum?.address || "",
        addendum: addressData.properties.addendum || null,
        block: null,
        floor: null,
      },
      bbox: [
        coordinates[1], // Tọa độ lat
        coordinates[0], // Tọa độ lng
        coordinates[1], // Tọa độ lat
        coordinates[0], // Tọa độ lng
      ],
      Id: addressData.Id || null,
    };
  } else if (addressData && addressData.lat && addressData.lng) {
    // Nếu chỉ có tọa độ lat và lng, sử dụng chúng
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [addressData.lng, addressData.lat], // Lưu ý: leaflet sử dụng [lng, lat]
      },
      properties: {
        layer: "venue",
        name: addressData.name || "",
        distance: addressData.distance || null,
        accuracy: "point",
        region: addressData.address || "",
        region_gid: null,
        county: null,
        county_gid: null,
        locality: null,
        locality_gid: null,
        label: addressData.display || "",
        address: null,
        addendum: null,
        block: null,
        floor: null,
      },
      bbox: [
        addressData.lng,
        addressData.lat,
        addressData.lng,
        addressData.lat,
      ],
      Id: null,
    };
  } else {
    return null;
  }
};
