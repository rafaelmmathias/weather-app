const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = 3001;
app.use(cors());

const geocodingInstance = axios.create({
  baseURL: "https://geocoding.geo.census.gov",
});

const getAddresses = async (addressLine) => {
  const data = await geocodingInstance.get(
    "/geocoder/locations/onelineaddress",
    {
      params: {
        format: "json",
        benchmark: 4,
        address: addressLine,
      },
    }
  );

  return data.data;
};

app.get("/", async (req, res) => {
  const data = await getAddresses(req.query.address);
    
  res.send(data)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
