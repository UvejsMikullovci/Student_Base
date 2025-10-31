import React, { use, useState ,useEffect } from "react";
import {db} from "../../../../Firebase/firebase";
import { collection, onSnapshot, addDoc, doc, updateDoc } from "firebase/firestore";

function GlobalStyles() {
  return (
    <style>{`
      :root {
        --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        --bg-main: #F9FAFB;
        --bg-white: #FFFFFF;
        --text-dark: #111827;
        --text-secondary: #6B7280;
        --text-light: #F9FAFB;
        --text-blue: #4F46E5;
        --text-red-dark: #DC2626;
        --text-red-light: #EF4444;
        --bg-red-light: #FEE2E2;
        --bg-red-hover: #FECACA;
        --border-color: #E5E7EB;
        --border-color-active: #4F46E5;
        --card-dark-bg: #1F2937;
        --card-gradient-start: #F97316;
        --card-gradient-end: #EA580C;
        --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        --radius-sm: 0.25rem;
        --radius-md: 0.5rem;
        --radius-lg: 0.75rem;
        --radius-xl: 1rem;
        --radius-full: 9999px;
      }

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      .app-container {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 2rem;
        gap: 1.5rem;
        max-width: 1440px;
        margin: 0 auto;
                font-family: var(--font-family);
        color: var(--text-dark);
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .main-column, .sidebar-column {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .main-column {
        flex-basis: 66.66%;
        max-width: 66.66%;
      }

      .sidebar-column {
        flex-basis: 33.33%;
        max-width: 33.33%;
      }

      .card-base {
        background-color: var(--bg-white);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-sm);
        padding: 1.5rem;
        border: 1px solid var(--border-color);
      }
      
      .flex-col { display: flex; flex-direction: column; }
      .gap-4 { gap: 1rem; }
      
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      .section-title {
        font-size: 1.25rem;
        font-weight: 600;
      }
      .btn {
        font-family: var(--font-family);
        font-weight: 600;
        border: none;
        border-radius: var(--radius-md);
        padding: 0.625rem 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.875rem;
        line-height: 1.25rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      }

      .btn-primary {
        background-color: var(--text-blue);
        color: var(--bg-white);
        box-shadow: var(--shadow-sm);
      }
      .btn-primary:hover {
        opacity: 0.9;
      }

      .btn-secondary {
        background-color: var(--bg-white);
        color: var(--text-dark);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-sm);
      }
      .btn-secondary:hover {
        background-color: var(--bg-main);
      }
      
      .btn-cancel {
        background-color: var(--bg-red-light);
        color: var(--text-red-dark);
      }
      .btn-cancel:hover {
        background-color: var(--bg-red-hover);
      }

      .btn-action {
        background-color: transparent;
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        border-radius: var(--radius-md);
        width: 2.25rem;
        height: 2.25rem;
        padding: 0;
      }
      .btn-action:hover {
        background-color: var(--bg-main);
        color: var(--text-dark);
      }
      .btn-action.active {
        color: var(--text-red-light);
        border-color: var(--bg-red-hover);
      }
      .btn-action svg {
        width: 1rem;
        height: 1rem;
        fill: none;
      }
      .btn-action.active svg {
        fill: currentColor;
      }

      .text-input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .text-input-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-dark);
      }
      .text-input {
        width: 100%;
        font-family: var(--font-family);
        font-size: 0.875rem;
        padding: 0.75rem 1rem;
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .text-input:focus {
        outline: none;
        border-color: var(--text-blue);
        box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
      }
      .card-logo {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        font-weight: 600;
        font-size: 1rem;
      }
      .card-logo-circles {
        width: 2.5rem;
        height: 2.5rem;
        position: relative;
      }
      .card-logo-circles .circle {
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-full);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .card-logo-circles .circle-1 {
        background-color: #F9A8D4;
        left: 0;
        opacity: 0.8;
      }
      .card-logo-circles .circle-2 {
        background-color: #FCD34D;
        right: 0;
        opacity: 0.8;
      }
      .card-logo-visa { color: #1A1F71; font-weight: bold; font-style: italic; font-size: 1.5rem; }
      .card-logo-amex { color: #006FCF; font-weight: bold; font-size: 1.25rem; }
      .card-logo-v-wlt { color: #F97316; font-weight: bold; font-size: 1.25rem; }
      .card-number-display {
        font-family: 'Menlo', 'Courier New', Courier, monospace;
        font-size: 1.5rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        color: var(--text-light);
      }
      .card-number-display-dark {
        font-size: 1rem;
        color: var(--text-dark);
        letter-spacing: 0.05em;
      }

      .card-detail {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
      }
      .card-detail-label {
        font-size: 0.75rem;
        text-transform: uppercase;
        color: var(--text-light);
        opacity: 0.7;
      }
      .card-detail-value {
        font-size: 1rem;
        font-weight: 500;
        color: var(--text-light);
      }
      
      .invoice-info {
        display: flex;
        flex-direction: column;
      }
      .invoice-info-date {
        font-weight: 500;
        font-size: 0.875rem;
      }
      .invoice-info-id {
        font-size: 0.75rem;
        color: var(--text-secondary);
      }
      
      .invoice-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .invoice-actions-amount {
        font-weight: 600;
        font-size: 0.875rem;
      }
      .invoice-actions-link {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--text-blue);
        text-decoration: none;
      }
      .invoice-actions-link svg {
        width: 0.875rem;
        height: 0.875rem;
      }
      
      .payment-method-details {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .credit-card-container {
        position: relative;
        padding: 1.75rem;
        border-radius: var(--radius-xl);
        background: linear-gradient(105deg, var(--card-gradient-start), var(--card-gradient-end));
        color: var(--text-light);
        box-shadow: var(--shadow-lg);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 240px;
      }
      
      .credit-card-container::after {
        content: '';
        position: absolute;
        bottom: -80px;
        right: -60px;
        width: 300px;
        height: 200px;
        background-color: var(--card-dark-bg);
        border-radius: 45%;
        transform: rotate(-30deg);
        opacity: 0.9;
        z-index: 1;
      }
      
      /* New styles for different card types */
      .credit-card-container.visa {
        background: linear-gradient(105deg, #1A1F71, #0055A4);
      }
      .credit-card-container.visa::after {
        background-color: #003366;
      }

      .credit-card-container.amex {
        background: linear-gradient(105deg, #006FCF, #00A1B1);
      }
      .credit-card-container.amex::after {
        background-color: #004F59;
      }

      .credit-card-container.vwlt {
        background: linear-gradient(105deg, #4B5563, #1F2937);
      }
      .credit-card-container.vwlt::after {
        background-color: #000;
      }

      .credit-card-header, .credit-card-footer, .credit-card-body {
        position: relative;
        z-index: 2;
      }

      .credit-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .credit-card-header svg {
        transform: rotate(90deg);
        opacity: 0.7;
      }
      
      .credit-card-body {
        margin: 2rem 0;
      }
      
      .credit-card-footer {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
      
      .feature-box {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .feature-box-icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3rem;
        height: 3rem;
        border-radius: var(--radius-lg);
        color: var(--text-red-light);
      }
      .feature-box-icon-wrapper.salary {
        background-color: var(--bg-red-light);
        color: var(--text-red-light);
      }
      .feature-box-icon-wrapper.paypal {
        background-color: #DBEAFE;
        color: #3B82F6;
      }
      .feature-box-icon-wrapper svg {
        width: 1.5rem;
        height: 1.5rem;
      }
      .feature-box-content {
        display: flex;
        flex-direction: column;
      }
      .feature-box-title {
        font-size: 1rem;
        font-weight: 600;
      }
      .feature-box-subtitle {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
      .feature-box-amount {
        margin-left: auto;
        font-size: 1rem;
        font-weight: 600;
      }

      .invoice-item-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
        border-bottom: 1px solid var(--border-color);
      }
      .invoice-item-container:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
      .invoice-item-container:first-child {
        padding-top: 0.5rem;
      }

      .payment-method-card-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 2px solid var(--border-color);
        border-radius: var(--radius-lg);
        padding: 1rem 1.5rem;
        transition: all 0.2s ease;
        cursor: pointer;
        background-color: var(--bg-white);
      }
      .payment-method-card-container.active {
        border-color: var(--border-color-active);
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
      }
      .payment-method-actions {
        display: flex;
        gap: 0.75rem;
      }
      .modal-overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 50;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }
      .modal-overlay.show {
        opacity: 1;
        visibility: visible;
      }
      
      .modal-content {
        background-color: var(--bg-white);
        border-radius: var(--radius-xl);
        padding: 2rem;
        width: 100%;
        max-width: 500px;
        box-shadow: var(--shadow-lg);
        transform: scale(0.95);
        transition: transform 0.3s ease;
      }
      .modal-overlay.show .modal-content {
        transform: scale(1);
      }
      
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }
      .modal-title {
        font-size: 1.25rem;
        font-weight: 600;
      }
      .modal-close-btn {
        background: none;
        border: none;
        font-size: 1.75rem;
        line-height: 1;
        font-weight: 300;
        cursor: pointer;
        color: var(--text-secondary);
      }
      .modal-close-btn:hover {
        color: var(--text-dark);
      }
      
      .modal-body {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .modal-form-row {
        display: flex;
        gap: 1rem;
      }
      .modal-form-row .text-input-group {
        flex: 1;
      }
      
      .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border-color);
      }
      
      @media (max-width: 1024px) {
        .app-container {
          flex-direction: column;
          padding: 1rem;
        }
        .main-column, .sidebar-column {
          flex-basis: 100%;
          max-width: 100%;
        }
      }
      
      @media (max-width: 640px) {
        .card-number-display {
          font-size: 1.25rem;
        }
        .credit-card-footer {
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }
        .modal-form-row {
          flex-direction: column;
        }
        .section-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }
        .invoice-item-container {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
        }
        .invoice-actions {
          width: 100%;
          justify-content: space-between;
        }
        .feature-box {
          flex-direction: column;
          align-items: flex-start;
        }
        .feature-box-amount {
          margin-left: 0;
          margin-top: 0.5rem;
          font-size: 1.25rem;
        }
      }
    `}</style>
  );
}

function BanknoteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}

function FileTextIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19.5 12.572l-7.5 7.428l-7.5-7.428a5 5 0 1 1 7.5-6.566a5 5 0 1 1 7.5 6.566z" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18.8 3H5.2A2.2 2.2 0 0 0 3 5.2v13.6A2.2 2.2 0 0 0 5.2 21h13.6a2.2 2.2 0 0 0 2.2-2.2V5.2A2.2 2.2 0 0 0 18.8 3z" />
      <path d="M7.5 10.5h4.8a2 2 0 0 1 1.9 2.6L13 17a2 2 0 0 1-1.9 1.4H6.8a2 2 0 0 1-2-1.7l-.8-4.1a2 2 0 0 1 2-2.3z" />
      <path d="M11.5 10.5V6.3a.8.8 0 0 1 .8-.8h2.4a2 2 0 0 1 2 2v.3" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" x2="12.01" y1="20" y2="20" />
    </svg>
  );
}

function ActionButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      className={`btn btn-action ${className}`}
    >
      {children}
    </button>
  );
}

function ModalCancelButton({ children, onClick }) {
  return (
    <button onClick={onClick} className="btn btn-cancel">
      {children}
    </button>
  );
}

function PrimaryButton({ children, onClick, className = "" }) {
  return (
    <button onClick={onClick} className={`btn btn-primary ${className}`}>
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }) {
  return (
    <button onClick={onClick} className="btn btn-secondary">
      {children}
    </button>
  );
}

function TextInput({ label, id, ...props }) {
  return (
    <div className="text-input-group">
      <label htmlFor={id} className="text-input-label">
        {label}
      </label>
      <input id={id} {...props} className="text-input" />
    </div>
  );
}

function CardDetail({ label, value }) {
  return (
    <div className="card-detail">
      <span className="card-detail-label">{label}</span>
      <span className="card-detail-value">{value}</span>
    </div>
  );
}

function CardLogo({ type = "mastercard" }) {
  const normalizedType = type.toLowerCase();
  if (normalizedType === "mastercard") {
    return (
      <div className="card-logo">
        <div className="card-logo-circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
        </div>
      </div>
    );
  }
  return (
    <div className={`card-logo card-logo-${normalizedType.replace("-", "")}`}>
      {type.toUpperCase()}
    </div>
  );
}

function CardNumberDisplay({ number, dark = false }) {
  return (
    <div className={`card-number-display ${dark ? "card-number-display-dark" : ""}`}>
      {number}
    </div>
  );
}

function PaymentMethodDetails({ type, number }) {
  return (
    <div className="payment-method-details">
      <CardLogo type={type} />
      <CardNumberDisplay number={number} dark={true} />
    </div>
  );
}

function CardFormModal({ show, onClose, onAddCard }) {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");

  const detectCardType = (number) => {
    const firstDigit = number.charAt(0);
    if (firstDigit === "4") return "VISA";
    if (firstDigit === "3") return "AMEX";
    if (firstDigit === "5") return "mastercard";
    return "mastercard";
  };

  const handleContentClick = (e) => e.stopPropagation();

  const handleSubmit = async () => {
    if (!cardName || cardNumber.length < 13 || !cardExpiry) {
      alert("Please fill all fields correctly.");
      return;
    }

    try {
      await onAddCard({
        holder: cardName.toUpperCase(),
        number: cardNumber,
        expires: cardExpiry,
        type: detectCardType(cardNumber),
      });

      setCardName("");
      setCardNumber("");
      setCardExpiry("");
      onClose();
    } catch (error) {
      console.error("Failed to add card:", error);
      alert("Failed to add card. Check console.");
    }
  };

  return (
    <div className={`modal-overlay ${show ? "show" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <div className="modal-header">
          <h2 className="modal-title">Add New Card</h2>
          <button onClick={onClose} className="modal-close-btn">&times;</button>
        </div>
        <div className="modal-body">
          <TextInput label="Cardholder Name" id="cardName" value={cardName} onChange={(e) => setCardName(e.target.value)} />
          <TextInput label="Card Number" id="cardNum" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
          <div className="modal-form-row">
            <TextInput label="Expiry Date" id="cardExpiry" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} />
            <TextInput label="CVC" id="cardCVC" />
          </div>
        </div>
        <div className="modal-footer">
          <ModalCancelButton onClick={onClose}>Cancel</ModalCancelButton>
          <PrimaryButton onClick={handleSubmit}>Add Card</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function CreditCard({ data }) {
  const cardTypeClass = (data.type || "mastercard").toLowerCase().replace("-", "");
  return (
    <div className={`credit-card-container ${cardTypeClass}`}>
      <div className="credit-card-header">
        <WifiIcon />
        <CardLogo type={data.type} />
      </div>
      <div className="credit-card-body">
        <CardNumberDisplay number={data.number} />
      </div>
      <div className="credit-card-footer">
        <CardDetail label="Card Holder" value={data.holder} />
        <CardDetail label="Expires" value={data.expires} />
      </div>
    </div>
  );
}

function FeatureBox({ icon, title, subtitle, amount, type }) {
  return (
    <div className="card-base feature-box">
      <div className={`feature-box-icon-wrapper ${type}`}>{icon}</div>
      <div className="feature-box-content">
        <span className="feature-box-title">{title}</span>
        <span className="feature-box-subtitle">{subtitle}</span>
      </div>
      <span className="feature-box-amount">{amount}</span>
    </div>
  );
}
function InvoiceInfo({ date, id }) {
  return (
    <div className="invoice-info">
      <span className="invoice-info-date">{date}</span>
      <span className="invoice-info-id">#{id}</span>
    </div>
  );
}

function InvoiceActions({ amount, pdfUrl }) {
  return (
    <div className="invoice-actions">
      <span className="invoice-actions-amount">${amount}</span>
      <a href={pdfUrl} className="invoice-actions-link" onClick={(e) => e.preventDefault()}>
        <FileTextIcon /> PDF
      </a>
    </div>
  );
}

function InvoiceItem({ invoice }) {
  return (
    <div className="invoice-item-container">
      <InvoiceInfo date={invoice.date} id={invoice.id} />
      <InvoiceActions amount={invoice.amount} pdfUrl={invoice.pdfUrl} />
    </div>
  );
}

function PaymentMethodCard({ method, isActive, onSelect, onToggleFavorite }) {
  return (
    <div className={`payment-method-card-container ${isActive ? "active" : ""}`} onClick={onSelect}>
      <PaymentMethodDetails type={method.type} number={method.number} />
      <div className="payment-method-actions">
        <ActionButton className={method.isFavorite ? "active" : ""} onClick={onToggleFavorite}>
          <HeartIcon />
        </ActionButton>
        <ActionButton onClick={() => console.log("Edit clicked")}>
          <PencilIcon />
        </ActionButton>
      </div>
    </div>
  );
}

const userId = "user_id1"; 
const featureBoxesData = [
  { icon: <BanknoteIcon />, title: "Salary", subtitle: "Belong Interactive", amount: "+$2000", type: "salary" },
  { icon: <WalletIcon />, title: "Paypal", subtitle: "Freelance Payment", amount: "$455.00", type: "paypal" },
];
const invoicesData = [
  { id: "MS-415646", date: "March, 01, 2020", amount: 180, pdfUrl: "#" },
  { id: "RV-126749", date: "February, 10, 2021", amount: 250, pdfUrl: "#" },
  { id: "DW-103578", date: "April, 05, 2020", amount: 120, pdfUrl: "#" },
];

function Dashboard() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [activeCardId, setActiveCardId] = useState(null);
  const [mainCard, setMainCard] = useState({
    number: "**** **** **** 7852",
    holder: "JACK PETERSON",
    expires: "11/22",
    type: "mastercard",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const creditCardsRef = collection(db, "users", userId, "creditcards");
    const unsubscribe = onSnapshot(creditCardsRef, (snapshot) => {
      const cardsFromDB = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          type: data.type || "mastercard",
          number: `**** **** **** ${data.number.slice(-4)}`,
          fullNumber: data.number,
          holder: data.holder || "N/A",
          expires: data.expires || "MM/YY",
          isFavorite: data.isFavorite || false,
        };
      });
      setPaymentMethods(cardsFromDB);

      const favoriteCard = cardsFromDB.find((c) => c.isFavorite) || cardsFromDB[0];
      if (favoriteCard) {
        setActiveCardId(favoriteCard.id);
        setMainCard({
          holder: favoriteCard.holder,
          number: favoriteCard.fullNumber,
          expires: favoriteCard.expires,
          type: favoriteCard.type,
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const handleCardSelect = (cardId) => setActiveCardId(cardId);

  const handleToggleFavorite = async (cardId) => {
    const selectedCard = paymentMethods.find((m) => m.id === cardId);
    if (!selectedCard) return;

    try {
      const batchUpdates = paymentMethods.map((m) => {
        const docRef = doc(db, "users", userId, "creditcards", m.id);
        return updateDoc(docRef, { isFavorite: m.id === cardId });
      });
      await Promise.all(batchUpdates);

      setMainCard({
        holder: selectedCard.holder,
        number: selectedCard.fullNumber,
        expires: selectedCard.expires,
        type: selectedCard.type,
      });
      setActiveCardId(cardId);
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  const handleAddNewCard = async ({ holder, number, expires, type }) => {
    try {
      const creditCardsRef = collection(db, "users", userId, "creditcards");
      const docRef = await addDoc(creditCardsRef, {
        holder,
        number,
        expires,
        type,
        isFavorite: true,
      });
      const unfavoritePromises = paymentMethods.map((m) =>
        updateDoc(doc(db, "users", userId, "creditcards", m.id), { isFavorite: false })
      );
      await Promise.all(unfavoritePromises);
    } catch (error) {
      console.error("Failed to add card:", error);
      throw error;
    }
  };

  return (
    <>
      <GlobalStyles />
      <CardFormModal show={showModal} onClose={() => setShowModal(false)} onAddCard={handleAddNewCard} />
      <div className="app-container">
        <main className="main-column">
          <CreditCard data={mainCard} />
          <section className="payment-methods">
            <div className="section-header">
              <h2 className="section-title">Payment Method</h2>
              <PrimaryButton onClick={() => setShowModal(true)}>+ Add New Card</PrimaryButton>
            </div>
            <div className="flex-col gap-4">
              {paymentMethods.map((method) => (
                <PaymentMethodCard
                  key={method.id}
                  method={method}
                  isActive={activeCardId === method.id}
                  onSelect={() => handleCardSelect(method.id)}
                  onToggleFavorite={() => handleToggleFavorite(method.id)}
                />
              ))}
            </div>
          </section>
        </main>

        <aside className="sidebar-column">
          <div className="flex-col gap-4">
            {featureBoxesData.map((box) => (
              <FeatureBox key={box.title} {...box} />
            ))}
          </div>

          <section className="invoices card-base">
            <div className="section-header">
              <h2 className="section-title">Invoices</h2>
              <SecondaryButton onClick={() => console.log("View All Invoices")}>View All</SecondaryButton>
            </div>
            <div className="flex-col">
              {invoicesData.map((invoice, index) => (
                <InvoiceItem key={`${invoice.id}-${index}`} invoice={invoice} />
              ))}
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}

export default Dashboard;
//comment me kallzu qe su kon ai lmaoo