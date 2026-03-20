import RestaurantCard from "./RestaurantCard";
import { useState , useEffect } from "react";
import { resList } from "../utils/mockData";

const Body = () => {
  // Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestraunt] = useState(resList);

  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData= async()=>{
     const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.6232624&lng=73.7417281&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
  
        const json=await data.json();
        console.log(json);
        setListOfRestraunt(
  json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
);

    }


  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            setListOfRestraunt(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      <div className="res-contain">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;