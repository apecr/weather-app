const request = require('request');

// const yargs = require('yargs');
// const geocode = require('./geocode/geocode');

// const argv = yargs
//   .options({
//     a: {
//       demand: true,
//       alias: 'address',
//       describe: 'Address to fetch weather for',
//       string: true
//     }
//   })
//   .help()
//   .alias('help', 'h')
//   .argv;

// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//   if (errorMessage) {
//     console.log(errorMessage);
//   } else {
//     console.log(JSON.stringify(results, undefined, 2));
//   }
// });

// 15eabf12900bdd1eb1e2bdbb9a7560c8
// https://api.darksky.net/forecast/15eabf12900bdd1eb1e2bdbb9a7560c8/42.4298846,-8.6446202

// body.currently.temperature

request({
  url: 'https://api.darksky.net/forecast/15eabf12900bdd1eb1e2bdbb9a7560c8/42.4298846,-8.6446202?lang=es&units=si',
  json: true
}, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    console.log('Temperature in Pontevedra now', body.currently.temperature, 'ºC');
  } else {
    console.log('Unable to fetch weather');
  }
});