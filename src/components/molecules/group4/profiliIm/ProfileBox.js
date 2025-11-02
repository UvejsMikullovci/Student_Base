import React, { useState, useEffect } from "react";
import "./ProfileBox.css";
import { Camera } from "lucide-react";

export default function ProfileBox({ profile, src, name, email, role }) {
  const [image, setImage] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) setImage(savedImage);
  }, []);

  // Compress & resize before saving
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Delete old image first
    localStorage.removeItem("profileImage");

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 200; // max width in px
        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Compress to JPEG (0.7 quality)
        const compressed = canvas.toDataURL("image/jpeg", 0.7);

        try {
          localStorage.setItem("profileImage", compressed);
          setImage(compressed);
        } catch (err) {
          console.error("Error saving image:", err);
          alert("Fotoja është shumë e madhe. Zgjidh një me madhësi më të vogël.");
        }
      };
    };

    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="div-profileBox">
      <div className="div-profileBoxTitle">
        {image ? (
          <img src={image} alt="Profile" className="profile-photo" />
        ) : src ? (
          <img src={src} alt="Profile" className="profile-photo" />
        ) : (
          <h1>{profile}</h1>
        )}
      </div>

      <h2>{name}</h2>
      <p>{email}</p>
      <p>{role}</p>

      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />

      <button className="change-photo-btn" onClick={triggerFileInput}>
        <Camera size={16} style={{ marginRight: "6px" }} />
        Ndrysho Foton
      </button>
    </div>
  );
}