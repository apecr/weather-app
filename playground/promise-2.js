const request = require('request');
const encodeAddress = encodeURIComponent;

const geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeAddress(address);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Google Servers.');
      } else if (body.status === 'ZERO_RESULTS') {
        reject(`Unable to find the address ${encodedAddress}`);
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    });
  });
};

const printPretty = (object) => JSON.stringify(object, undefined, 2);

geocodeAddress('19146')
  .then(printPretty)
  .then(console.log)
  .catch(console.log);

module.exports = {geocodeAddress};