import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(config.backendEndpoint);

  //Updates the DOM with the cities
  cities.forEach((key) => {
   addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  let cityarray;
  try{
  cityarray=await fetch(`${config.backendEndpoint}/cities`)
  cityarray=await cityarray.json()
  }
  catch(err){
    return null
  }
  return cityarray
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  let cityOb=document.getElementById("data");
  cityOb.setAttribute("class","row row-cols-1 row-cols-sm-2 row-cols-xl-4");
  var cityEle=document.createElement("div");
  cityEle.setAttribute("class","col");

  cityEle.innerHTML=`<a href=/pages/adventures/?city=${id} id=${id}>
  <div class="tile">
    <img src=${image} />
    <div class="tile-text text-center">
    <h4>${city}</h4>
    <p>${description}</p>
  </div>
  </div></a>`;
  cityOb.append(cityEle);
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

}

export { init, fetchCities, addCityToDOM };
