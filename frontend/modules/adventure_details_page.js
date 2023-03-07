import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  let arr=search.split("=")
  console.log(arr[1])
  return arr[1]
}

//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  let advndet;
  try{
    advndet=await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`)
    advndet=await advndet.json()
  }
  catch(err){
    return null
  }
  return advndet
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  console.log("Hello")
  console.log(adventure)  
  var head=document.getElementById("adventure-name")
  head.textContent=`${adventure.name}`
  var sub=document.getElementById("adventure-subtitle")
  sub.textContent=`${adventure.subtitle}`
  var imgelem=document.getElementById("photo-gallery")
  let str=""
  adventure.images.forEach((keys)=> {
    str+=`<img class="activity-card-image" src="${keys}">`
  

  });
  imgelem.innerHTML=`${str}`
  var obj=document.getElementById("adventure-content")
  obj.textContent=`${adventure.content}`
 

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  let main=document.getElementById("photo-gallery")
  main.innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="inner">
    <div class="carousel-item active" id="inner-first">
      
    </div>
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
  var obj=document.getElementById("inner-first")
  obj.innerHTML=`<img src="${images[0]}" class="d-block w-100">`
  
  for(let i=1;i<images.length;i++){
    var obj=document.getElementById("inner")
    var elem=document.createElement("div")
elem.setAttribute("class","carousel-item")
    elem.innerHTML=`<img src="${images[i]}" class="d-block w-100">`
    obj.append(elem)


  }

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  console.log("adventure")
  console.log(adventure)
  if(adventure.available){
  document.getElementById("reservation-panel-sold-out").style.display="none";
  document.getElementById("reservation-panel-available").style.display="block";
  document.getElementById("reservation-person-cost").textContent=adventure.costPerHead;}
  else{
    document.getElementById("reservation-panel-available").style.display="none";
    document.getElementById("reservation-panel-sold-out").style.display="block";

  }
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  console.log(adventure)
  console.log(persons)
  let cost=adventure.costPerHead*persons
  document.getElementById("reservation-cost").textContent=cost
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  let form=document.getElementById("myForm");
  const makeRequest = async (postObject) => { 
 const url = `${config.backendEndpoint}/reservations/new`;
  return await fetch(url, {
  method: "POST",
 body: JSON.stringify(postObject),
 headers: { 
 "Content-type": "application/json; charset=UTF-8"
  }
  }).then((response) => response.json()); }; 
 form.addEventListener("submit", (e) => { 
 e.preventDefault(); 
 const data = {
 name: form.elements["name"].value,
 date: form.elements["date"].value,
 person: form.elements["person"].value,
  adventure: adventure.id};
  makeRequest(data).then((res) => console.log(res));});
  if(adventure.reserved==true) {
 alert("Success!");
  location.reload(); }
 else{
  alert("Failed!");}
  console.log(adventure);}
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".


//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  console.log(adventure)
  if (adventure.reserved){
    document.getElementById("reserved-banner").style.display="block";

  }
  else{
    document.getElementById("reserved-banner").style.display="none";

  }
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
