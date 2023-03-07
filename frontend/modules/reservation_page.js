import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  try{
    cityarray=await fetch(`${config.backendEndpoint}/reservations/`)
    cityarray=await cityarray.json()
    }
    catch(err){
      return null
    }
    console.log(cityarray)
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them


  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  let count=0
  reservations.forEach((items)=>{
    count++;
  })
  if (count==0){
    document.getElementById("no-reservation-banner").style.display="block";
    document.getElementById("reservation-table-parent").style.display="none";

  }
  else{
    document.getElementById("no-reservation-banner").style.display="none";
    document.getElementById("reservation-table-parent").style.display="block";

  }
  let obj=document.getElementById("reservation-table")
  reservations.forEach((items)=>{
    let date = new Date(items.date);
    date=date.toLocaleDateString("en-IN")
    let row=document.createElement("tr")
    let time=new Date(items.time)
    time=time.toLocaleDateString("en-IN",{ day: "numeric", month:"long", year:"numeric", hour:"numeric",minute:"numeric",second:"numeric"}).replace(" at",",")
    row.innerHTML=`
    <td>${items.id}</td>
    <td>${items.name}</td>
    <td>${items.adventureName}</td>
    <td>${items.person}</td>
    <td>${date}</td>
    <td>${items.price}</td>
    <td>${time}</td>
    <td id=${items.id}><a href=${config.backendEndpoint}/frontend/pages/adventures/detail/?adventure=${items.adventure}><button class="reservation-visit-button" type="submit">Visit Adventure</button></a></td>`
    
    obj.append(row)

  })
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}


export { fetchReservations, addReservationToTable };
