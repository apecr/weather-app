const request = require('request');

const getWeather = (apiKey, address, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${apiKey}/${address.latitude},${address.longitude}?lang=es&units=si`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
        address
      });
    } else {
      callback('Unable to fetch weather');
    }
  });

};

module.exports = {
  getWeather
};