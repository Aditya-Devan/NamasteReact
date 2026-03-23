import RestaurantCard from "./RestaurantCard";
import { useState , useEffect } from "react";

const Body = () => {
  // Local State Variable - Super powerful variable
const [listOfRestaurants, setListOfRestraunt] = useState([]);
const [filteredRestaurants, setFilteredRestaurants] = useState([]); // new
const [searchTxt, setsearchTxt] = useState("");

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.6232624&lng=73.7417281&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
  const json = await data.json();
  const restaurants = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
  
  setListOfRestraunt(restaurants);       // original - never touch this
  setFilteredRestaurants(restaurants);   // this is what we display & filter
};


  return (
    <div className="body">
      <div className="search">
        <input type="text" className="search-box" value={searchTxt}
          onChange={(e)=>{
           setsearchTxt( e.target.value);
          }}
        ></input>
       <button
        onClick={() => {
        const filteredResList = listOfRestaurants.filter((res) =>
        res.info.name.toLowerCase().includes(searchTxt.toLowerCase())
        );
        setFilteredRestaurants(filteredResList); // update filtered, not original
    }}
>
  Search
</button>
      </div>
      <div className="filter">
         <button
           className="filter-btn"
          onClick={() => {
             const filteredList = listOfRestaurants.filter(
             (res) => res.info.avgRating > 4
           );
       setFilteredRestaurants(filteredList); // same here
  }}
   >
     Top Rated Restaurants
    </button>
      </div>
        <div className="res-contain">
         {filteredRestaurants.map((restaurant) => (
         <RestaurantCard key={restaurant.info.id} resData={restaurant} />
         ))}
       </div>
    </div>
  );
};

export default Body;