const geocodingRequest = async () => {
    // geocoding request must use IP restricted key, not browser
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=77479&key=AIzaSyDWYw5vMbf-76WEcl353SdLL_GK5vbGNlM"
    let response = await fetch(url);
    const jsonRes = await response.json();
    displayGeocodingResults(jsonRes);
  
  };
  
  const displayGeocodingResults = (response) => {
    const resultSpot = document.getElementById("res");
    resultSpot.innerHTML = response.results[0].formatted_address;
};

module.exports = {geocodingRequest};