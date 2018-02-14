const request = require('request');

const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const API_KEY = '15eabf12900bdd1eb1e2bdbb9a7560c8';

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const callbackWeather = (error, currentlyWeather) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Temperature in ${currentlyWeather.address.address} is ${currentlyWeather.temperature}ºC.\nApparent temperature is ${currentlyWeather.apparentTemperature}ºC`);
  }
};

const callbackGeocode = (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    weather.getWeather(API_KEY, results, callbackWeather);
  }
};


geocode.geocodeAddress(argv.address, callbackGeocode);