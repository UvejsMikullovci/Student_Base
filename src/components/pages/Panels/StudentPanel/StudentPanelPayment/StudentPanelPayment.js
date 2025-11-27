import React, { useState, useEffect } from "react";
import { db, auth } from "../../../../../Firebase/firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { Edit, Trash2 } from "lucide-react"; // Lucide icons
import "./StudentPanelPayment.css";

const CardDetail = ({ label, value }) => (
  <div>
    <span className="card-detail-label">{label}</span>
    <br />
    <span className="card-detail-value">{value}</span>
  </div>
);

const CreditCard = ({ data }) => {
  const typeClass = (data.type || "mastercard").toLowerCase();
  return (
    <div className={`credit-card-container ${typeClass}`}>
      <div className="credit-card-header">
        <span>💳</span>
        <span>{data.type?.toUpperCase()}</span>
      </div>
      <div className="credit-card-body">{data.number}</div>
      <div className="credit-card-footer">
        <CardDetail label="Card Holder" value={data.holder} />
        <CardDetail label="Expires" value={data.expires} />
      </div>
    </div>
  );
};

// =================== ADD / EDIT CARD MODAL ===================
function CardFormModal({ show, onClose, onSave, editData }) {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");

  useEffect(() => {
    if (editData) {
      setCardName(editData.holder);
      setCardNumber(editData.number);
      setCardExpiry(editData.expires);
    } else {
      setCardName("");
      setCardNumber("");
      setCardExpiry("");
    }
  }, [editData]);

  const detectCardType = (num) => {
    const n = num.replace(/\D/g, "");
    if (n.startsWith("4")) return "Visa";
    if (n.startsWith("5")) return "Mastercard";
    if (n.startsWith("3")) return "Amex";
    return "Mastercard";
  };

  const handleNumber = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    val = val.replace(/(.{4})/g, "$1-");
    if (val.endsWith("-")) val = val.slice(0, -1);
    setCardNumber(val);
  };

  const handleExpiry = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 2) val = val.slice(0, 2) + "/" + val.slice(2, 4);
    setCardExpiry(val);
  };

  const handleSubmit = async () => {
    const cleanNum = cardNumber.replace(/-/g, "");
    if (!cardName || cleanNum.length < 13 || !/^\d{2}\/\d{2}$/.test(cardExpiry)) return;

    const cardObj = {
      holder: cardName.toUpperCase(),
      number: cardNumber,
      expires: cardExpiry,
      type: detectCardType(cardNumber),
      isFavorite: editData?.isFavorite || false,
    };

    await onSave(cardObj, editData);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{editData ? "Edit Card" : "Add New Card"}</h2>

        <div style={{ margin: "1.5rem 0" }}>
          <CreditCard
            data={{
              holder: cardName || "CARD HOLDER",
              number: cardNumber || "****-****-****-****",
              expires: cardExpiry || "MM/YY",
              type: detectCardType(cardNumber),
            }}
          />
        </div>

        <div className="text-input-group">
          <label className="text-input-label">Cardholder Name</label>
          <input
            className="text-input"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="John Doe"
          />
        </div>

        <div className="text-input-group">
          <label className="text-input-label">Card Number</label>
          <input
            className="text-input"
            value={cardNumber}
            onChange={handleNumber}
            maxLength={19}
            placeholder="1234-5678-9012-3456"
          />
        </div>

        <div className="text-input-group">
          <label className="text-input-label">Expiry Date</label>
          <input
            className="text-input"
            value={cardExpiry}
            onChange={handleExpiry}
            maxLength={5}
            placeholder="MM/YY"
          />
        </div>

        <div className="modal-footer">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {editData ? "Save Changes" : "Add Card"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [mainCard, setMainCard] = useState(null);
  const [savedCards, setSavedCards] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const userRef = doc(db, "registrations", userId);
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const cards = data.creditcards || [];
        setSavedCards(cards);
        const fav = cards.find((c) => c.isFavorite) || cards[0];
        if (fav) setMainCard(fav);
      }
    });
    return () => unsubscribe();
  }, [userId]);

  const handleSaveCard = async (card, editCard) => {
    if (!userId) return;
    try {
      const userRef = doc(db, "registrations", userId);
      const snap = await getDoc(userRef);
      const data = snap.data();
      let updated = data.creditcards || [];

      if (editCard) {
        updated = updated.map((c) =>
          c.number === editCard.number ? { ...card } : c
        );
      } else {
        updated = [...updated.map((c) => ({ ...c, isFavorite: false })), card];
      }

      await updateDoc(userRef, { creditcards: updated });
      setEditData(null);
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  const handleDeleteCard = async (card) => {
    try {
      const userRef = doc(db, "registrations", userId);
      const snap = await getDoc(userRef);
      const data = snap.data();
      const filtered = (data.creditcards || []).filter(
        (c) => c.number !== card.number
      );
      await updateDoc(userRef, { creditcards: filtered });
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const currentCard = mainCard || {
    holder: "No Card",
    number: "**** **** **** ****",
    expires: "--/--",
    type: "Mastercard",
  };

  return (
    <>
      <h1 className="notif-heading-main">Pagesat</h1>
      <p className="notif-paragraph-main">Menaxho të gjitha pagesat dhe faturat</p>

      <CardFormModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditData(null);
        }}
        onSave={handleSaveCard}
        editData={editData}
      />

      <div className="app-container">
        <main className="main-column">
          <CreditCard data={currentCard} />

          <div className="section-header">
            <h2>Payment Methods</h2>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              + Add New Card
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            {savedCards.map((card, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #eee",
                  borderRadius: "12px",
                  padding: "1rem 1.2rem",
                  backgroundColor: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <div>
                  <strong>{card.type}</strong>
                  <div style={{ color: "#555", fontSize: "0.9rem" }}>
                    {card.number}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <div style={{ color: "#333", fontWeight: "600" }}>
                    {card.holder}
                  </div>

                  {/* Lucide Edit Icon */}
                  <Edit
                    size={18}
                    strokeWidth={2}
                    color="#007bff"
                    className="lucide"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setEditData(card);
                      setShowModal(true);
                    }}
                  />

                  {/* Lucide Trash Icon */}
                  <Trash2
                    size={18}
                    strokeWidth={2}
                    color="#dc3545"
                    className="lucide"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteCard(card)}
                  />
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="sidebar-column">
          <div className="feature-box">
            <div>
              <div className="feature-title">Salary</div>
              <div className="feature-subtitle">Belong Interactive</div>
            </div>
            <div className="feature-amount">+$2000</div>
          </div>

          <div className="feature-box">
            <div>
              <div className="feature-title">Paypal</div>
              <div className="feature-subtitle">Freelance Payment</div>
            </div>
            <div className="feature-amount">$455.00</div>
          </div>

          <div className="invoices">
            <div className="section-header">
              <h3>Invoices</h3>
              <button className="btn btn-primary" style={{ padding: "0.4rem 0.8rem" }}>
                View All
              </button>
            </div>
            {[
              { id: "MS-415646", date: "March, 01, 2020", amount: 180 },
              { id: "RV-126749", date: "February, 10, 2021", amount: 250 },
              { id: "DW-103578", date: "April, 05, 2020", amount: 120 },
            ].map((inv, i) => (
              <div key={i} className="invoice-item">
                <div>
                  <div>{inv.date}</div>
                  <div style={{ color: "#6B7280" }}>#{inv.id}</div>
                </div>
                <div>${inv.amount}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}