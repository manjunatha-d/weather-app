// -------------------------------------------------
// Dependencies
// -------------------------------------------------
const yargs = require("yargs");
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

// Since there is only one command (to fetch weather), why make the user type it? That's the reason we don't add any commands here
// Just add a flag to pass the address
// yargs.options() takes a configuration object
const argv = yargs
  .options({
    address: {
      demand: true,
      alias: "a",
      describe: "Address to fetch the weather for",
      string: true // tells yargs to parse 'address' as a string
    }
  })
  .help()
  .alias("help", "h") // Another way of setting alias
  .alias("version", "v").argv;

// console.log(argv);

const address = argv.address;
// It worked even without encoding address. Explore why? => That's because request method encodes it for you if you haven't done it already

// Encodes special characters like space, at, bang, etc
// Not necessary. The request module does it for you. Just adding it here so that you're aware of it.
const encodedAddress = encodeURIComponent(address);

// abstract the logic that gets the longitude and latitude of an address
// app.js does not need to be aware of this logic
geocode.geocodeAddress(encodedAddress, (errorMessage, address) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    // console.log(JSON.stringify(address, undefined, 2));
  
    weather.currentWeather(address.latitude, address.longitude, (errorMessage, weather) => {
      if(errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`Temperature: ${weather.temperature}`);
      }
    });
  }
});



