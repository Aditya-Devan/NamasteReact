import React from "react";
import ReactDOM from "react-dom/client";

 const Header=()=>{
   return (
    <div className="header">
    <div className="logo-container">
    <img className="logo" src="https://cdn.logojoy.com/wp-content/uploads/20200506165903/skip-the-dishes-ad.png"/>
   </div>
  <div className="nav-items">
   <ul>
    <li>Home</li>
    <li>About Us</li>
    <li>Connect</li>
    <li>Cart</li>
   </ul>
  </div>
  </div>
   );
 
 };

 const RestaurantCard=(props)=>{
    const {resName , cousines}=props;
   return(
      <div className="res-card" style={{backgroundColor:"#f0f0f0"}}>
        <img 
         className="res-logo" alt="res-logo"
         src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/FOOD_CATALOG/IMAGES/CMS/2024/3/5/b9e3f92d-a22a-4e5d-8c4b-5d7555fb80d8_1e322b26-602c-4a21-aa39-e20980eb6529_compressed" />
        <h3>{resName}</h3>
        <h4>{cousines}</h4>
        <h4>4.4</h4>
        <h4>38 minutes</h4>
      </div>
   )
 }

 const Body=()=>{
  return(
      <div className="body">
    <div className="search">Search</div>
    <div className="res-contain">
      <RestaurantCard
       resName="Meghana Foods" cousines="Biryani,North Indian,Asian"
      /> 
      <RestaurantCard resName="KFC" cousines="Burger,fast Food" />
    </div>
  </div>
  )
  
 }

 const AppLayout=()=>{
  return (
    <div className="app">
     <Header/>
     <Body/> 
    </div>
  );
 }

const root=ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout/>);


