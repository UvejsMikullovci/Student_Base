import React from "react";
import RoomDetails from "../../../organisms/group1/RoomDetails/RoomDetails";

export default function RoomListingPage() {
  const roomData = {
    image: "https://via.placeholder.com/400",
    title: "Shared Room in Downtown",
    address: "45B Downtown Ave",
    price: 450,
    description:
      "Affordable shared room in a quiet neighborhood. Close to public transport and shopping centers. Great community atmosphere with other students.",
    amenities: ["Shared Kitchen", "Wi-Fi", "Laundry"],
    landlord: { name: "Robert Anderson" },
    reviews: [
      {
        name: "John Smith",
        date: "03/24/2025",
        comment: "Great location and well-maintained property. The landlord is very responsive.",
        rating: 5,
      },
      {
        name: "Emily Davis",
        date: "03/21/2025",
        comment: "Nice clean room, close to campus. Would recommend to other students.",
        rating: 4,
      },
      {
        name: "Michael Brown",
        date: "03/20/2025",
        comment: "Perfect for students! Clean, quiet, and affordable.",
        rating: 5,
      },
    ],
  };

  return <RoomDetails room={roomData} />;
}
