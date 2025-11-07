import React from "react";
import Text from "../../../atoms/group1/RoomDetails/Text";
import Button from "../../../atoms/group1/RoomDetails/Button";
import "./LandlordCard.css"

export default function LandlordCard({ name }) {
  return (
    <div>
      <Text type="h4" content={name} />
      <Button label="View Profile" />
      <Button label="Contact Landlord" />
    </div>
  );
}
