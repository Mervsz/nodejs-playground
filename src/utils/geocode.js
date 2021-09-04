import request from "postman-request";

const mapBoxURL = "https://api.mapbox.com/geocoding/v5";
const mapBoxAccessToken =
  "pk.eyJ1IjoibWVydnpzMDIiLCJhIjoiY2tzeTl3Ym82Mmg4bTJvbzNyemh0Z285byJ9.wwzPqlkB9gBwgvExKSpMfg";

const geocode = (address, callback) => {
  const url = `${mapBoxURL}/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${mapBoxAccessToken}&limit=1`;
  request({ url, json: true }, (error, response) => {
    const { body } = response;
    if (error) {
      callback("Unable to connect to location services", null);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const latitude = body.features[0].geometry.coordinates[1];
      const longitude = body.features[0].geometry.coordinates[0];
      const placeName = body.features[0].place_name;
      callback(null, { placeName, latitude, longitude });
    }
  });
};

export { geocode };
