import React, { useState, useEffect } from "react";
import "./PanelLandlordDorms.css";
import { db } from "../../../../../Firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function PanelLandlordDorms() {
  const [dorms, setDorms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingDormId, setEditingDormId] = useState(null); // track edit mode
  const [newDorm, setNewDorm] = useState({
    title: "",
    price: "",
    description: "",
    beds: 1,
    baths: 1,
    address: "",
    status: "available",
    imageFile: null,
    image: "",
  });
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  const auth = getAuth();
  const storage = getStorage();

  // 🔹 Fetch user role & dorms
  useEffect(() => {
    const fetchUser = async () => {
      if (!auth.currentUser) return;
      const uid = auth.currentUser.uid;
      setUserId(uid);

      const userSnap = await getDocs(collection(db, "registrations"));
      const currentUser = userSnap.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .find((u) => u.id === uid);
      setUserRole(currentUser?.role || null);

      if (currentUser?.role === "Landlord") {
        const dormsCol = collection(db, "registrations", uid, "dorms");
        const dormsSnap = await getDocs(dormsCol);
        setDorms(dormsSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    };
    fetchUser();
  }, [auth.currentUser]);

  // 🔹 Add or update dorm
  const handleSaveDorm = async (e) => {
    e.preventDefault();
    if (userRole !== "Landlord") {
      alert("Only landlords can manage dorms!");
      return;
    }

    try {
      let imageUrl = newDorm.image;
      // Upload file if selected
      if (newDorm.imageFile) {
        const imageRef = ref(storage, `dorms/${userId}/${Date.now()}_${newDorm.imageFile.name}`);
        await uploadBytes(imageRef, newDorm.imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const dormData = { ...newDorm, image: imageUrl };
      delete dormData.imageFile;

      const dormsCol = collection(db, "registrations", userId, "dorms");

      if (editingDormId) {
        // Update existing dorm
        const dormDoc = doc(db, "registrations", userId, "dorms", editingDormId);
        await updateDoc(dormDoc, dormData);
        setDorms(dorms.map(d => d.id === editingDormId ? { ...d, ...dormData } : d));
      } else {
        // Add new dorm
        const docRef = await addDoc(dormsCol, dormData);
        setDorms([...dorms, { ...dormData, id: docRef.id }]);
      }

      setShowModal(false);
      setEditingDormId(null);
      setNewDorm({
        title: "",
        price: "",
        description: "",
        beds: 1,
        baths: 1,
        address: "",
        status: "available",
        imageFile: null,
        image: "",
      });
    } catch (error) {
      console.error("Error saving dorm:", error);
    }
  };

  // 🔹 Open modal for editing
  const handleEdit = (dorm) => {
    setEditingDormId(dorm.id);
    setNewDorm({ ...dorm, imageFile: null });
    setShowModal(true);
  };

  // 🔹 Delete dorm
  const handleDelete = async (id) => {
    const dormDoc = doc(db, "registrations", userId, "dorms", id);
    await deleteDoc(dormDoc);
    setDorms(dorms.filter(d => d.id !== id));
  };

  return (
    <div className="panel-container">
      <div className="panel-header">
        <h2>Dorm Management</h2>
        {userRole === "Landlord" && (
          <button className="add-btn" onClick={() => setShowModal(true)}>
            Add New
          </button>
        )}
      </div>

      <div className="dorm-grid">
        {dorms.map(dorm => (
          <div className="dorm-card" key={dorm.id}>
            {dorm.image && <img src={dorm.image} alt={dorm.title} className="dorm-image" />}
            <div className="dorm-content">
              <h3>{dorm.title}</h3>
              <span className={`status ${dorm.status}`}>{dorm.status}</span>
              <p className="address">📍 {dorm.address}</p>
              <p className="description">{dorm.description}</p>
              <p className="price">{dorm.price}</p>
              <p className="details">
                {dorm.beds} bed • {dorm.baths} bath
              </p>
            </div>
            <div className="actions">
              <button className="edit-btn" onClick={() => handleEdit(dorm)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(dorm.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{editingDormId ? "Edit Dorm" : "Add New Dorm"}</h3>
            <form onSubmit={handleSaveDorm} className="modal-form">
              <input
                type="text"
                placeholder="Title"
                value={newDorm.title}
                onChange={(e) => setNewDorm({ ...newDorm, title: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Price (e.g. $600/month)"
                value={newDorm.price}
                onChange={(e) => setNewDorm({ ...newDorm, price: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={newDorm.address}
                onChange={(e) => setNewDorm({ ...newDorm, address: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                value={newDorm.description}
                onChange={(e) => setNewDorm({ ...newDorm, description: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Beds"
                value={newDorm.beds}
                onChange={(e) => setNewDorm({ ...newDorm, beds: parseInt(e.target.value) })}
                min={1}
                required
              />
              <input
                type="number"
                placeholder="Baths"
                value={newDorm.baths}
                onChange={(e) => setNewDorm({ ...newDorm, baths: parseInt(e.target.value) })}
                min={1}
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewDorm({ ...newDorm, imageFile: e.target.files[0] })}
              />
              <div className="modal-actions">
                <button type="submit" className="save-btn">{editingDormId ? "Save Changes" : "Add Dorm"}</button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => { setShowModal(false); setEditingDormId(null); }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
