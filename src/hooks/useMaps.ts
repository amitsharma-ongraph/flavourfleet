import axios from "axios";

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
}

export const useMaps = (): IUseMapsReturns => {
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
  };
};
