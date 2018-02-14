const request = require('request');
const encodeAddress = encodeURIComponent;

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeAddress(address);
  return request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google Servers.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback(`Unable to find the address ${encodedAddress}`);
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};


module.exports = {
  geocodeAddress
};