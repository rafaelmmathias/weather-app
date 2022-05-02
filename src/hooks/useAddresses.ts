import useSWR from "swr";
import { getAddresses } from "services/geocoder/geocoding";

export const useAddresses = (address: string) => {  
  const { data, error, ...rest } = useSWR(address, getAddresses, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  
  return {
    ...rest,
    addresses: data?.result.addressMatches,
    isLoading: !error && !data && !!address,
    error: error,
  };
};
