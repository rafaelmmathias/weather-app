export const emptyResult = {
  result: {
    input: {
      benchmark: {
        id: "4",
        benchmarkName: "Public_AR_Current",
        benchmarkDescription: "Public Address Ranges - Current Benchmark",
        isDefault: false,
      },
      address: { address: "empty" },
    },
    addressMatches: [],
  },
};

export const withResults = {
  result: {
    input: {
      benchmark: {
        id: "4",
        benchmarkName: "Public_AR_Current",
        benchmarkDescription: "Public Address Ranges - Current Benchmark",
        isDefault: false,
      },
      address: { address: "501 E Lorene St, Payson, AZ 85541, USA" },
    },
    addressMatches: [
      {
        matchedAddress: "501 E LORENE ST, PAYSON, AZ, 85541",
        coordinates: { x: -111.31578, y: 34.244312 },
        tigerLine: { tigerLineId: "159323868", side: "R" },
        addressComponents: {
          fromAddress: "501",
          toAddress: "699",
          preQualifier: "",
          preDirection: "E",
          preType: "",
          streetName: "LORENE",
          suffixType: "ST",
          suffixDirection: "",
          suffixQualifier: "",
          city: "PAYSON",
          state: "AZ",
          zip: "85541",
        },
      },
    ],
  },
};
