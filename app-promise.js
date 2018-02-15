const axios = require('axios');
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

const encodeAddress = encodeURIComponent;

const encodedAddress = encodeAddress(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
const getAddress = (response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }
  return {
    address: response.data.results[0].formatted_address,
    latitude: response.data.results[0].geometry.location.lat,
    longitude: response.data.results[0].geometry.location.lng
  };
};

const logWeather = (responseWeather) => {
  return console.log(`Temperature in ${responseWeather.address.address} is ${responseWeather.temperature}ºC.\nApparent temperature is ${responseWeather.apparentTemperature}ºC`);
};

const getWeather = (address) => {
  return axios.get(`https://api.darksky.net/forecast/${API_KEY}/${address.latitude},${address.longitude}?lang=es&units=si`).then((responseWeather) => {
    return {
      temperature: responseWeather.data.currently.temperature,
      apparentTemperature: responseWeather.data.currently.apparentTemperature,
      address
    };
  });
};

axios.get(geocodeUrl)
  .then(getAddress)
  .then(getWeather)
  .then(logWeather)
  .catch((e) => {
    if (e.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers');
    } else {
      console.log(e.message);
    }
  });