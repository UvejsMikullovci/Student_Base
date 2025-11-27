import React, { useState, useEffect } from "react";
import { db, auth } from "../../../../../Firebase/firebase";
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
import "./ProfessorPanelAnnouncements.css";

const ProfessorPanelAnnouncments = () => {
  const [announcements, setAnnouncements] = useState([]);

  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [announcementDate, setAnnouncementDate] = useState("");
  const [announcementTime, setAnnouncementTime] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingDate, setEditingDate] = useState("");
  const [editingTime, setEditingTime] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserId(user ? user.uid : null);
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

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAnnouncements(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const handleAddAnnouncement = async () => {
    if (
      !newAnnouncement.trim() ||
      !announcementDate ||
      !announcementTime ||
      !description.trim()
    )
      return;

    await addDoc(
      collection(db, "registrations", userId, "announcements"),
      {
        text: newAnnouncement.trim(),
        date: announcementDate,
        time: announcementTime,
        description: description.trim(),
        createdAt: serverTimestamp(),
      }
    );

    setNewAnnouncement("");
    setAnnouncementDate("");
    setAnnouncementTime("");
    setDescription("");
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "registrations", userId, "announcements", id));
  };

  const handleEdit = (id, text, date, time, description) => {
    setEditingId(id);
    setEditingText(text);
    setEditingDate(date);
    setEditingTime(time);
    setEditingDescription(description);
  };

  const handleSaveEdit = async (id) => {
    if (
      !editingText.trim() ||
      !editingDate ||
      !editingTime ||
      !editingDescription.trim()
    )
      return;

    await updateDoc(
      doc(db, "registrations", userId, "announcements", id),
      {
        text: editingText.trim(),
        date: editingDate,
        time: editingTime,
        description: editingDescription.trim(),
      }
    );

    setEditingId(null);
    setEditingText("");
    setEditingDate("");
    setEditingTime("");
    setEditingDescription("");
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (!userId) return <p>Loading user...</p>;
  if (loading) return <p>Loading announcements...</p>;

  return (
    <div className="panel-prof-announcements">
      <h2>Professor Announcements</h2>

      <div className="add-announcement">
        <input
          type="text"
          placeholder="Title"
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
        />
        <input
          type="date"
          value={announcementDate}
          onChange={(e) => setAnnouncementDate(e.target.value)}
        />
        <input
          type="time"
          value={announcementTime}
          onChange={(e) => setAnnouncementTime(e.target.value)}
        />
        <textarea
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddAnnouncement}>Add</button>
      </div>

      <ul className="announcement-list">
        {announcements.length === 0 ? (
          <li>No announcements yet.</li>
        ) : (
          announcements.map((a) => (
            <li key={a.id} className={editingId === a.id ? "editing" : ""}>
              {editingId === a.id ? (
                <>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <input
                    type="date"
                    value={editingDate}
                    onChange={(e) => setEditingDate(e.target.value)}
                  />
                  <input
                    type="time"
                    value={editingTime}
                    onChange={(e) => setEditingTime(e.target.value)}
                  />
                  <textarea
                    value={editingDescription}
                    onChange={(e) => setEditingDescription(e.target.value)}
                  />
                  <div className="edit-mode-buttons">
                    <button
                      className="save-btn"
                      onClick={() => handleSaveEdit(a.id)}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="announcement-text">
                    <h3>{a.text}</h3>
                    <p>{a.description}</p>

                    {(a.date || a.time) && (
                      <small className="announcement-date">
                        {a.date &&
                          new Date(a.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        {a.time && ` at ${a.time}`}
                      </small>
                    )}

                    <small className="timestamp">
                      Posted: {formatDate(a.createdAt)}
                    </small>
                  </div>

                  <div className="announcement-actions">
                    <button
                      onClick={() =>
                        handleEdit(
                          a.id,
                          a.text,
                          a.date,
                          a.time,
                          a.description
                        )
                      }
                    >
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

export default ProfessorPanelAnnouncments;