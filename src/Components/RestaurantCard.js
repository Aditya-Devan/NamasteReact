import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  return (
    <div className="res-card">
      <img
        className="res-logo"
        alt="res-logo"
        src={CDN_URL + resData.info.cloudinaryImageId}
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38";
        }}
      />

      <h3>{resData.info.name}</h3>
      <h4>{resData.info.cuisines.join(", ")}</h4>
      <h4>{resData.info.avgRating} stars</h4>
      <h4>{resData.info.costForTwo} </h4>
      <h4>{resData.info.sla.deliveryTime} minutes</h4>
    </div>
  );
};

export default RestaurantCard;     