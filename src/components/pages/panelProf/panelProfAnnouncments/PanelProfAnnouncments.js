import React, { useState, useEffect } from "react";
import { db } from "../../../../Firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import "./PanelProfAnnouncements.css";

const PanelProfAnnouncments = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const announcementsCollection = collection(db, "announcements");

  // Fetch announcements from Firebase
  const fetchAnnouncements = async () => {
    try {
      const data = await getDocs(announcementsCollection);
      const formattedData = data.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      formattedData.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setAnnouncements(formattedData);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      alert("Failed to fetch announcements. Check console.");
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Add new announcement
  const handleAddAnnouncement = async () => {
    if (!newAnnouncement.trim()) {
      alert("Announcement cannot be empty");
      return;
    }

    try {
      const docRef = await addDoc(announcementsCollection, {
        text: newAnnouncement,
        createdAt: serverTimestamp(),
      });

      console.log("Added document ID:", docRef.id);

      // Fetch updated list from Firebase
      await fetchAnnouncements();
      setNewAnnouncement("");
    } catch (error) {
      console.error("Error adding announcement:", error);
      alert("Failed to add announcement. Check console.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "announcements", id));
      await fetchAnnouncements();
    } catch (error) {
      console.error("Error deleting announcement:", error);
      alert("Failed to delete. Check console.");
    }
  };

  const handleEdit = (id, currentText) => {
    setEditingId(id);
    setEditingText(currentText);
  };

  const handleSaveEdit = async (id) => {
    if (!editingText.trim()) return;

    try {
      await updateDoc(doc(db, "announcements", id), { text: editingText });
      setEditingId(null);
      setEditingText("");
      await fetchAnnouncements();
    } catch (error) {
      console.error("Error updating announcement:", error);
      alert("Failed to update. Check console.");
    }
  };

  return (
    <div className="panel-prof-announcements">
      <h2>Professor Announcements</h2>
      <div className="add-announcement">
        <input
          type="text"
          placeholder="Enter new announcement..."
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
        />
        <button onClick={handleAddAnnouncement}>Add</button>
      </div>

      <ul className="announcement-list">
        {announcements.length === 0 ? (
          <li>No announcements yet.</li>
        ) : (
          announcements.map((announcement) => (
            <li key={announcement.id}>
              {editingId === announcement.id ? (
                <>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button onClick={() => handleSaveEdit(announcement.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{announcement.text}</span>
                  <button onClick={() => handleEdit(announcement.id, announcement.text)}>Edit</button>
                  <button onClick={() => handleDelete(announcement.id)}>Delete</button>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PanelProfAnnouncments;
