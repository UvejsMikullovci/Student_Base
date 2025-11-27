import React from "react";
import Text from "../../../atoms/Dorms/Text";
import LandlordCard from "../../../molecules/Dorms/RoomDetails/LandlordCard";
import ReviewCard from "../../../molecules/Dorms/RoomDetails/ReviewCard";
import AmenitiesList from "../../../molecules/Dorms/RoomDetails/AmenitiesList";
import "./RoomDetails.css"

export default function RoomDetails({ room }) {
  return (
    <div>
      <img src={room.image} alt={room.title} width="400" />
      <Text type="h2" content={room.title} />
      <Text content={`${room.address}`} />
      <Text content={`$${room.price} per month`} />
      <Text type="h3" content="Description" />
      <Text content={room.description} />

      <Text type="h3" content="Amenities" />
      <AmenitiesList amenities={room.amenities} />

      <LandlordCard name={room.landlord.name} />

      <Text type="h3" content="Reviews" />
      {room.reviews.map((r, i) => (
        <ReviewCard key={i} {...r} />
      ))}
    </div>
  );
}
