import { useState , useEffect } from "react";

const RestaurantMenu=()=>{

    useEffect(()=>{
      fetchMenu();
    },[])
 
     const fetchMenu = async () => {
  try {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.6197209&lng=73.7498939&restaurantId=197247",
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "application/json",
        },
      }
    );

    const text = await data.text();   // 👈 DEBUG STEP
    console.log(text);

    const json = JSON.parse(text);    // safer than direct .json()
    console.log(json);

  } catch (err) {
    console.log("Error:", err);
  }
};

    return(
        <div>
            <h1>Restaurant Name</h1>
            <ul>
                <li>Burger</li>
                <li>pizza</li>
                <li>Soft Drinks</li>
            </ul>
        </div>
    )
}

 export default RestaurantMenu;


 //https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.6197209&lng=73.7498939&restaurantId=62957&catalog_qa=undefined&submitAction=ENTER
 //https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.6197209&lng=73.7498939&restaurantId=197247&catalog_qa=undefined&submitAction=ENTER