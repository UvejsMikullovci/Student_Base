import React from "react";

export default function TeamCard({ name, position, image }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden text-center p-4">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-2xl mb-3"
      />
      <h4 className="font-semibold text-lg">{name}</h4>
      <p className="text-gray-500">{position}</p>
    </div>
  );
}
