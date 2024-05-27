import { axios } from "../../packages/axios";
import _axios, { CancelTokenSource } from "axios";

interface IRequestAddress {
  addressLine1: string;
  city: string;
  country: string;
  pincode: string;
}

interface ICoordinates {
  lon: string;
  lat: string;
}
interface IUseMapsReturns {
  getCoordinates: (
    address: IRequestAddress
  ) => Promise<ICoordinates & { success: boolean; message?: string }>;
  getAutoComplete: (keyword: string) => Promise<any[]>;
}

export const useMaps = (): IUseMapsReturns => {
  let cancleTokenSource: CancelTokenSource | null = null;

  return {
    getCoordinates: async (address) => {
      try {
        const address_line1 = encodeURIComponent(address.addressLine1);
        const city = encodeURIComponent(address.city);
        const country = encodeURIComponent(address.city);
        const postcode = encodeURIComponent(address.pincode);
        const result = await axios.get(
          `https://api.geoapify.com/v1/geocode/search?address_line=${address_line1}&city=${city}&country=${country}&postcode=${postcode}&format=json&apiKey=3bb455ff7776401392c680d7299291df`
        );
        const resultAddress = result.data.results[0];

        if (
          !(
            resultAddress.country.toLowerCase() !=
              country.toLocaleLowerCase() ||
            resultAddress.city.toLocaleLowerCase() != city.toLowerCase()
          )
        ) {
          return {
            success: false,
            message: "Verification for this Address failed",
            lon: "",
            lat: "",
          };
        }

        if (resultAddress) {
          return {
            success: true,
            lon: resultAddress.lon,
            lat: resultAddress.lat,
          };
        }
        return {
          success: false,
          message: "Error while fetching the coordinates",
          lon: "",
          lat: "",
        };
      } catch (error) {
        return {
          success: false,
          message: "Error while fetching the coordinates",
          lon: "",
          lat: "",
        };
      }
    },
    getAutoComplete: async (keyword) => {
      if (cancleTokenSource) {
        cancleTokenSource.cancel("");
      }

      cancleTokenSource = _axios.CancelToken.source();
      try {
        const response = await _axios.get(
          `https://api.locationiq.com/v1/autocomplete?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY}&q=${keyword}`,
          {
            cancelToken: cancleTokenSource.token,
          }
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        if (_axios.isCancel(error)) {
          console.log("Previous request canceled:", error.message);
        } else {
          console.error("Error fetching search results:", error);
        }
        return [];
      }
    },
  };
};
