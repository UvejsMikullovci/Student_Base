import React, { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../../../Firebase/firebase";
import { Mail, Archive, X } from "lucide-react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./PanelNotifications.css";

// Localizer setup
const locales = { "en-US": require("date-fns/locale/en-US") };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

// Modal Component
const Modal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex justify-center items-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 scale-100 dark:text-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition duration-150"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const NotificationsPage = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch notifications
  useEffect(() => {
    if (!userId) return;

    const fetchAnnouncements = async () => {
      try {
        const announcementsCollection = collection(db, "registrations", userId, "announcements");
        const snapshot = await getDocs(announcementsCollection);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setNotifications(data);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    fetchAnnouncements();
  }, [userId]);

  // Filtered notifications
  const filtered = notifications.filter((n) => {
    const title = n.title || "";
    const sender = n.sender || "";
    const match =
      title.toLowerCase().includes(search.toLowerCase()) ||
      sender.toLowerCase().includes(search.toLowerCase());
    if (filter === "unread") return n.unread && match;
    return match;
  });

  // Transform notifications to calendar events using createdAt
  const events = notifications
    .map((n) => {
      if (!n.createdAt) return null;
      const start = n.createdAt.toDate(); // Firestore Timestamp to JS Date
      const end = new Date(start.getTime() + 60 * 60 * 1000); // default 1-hour
      return {
        id: n.id,
        title: n.title || "Njoftim pa titull",
        start,
        end,
        allDay: false,
        sender: n.sender || "Dërgues i panjohur",
        message: n.message || "",
      };
    })
    .filter(Boolean);

  // Event click handler
  const handleSelectEvent = useCallback((event) => {
    setSelected(event);
    setIsModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="notif-heading-main">Njoftimet</h1>
        <p className="notif-paragraph-main">Menaxho të gjitha njoftimet dhe mesazhet tuaja</p>

        <div className="notif-wrapper">
          {/* Left Panel */}
          <div className="notif-left">
            <h2>Njoftimet & Mesazhet</h2>
            <p>Menaxho të gjitha komunikimet tuaja</p>
            <input
              type="text"
              placeholder="Kërko mesazhe..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="notif-filters">
              <button
                className={filter === "all" ? "active" : ""}
                onClick={() => setFilter("all")}
              >
                Te gjitha <span>{notifications.length}</span>
              </button>
              <button
                className={filter === "unread" ? "active" : ""}
                onClick={() => setFilter("unread")}
              >
                Pa lexuar <span>{notifications.filter((n) => n.unread).length}</span>
              </button>
            </div>

            <ul className="notif-list">
              {filtered.length === 0 ? (
                <li className="text-gray-500 p-4">Nuk ka njoftime.</li>
              ) : (
                filtered.map((n) => (
                  <li
                    key={n.id}
                    className={`notif-item ${selected?.id === n.id ? "selected" : ""} ${
                      n.unread ? "unread" : ""
                    }`}
                    onClick={() => setSelected(n)}
                  >
                    <div className="notif-title">
                      <Mail size={16} className="mr-2 text-gray-500" />
                      {n.sender || "Dërgues i panjohur"}
                    </div>
                    <div className="notif-text">{n.title || "Pa titull"}</div>
                    <div className="notif-time">
                      {n.createdAt ? n.createdAt.toDate().toLocaleString() : "Pa datë"}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Right Panel */}
          <div className="notif-right">
            {!selected ? (
              <div className="empty-state">
                <Mail size={32} />
                <p>Zgjidh një mesazh për ta lexuar</p>
              </div>
            ) : (
              <div className="notif-message-card">
                <div className="notif-header">
                  <div>
                    <h3>{selected.title || "Pa titull"}</h3>
                    <p>
                      <Mail size={16} className="mr-2 text-gray-400" />
                      {selected.sender || "Dërgues i panjohur"} •{" "}
                      {selected.createdAt
                        ? selected.createdAt.toDate().toLocaleString()
                        : "Pa datë"}
                    </p>
                  </div>
                </div>

                <div className="notif-actions">
                  <button>
                    <Archive size={16} className="mr-1" />
                    Arkivo
                  </button>
                  <button
                    onClick={() =>
                      setNotifications((prev) => prev.filter((n) => n.id !== selected.id))
                    }
                  >
                    <X size={16} className="mr-1" />
                    Fshi
                  </button>
                </div>

                <hr />

                <div className="notif-body">
                  {(selected.message || "Nuk ka përmbajtje").split("\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Calendar Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Kalendari i Njoftimeve
          </h2>

          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            selectable
            onSelectEvent={handleSelectEvent}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: "#6366f1", // indigo
                color: "white",
                borderRadius: "6px",
                padding: "2px 4px",
                fontSize: "0.75rem",
              },
            })}
            views={["month", "week", "day"]}
          />
        </div>

        {/* Event Modal */}
        <Modal
          title={selected?.title || "Ngjarja"}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {selected && (
            <div>
              <p>
                <strong>Koha:</strong> {selected.start.toLocaleString()}
              </p>
              <p>
                <strong>Dërguesi:</strong> {selected.sender}
              </p>
              <hr className="my-2" />
              <p>{selected.message || "Nuk ka përmbajtje"}</p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default NotificationsPage;
