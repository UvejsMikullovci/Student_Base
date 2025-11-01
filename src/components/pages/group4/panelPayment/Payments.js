import React, { useState, useEffect } from "react";
import { db, auth } from "../../../../Firebase/firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";

// =================== GLOBAL STYLES ===================
function GlobalStyles() {
  return (
    <style>{`
      :root {
        --font-family: 'Poppins', sans-serif;
        --bg-main: #F9FAFB;
        --bg-white: #FFFFFF;
        --text-dark: #111827;
        --text-secondary: #6B7280;
        --text-blue: #4F46E5;
        --border-color: #E5E7EB;
        --shadow-md: 0 4px 6px rgba(0,0,0,0.05);
        --radius-xl: 1rem;
      }

      * {
        margin: 0; padding: 0; box-sizing: border-box;
        font-family: var(--font-family);
      }

      body { background-color: #fffaf7; }

      .app-container {
        display: flex;
        gap: 2rem;
        padding: 2rem;
        justify-content: center;
        align-items: flex-start;
      }

      .main-column { flex: 2; }
      .sidebar-column { flex: 1; display: flex; flex-direction: column; gap: 1.5rem; }

      .notif-heading-main {
        font-size: 2rem;
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 0.3rem;
      }

      .notif-paragraph-main {
        color: var(--text-secondary);
        margin-bottom: 2rem;
      }

      .credit-card-container {
        position: relative;
        width: 100%;
        min-height: 230px;
        border-radius: var(--radius-xl);
        padding: 2rem;
        color: #fff;
        box-shadow: var(--shadow-md);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
      }

      .credit-card-container.mastercard {
        background: linear-gradient(105deg, #F97316, #EA580C);
      }
      .credit-card-container.visa {
        background: linear-gradient(105deg, #1A1F71, #0055A4);
      }
      .credit-card-container.amex {
        background: linear-gradient(105deg, #00A6E6, #00C2C2);
      }

      .credit-card-container::after {
        content: '';
        position: absolute;
        bottom: -80px;
        right: -60px;
        width: 300px;
        height: 200px;
        background-color: rgba(0,0,0,0.35);
        border-radius: 45%;
        transform: rotate(-30deg);
        opacity: 0.9;
      }

      .credit-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 2;
      }

      .credit-card-body {
        font-size: 1.6rem;
        font-weight: 500;
        letter-spacing: 0.15em;
        z-index: 2;
      }

      .credit-card-footer {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        z-index: 2;
      }

      .card-detail-label {
        font-size: 0.8rem;
        text-transform: uppercase;
        opacity: 0.8;
      }

      .card-detail-value {
        font-size: 1rem;
        font-weight: 600;
      }

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 2rem;
      }

      .btn {
        border: none;
        border-radius: 8px;
        padding: 0.6rem 1rem;
        font-weight: 500;
        cursor: pointer;
      }
      .btn-primary {
        background-color: var(--text-blue);
        color: white;
      }
      .btn-primary:hover { opacity: 0.9; }

      .feature-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        border: 1px solid var(--border-color);
        border-radius: var(--radius-xl);
        padding: 1rem 1.5rem;
      }

      .feature-title { font-weight: 600; font-size: 1rem; }
      .feature-subtitle { color: var(--text-secondary); font-size: 0.9rem; }
      .feature-amount { font-weight: 600; }

      .invoices {
        background: #fff;
        border: 1px solid var(--border-color);
        border-radius: var(--radius-xl);
        padding: 1.5rem;
      }

      .invoice-item {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        padding: 0.75rem 0;
        font-size: 0.9rem;
      }

      .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 50;
      }

      .modal-content {
        background: white;
        border-radius: var(--radius-xl);
        padding: 2rem;
        width: 100%;
        max-width: 480px;
        box-shadow: var(--shadow-md);
      }

      .text-input-group { margin-bottom: 1rem; }
      .text-input-label { font-weight: 500; margin-bottom: 0.25rem; display: block; }
      .text-input {
        width: 100%;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
      }

      .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1.5rem;
      }
    `}</style>
  );
}
// =================== SMALL COMPONENTS ===================
const CardDetail = ({ label, value }) => (
  <div>
    <span className="card-detail-label">{label}</span><br />
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

// =================== ADD CARD MODAL ===================
function CardFormModal({ show, onClose, onAddCard }) {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");

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
    if (!cardName || cleanNum.length < 13 || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
      alert("Please fill all fields correctly.");
      return;
    }

    const newCard = {
      holder: cardName.toUpperCase(),
      number: cardNumber,
      expires: cardExpiry,
      type: detectCardType(cardNumber),
      isFavorite: true,
    };

    await onAddCard(newCard);
    setCardName("");
    setCardNumber("");
    setCardExpiry("");
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Card</h2>

        {/* Preview */}
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

        {/* Inputs */}
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
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Add Card</button>
        </div>
      </div>
    </div>
  );
}

// =================== MAIN DASHBOARD ===================
export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [mainCard, setMainCard] = useState(null);
  const [savedCards, setSavedCards] = useState([]);

  // --- get current user ---
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsubscribeAuth();
  }, []);

  // --- load cards on login ---
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

  // --- add new card ---
  const handleAddNewCard = async (card) => {
    if (!userId) return;
    try {
      const userRef = doc(db, "registrations", userId);
      const snap = await getDoc(userRef);
      const data = snap.data();
      const existing = data.creditcards || [];

      // Unfavorite others
      const updated = existing.map((c) => ({ ...c, isFavorite: false }));

      // Add new card
      const newCards = [...updated, card];
      await updateDoc(userRef, { creditcards: newCards });
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  // --- display fallback ---
  const currentCard = mainCard || {
    holder: "No Card",
    number: "**** **** **** ****",
    expires: "--/--",
    type: "Mastercard",
  };

  return (
    <>
      <GlobalStyles />
      <h1 className="notif-heading-main">Pagesat</h1>
      <p className="notif-paragraph-main">Menaxho të gjitha pagesat dhe faturat</p>

      <CardFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAddCard={handleAddNewCard}
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

          {/* Small cards list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
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
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                }}
              >
                <div>
                  <strong>{card.type}</strong>
                  <div style={{ color: "#555", fontSize: "0.9rem" }}>{card.number}</div>
                </div>
                <div style={{ color: "#333", fontWeight: "600" }}>{card.holder}</div>
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