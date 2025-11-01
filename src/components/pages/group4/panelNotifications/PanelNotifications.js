import { useState } from "react";
import "./PanelNotifications.css";

const dummyData = [
    {
        id: 1,
        title: "Aplikimi juaj është pranuar! ",
        sender: "Universiteti i Tiranës",
        time: "Sot, 10:30",
        unread: true,
        message: `Urime! Jemi të lumtur të ju njoftojmë që aplikimi juaj për programin Inxhinieri Informatike është pranuar...

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.


Me respekt,
Universiteti i Tiranës`
    },
    {
        id: 2,
        title: "Dokumenta të reja të nevojshme",
        sender: "Kolegj Shqiptar",
        time: "Sot, 09:15",
        message: `Përshëndetje! Ju lutem ngarkoni dokumentet e reja të kërkuara për aplikimin tuaj brenda afatit të përcaktuar.`
    },
    {
        id: 3,
        title: "Statusin e aplikimit - Në pritje",
        sender: "Universiteti Politeknik",
        time: "Dje, 16:45",
        message: `Aplikimi juaj është në fazën e verifikimit. Ju do të njoftoheni sapo statusi të përditësohet.`
    }
];

export default function NotificationsPanel() {
    const [notifications, setNotifications] = useState(dummyData);
    const [filter, setFilter] = useState("all");
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState("");

    const handleDelete = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
        setSelected(null);
    };

    const filtered = notifications.filter(n => {
        const match =
            n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.sender.toLowerCase().includes(search.toLowerCase());
        if (filter === "unread") return n.unread && match;
        return match;
    });

    return (
        <>
        <h1 className="notif-heading-main">Njoftimet</h1>
        <p className="notif-paragraph-main">Menaxho të gjitha njoftimet dhe mesazhet tuaja</p>
        <div className="notif-wrapper">
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
                    <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
                        Te gjitha <span>{notifications.length}</span>
                    </button>
                    <button className={filter === "unread" ? "active" : ""} onClick={() => setFilter("unread")}>
                        Pa lexuar <span>{notifications.filter(n => n.unread).length}</span>
                    </button>
                </div>

                <ul className="notif-list">
                    {filtered.map(n => (
                        <li
                            key={n.id}
                            className={`notif-item ${selected?.id === n.id ? "selected" : ""} ${n.unread ? "unread" : ""}`}
                            onClick={() => setSelected(n)}
                        >
                            <div className="notif-title">
                                <i
                                    className="fa-solid fa-envelope"
                                    style={{ color: "#9b9b9b", marginRight: "8px" }}
                                ></i>
                                {n.sender}
                            </div>
                            <div className="notif-text">{n.title}</div>
                            <div className="notif-time">{n.time}</div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="notif-right">
                {!selected ? (
                    <div className="empty-state">
                        <i className="fa-solid fa-envelope"></i>
                        <p>Zgjidh një mesazh për ta lexuar</p>
                    </div>
                ) : (
                    <div className="notif-message-card">
                        <div className="notif-header">
                            <div>
                                <h3>{selected.title}</h3>
                                <p>
                                    <i
                                        className="fa-solid fa-envelope"
                                        style={{ color: "#888", marginRight: "8px" }}
                                    ></i>
                                    {selected.sender} • {selected.time}
                                </p>
                            </div>
                        </div>

                        <div className="notif-actions">
                            <button><i className="fa-solid fa-box-archive"></i> Arkivo</button>
                            <button onClick={() => handleDelete(selected.id)}>
                                <i className="fa-solid fa-trash-can"></i> Fshi
                            </button>
                        </div>

                        <hr />

                        <div className="notif-body">
                            {selected.message.split("\n").map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>

                        <div className="notif-footer">
                            <button className="reply">Përgjigju</button>
                            <button className="forward">Përcjille</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}