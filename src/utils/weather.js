const request = require("request");

const weather = (city, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    encodeURIComponent(city) +
    "&units=metric&appid=fd101856268b92f37fcb9280a3235743";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to find service", undefined);
    } else if (body.message) {
      callback("Unable to find location , Try another search");
    } else {
      callback(undefined, {
        icon: body.weather[0].icon,
        msg:
          "The temperature in " +
          body.name +
          " is " +
          body.main.temp +
          " degree",
      });
    }
  });
};

module.exports = weather;
