
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  return search.slice(6,)
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  console.log(city)
  let advnarray;
  try{
  advnarray=await fetch(`${config.backendEndpoint}/adventures?city=${city}`)
  advnarray=await advnarray.json()
  }
  catch(err){
    return null
  }
  return advnarray
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  adventures.forEach((key) => {
  var obj=document.getElementById("data")
  obj.setAttribute("class","row row-cols-1 row-cols-sm-2 row-cols-xl-4");
  var advnEle=document.createElement("div");
  advnEle.setAttribute("class","col ");
  advnEle.innerHTML=` <a href="detail/?adventure=${key.id}" id=${key.id}>
  
  <div class="activity-card ">
  <div class="category-banner">${key.category}</div>
  <div>
    <img class="activity-card img " src="${key.image}" height:"800"/></div>
    <div class="card-footer  ">
      <h4>${key.name} ${key.currency} ${key.costPerHead}</h4>
      <p>Duration   ${key.duration} Hours<p>
    </div>
  </div>
  </a>`


obj.append(advnEle)
    
   });
  
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  let arr=[]
list.forEach((keys) => {
  if ( keys.duration>parseInt(low) && keys.duration<=parseInt(high))
  {
    arr.push(keys)
  }

}); 
console.log(arr)
// TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return arr

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  let arr=[]
  categoryList.forEach((vals)=>{
  list.forEach((keys) => {
    if ( keys.category==vals)
    {
      arr.push(keys)
    }
  
  }); 
});
  console.log(arr)
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
return arr;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {


 console.log(filters.duration.length)
  if (filters.duration.length>0 && filters.category.length==0)
  {
    console.log("Hello")
    let arr=filters.duration.split("-")
    list=filterByDuration(list,parseInt(arr[0]),parseInt(arr[1]))
  }
  else if (filters.duration.length==0 && filters.category.length>0)
  {
    list=filterByCategory(list,filters.category)
  }
  else if (filters.duration.length>0 && filters.category.length>0){
    let arr=filters.duration.split("-")
    list=filterByDuration(list,parseInt(arr[0]),parseInt(arr[1]))
    list=filterByCategory(list,filters.category)

  }
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  filters=JSON.stringify(filters)
  localStorage.setItem("filters", filters);
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  let name = localStorage.getItem("filters");
  name=JSON.parse(name)
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return name;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  let catEle=document.getElementById("category-list");
  catEle.innerHTML="";
  filters.category.forEach((cat)=>{
    let divEle=document.createElement("div");
    divEle.setAttribute('style','border:1px solid orange;border-radius:16px;margin:4px;')
    divEle.textContent=cat;
    catEle.append(divEle);
  });
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
