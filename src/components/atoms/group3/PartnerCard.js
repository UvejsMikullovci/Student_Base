import React from "react";

export default function PartnerCard({ name }) {
  return (
    <div className="bg-red-50 border border-red-100 text-center py-4 px-6 rounded-xl hover:shadow-md transition">
      <p className="text-gray-800 font-medium">{name}</p>
    </div>
  );
}
