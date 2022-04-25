import axios from "axios";
import { GeocoderResponse, GetAddress } from "./geocoding.types";

export const getAddresses: GetAddress = async (addressLine) => {
  const result = await axios.get<GeocoderResponse>("http://localhost:3001", {
    params: {
      address: addressLine,
    },
  });

  return result.data;
};
