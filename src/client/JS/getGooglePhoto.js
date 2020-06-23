const axios = require("axios");

exports.getGooglePhoto = async (query) => {
  var imageUrl =
    "https://img.freepik.com/free-vector/plain-blue-sky-background_1308-20781.jpg?size=626&ext=jpg";
  try {
    var googleData = await axios.get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
        query
      )}&inputtype=textquery&fields=place_id&locationbias=circle:2000@47.6918452,-122.2226413&key=${
        process.env.GOOGLE_API
      }`
    );
    console.log(
      `query: https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
        query
      )}&inputtype=textquery&fields=place_id&locationbias=circle:2000@47.6918452,-122.2226413&key=${
        process.env.GOOGLE_API
      }`
    );
    console.log("data: ", googleData.data);
    var placeId = googleData.data.candidates[0].place_id;

    var placeData = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photo&key=${process.env.GOOGLE_API}`
    );
    var photoReference = placeData.data.result.photos[0].photo_reference;
    imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.GOOGLE_API}`;
  } catch (error) {
    console.log("error while fetching image: ", error);
  }

  return imageUrl;
};
