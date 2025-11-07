import React, { useState, useEffect } from "react";
import { db, auth } from "../../../../Firebase/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import "./PanelProfAnnouncements.css";

const PanelProfAnnouncments = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Watch for auth state (get user ID)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const announcementsRef = collection(
      db,
      "registrations",
      userId,
      "announcements"
    );
    const q = query(announcementsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnnouncements(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching announcements:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  // ✅ Add new announcement (auto random ID)
  const handleAddAnnouncement = async () => {
    if (!newAnnouncement.trim() || !userId) return;
    try {
      const announcementsRef = collection(
        db,
        "registrations",
        userId,
        "announcements"
      );
      const docRef = await addDoc(announcementsRef, {
        text: newAnnouncement.trim(),
        createdAt: serverTimestamp(),
      });
      console.log("✅ Added document with ID:", docRef.id);
      setNewAnnouncement("");
    } catch (error) {
      console.error("❌ Error adding announcement:", error);
    }
  };

  // ✅ Delete announcement
  const handleDelete = async (id) => {
    if (!userId) return;
    try {
      await deleteDoc(doc(db, "registrations", userId, "announcements", id));
      console.log("🗑️ Deleted announcement:", id);
    } catch (error) {
      console.error("❌ Error deleting announcement:", error);
    }
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };
  const handleSaveEdit = async (id) => {
    if (!editingText.trim() || !userId) return;
    try {
      await updateDoc(doc(db, "registrations", userId, "announcements", id), {
        text: editingText.trim(),
      });
      console.log("✏️ Updated announcement:", id);
      setEditingId(null);
      setEditingText("");
    } catch (error) {
      console.error("❌ Error updating announcement:", error);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (!userId) return <p>Loading user data...</p>;
  if (loading) return <p>Loading announcements...</p>;

  return (
    <div className="panel-prof-announcements">
      <h2>Professor Announcements</h2>

      {/* Input field */}
      <div className="add-announcement">
        <input
          type="text"
          placeholder="Enter new announcement..."
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
        />
        <button onClick={handleAddAnnouncement}>Add</button>
      </div>

      {/* List of announcements */}
      <ul className="announcement-list">
        {announcements.length === 0 ? (
          <li>No announcements yet.</li>
        ) : (
          announcements.map((a) => (
            <li key={a.id}>
              {editingId === a.id ? (
                <>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button onClick={() => handleSaveEdit(a.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <div className="announcement-text">
                    <span>{a.text}</span>
                    <small className="timestamp">
                      {formatDate(a.createdAt)}
                    </small>
                  </div>
                  <div className="announcement-actions">
                    <button onClick={() => handleEdit(a.id, a.text)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(a.id)}>Delete</button>
                  </div>
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
