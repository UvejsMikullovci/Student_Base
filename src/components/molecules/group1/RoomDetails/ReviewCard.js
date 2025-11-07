import React from "react";
import StarRating from "../../../atoms/group1/RoomDetails/StarRating";
import Text from "../../../atoms/group1/RoomDetails/Text";
import "./ReviewCard.css"

export default function ReviewCard({ name, date, comment, rating }) {
  return (
    <div>
      <Text type="h4" content={name} />
      <Text content={date} />
      <StarRating rating={rating} />
      <Text content={comment} />
    </div>
  );
}
