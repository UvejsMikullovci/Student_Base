import React, { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../../../../Firebase/firebase";
import { Mail, Archive, X } from "lucide-react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./StudentPanelNotifications.css";

const locales = { "en-US": require("date-fns/locale/en-US") };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Modal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex justify-center items-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            {title}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const StudentPanelNotifications = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const usersSnapshot = await getDocs(collection(db, "registrations"));
      const allAnnouncements = [];

      for (const userDoc of usersSnapshot.docs) {
        const announcementsSnapshot = await getDocs(
          collection(db, "registrations", userDoc.id, "announcements")
        );

        for (const ann of announcementsSnapshot.docs) {
          const data = ann.data();

          const date = data.date || null;
          const time = data.time || "00:00";
          const description = data.description || "";
          const sender = userDoc.data().name || "Profesor";

          let eventDate = new Date();
          if (date) {
            const [year, month, day] = date.split("-");
            const [hour, minute] = time.split(":");
            eventDate = new Date(year, month - 1, day, hour, minute);
          }

          allAnnouncements.push({
            id: ann.id,
            title: data.text || "Pa titull",
            message: description,
            sender,
            start: eventDate,
            end: new Date(eventDate.getTime() + 60 * 60 * 1000),
            unread: !!data.unread,
          });
        }
      }

      setNotifications(allAnnouncements);
    };

    fetchAnnouncements();
  }, []);

  const filtered = notifications.filter((n) => {
    const title = n.title.toLowerCase();
    const sender = n.sender.toLowerCase();
    const match =
      title.includes(search.toLowerCase()) ||
      sender.includes(search.toLowerCase());
    if (filter === "unread") return n.unread && match;
    return match;
  });

  const handleClickListItem = (notif) => {
    setSelected(notif);
    setIsModalOpen(true);
  };

  const handleSelectEvent = useCallback((event) => {
    setSelected(event);
    setIsModalOpen(true);
  }, []);

  const handleDeleteSelected = () => {
    if (!selected) return;
    setNotifications((prev) => prev.filter((n) => n.id !== selected.id));
    setSelected(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="notif-heading-main">Njoftimet</h1>
        <p className="notif-paragraph-main">
          Menaxho të gjitha njoftimet dhe mesazhet
        </p>

        <div className="notif-wrapper">
          <div className="notif-left">
            <h2>Njoftimet & Mesazhet</h2>
            <p>Menaxho komunikimet</p>

            <input
              type="text"
              placeholder="Kërko..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="notif-filters">
              <button
                className={filter === "all" ? "active" : ""}
                onClick={() => setFilter("all")}
              >
                Të gjitha <span>{notifications.length}</span>
              </button>

              <button
                className={filter === "unread" ? "active" : ""}
                onClick={() => setFilter("unread")}
              >
                Pa lexuar{" "}
                <span>{notifications.filter((n) => n.unread).length}</span>
              </button>
            </div>

            <ul className="notif-list">
              {filtered.length === 0 ? (
                <li className="text-gray-500 p-4">Nuk ka njoftime.</li>
              ) : (
                filtered.map((n) => (
                  <li
                    key={n.id}
                    className={`notif-item ${
                      selected?.id === n.id ? "selected" : ""
                    } ${n.unread ? "unread" : ""}`}
                    onClick={() => handleClickListItem(n)}
                  >
                    <div className="notif-title">{n.sender}</div>
                    <div className="notif-text">{n.title}</div>
                    <div className="notif-time">
                      {new Date(n.start).toLocaleString()}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="notif-right">
            {!selected ? (
              <div className="empty-state">
                <Mail size={32} />
                <p>Zgjidh një njoftim</p>
              </div>
            ) : (
              <div className="notif-message-card">
                <div className="notif-header">
                  <div>
                    <h3>{selected.title}</h3>
                    <p>
                      {selected.sender} •{" "}
                      {new Date(selected.start).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="notif-actions">
                  <button>
                    <Archive size={16} />
                    Arkivo
                  </button>

                  <button onClick={handleDeleteSelected}>
                    <X size={16} />
                    Fshi
                  </button>
                </div>

                <hr />

                <div className="notif-body">
                  {selected.message ? (
                    selected.message.split("\n").map((p, i) => (
                      <p key={i}>{p}</p>
                    ))
                  ) : (
                    <p>Nuk ka përmbajtje</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Kalendari i Njoftimeve</h2>

          <Calendar
            localizer={localizer}
            events={notifications}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            selectable
            onSelectEvent={handleSelectEvent}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: event.unread ? "#df4d4a" : "#6366f1",
                color: "white",
                borderRadius: "6px",
                padding: "2px 4px",
                fontSize: "0.75rem",
              },
            })}
          />
        </div>

        <Modal
          title={selected?.title || "Ngjarja"}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {selected && (
            <div>
              <p>
                <strong>Data:</strong>{" "}
                {new Date(selected.start).toLocaleString()}
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

export default StudentPanelNotifications;