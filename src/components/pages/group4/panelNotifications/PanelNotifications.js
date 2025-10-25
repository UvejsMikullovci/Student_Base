import { useState } from "react";
import "./PanelNotifications.css";
import { faEnvelope as faEnvelopeRegular } from "@fortawesome/fontawesome-free";

const dummyData = [
    {
        id: 1,
        title: "Aplikimi juaj është pranuar! ",
        sender: "Universiteti i Tiranës",
        time: "Sot, 10:30",
        important: true,
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
    const [filter, setFilter] = useState("all");
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState("");

    const filtered = dummyData.filter(n => {
        const match =
            n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.sender.toLowerCase().includes(search.toLowerCase());
        if (filter === "unread") return n.unread && match;
        if (filter === "important") return n.important && match;
        return match;
    });

    return (
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
                        Te gjitha <span>{dummyData.length}</span>
                    </button>
                    <button className={filter === "unread" ? "active" : ""} onClick={() => setFilter("unread")}>
                        Pa lexuar <span>{dummyData.filter(n => n.unread).length}</span>
                    </button>
                </div>

                <ul className="notif-list">
                    {filtered.map(n => (
                        <li
                            key={n.id}
                            className={`notif-item ${selected?.id === n.id ? "selected" : ""} ${n.unread ? "unread" : ""}`}
                            onClick={() => setSelected(n)}
                        >
                            <div className="notif-title">{n.sender}</div>
                            <div className="notif-text">{n.title}</div>
                            <div className="notif-time">{n.time}</div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="notif-right">
                {!selected ? (
                    <div className="empty-state">
                        <i class="fa-solid fa-envelope"></i>
                        <p>Zgjidh një mesazh për ta lexuar</p>
                    </div>
                ) : (
                    <div className="notif-message-card">
                        <div className="notif-header">
                            <div>
                                <h3>{selected.title}</h3>
                                <p>{selected.sender} • {selected.time}</p>
                            </div>
                            {selected.important && (
                                <span className="important-badge">🔔 I rëndësishëm</span>
                            )}
                        </div>

                        <div className="notif-actions">
                            <button><i class="fa-solid fa-box-archive"></i> Arkivo</button>
                            <button><i class="fa-solid fa-trash-can"></i> Fshi</button>
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
    );
}