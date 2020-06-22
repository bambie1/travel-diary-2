# Travel_App

## Additional features

Allow the user to:

- remove the trip
- add notes for trip
- View image of country when city has no image on Pixabay
- View weather icons on forecast

## API keys

You'll need to sign up for 3 API keys/IDs if you don't have them already:
[Geonames](https://www.geonames.org/), [Weatherbit](https://www.weatherbit.io/api), [Pixabay](https://pixabay.com/api/docs), [Algolia](https://community.algolia.com/places/documentation.html)

- create a `.env` file, and assign the following variables accordingly
  - geonames key: g_key
  - weatherbit key: w_key
  - pixabay key: p_key
  - algolia ID: algolia_ID
  - algolia key: algolia_KEY
    Also, define a port to run the server in this file

## Installation

Fork repo, and clone `master` branch.
Run `npm install` to use the node environment
