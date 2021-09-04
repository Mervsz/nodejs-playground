import request from "postman-request";
const weatherStackBaseURL = "http://api.weatherstack.com";
const weatherStackAccessKey = "28a33358a630c56619c7e3118b8c3bd9";

const forecast = (latitude, longitude, callback) => {
  const url = `${weatherStackBaseURL}/current?access_key=${weatherStackAccessKey}&query=${latitude},${longitude}`;

  request.get({ url: url, json: true }, (error, response) => {
    const { body } = response;
    if (error) {
      callback("Unable to connect to weather services", null);
    } else if (body.error) {
      callback("Unable to find location", null);
    } else {
      const temperature = body.current.temperature;
      callback(null, `Temperature is ${temperature}`);
    }
  });
};

export { forecast };
