import React, { useState, useEffect } from "react";
import "./Documents.css";
import { Plus, FileText, Trash2, Download, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [limitMessage, setLimitMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedDocs = JSON.parse(localStorage.getItem("userDocuments")) || [];
    setDocuments(savedDocs);
  }, []);

  const saveDocuments = (docs) => {
    try {
      localStorage.setItem("userDocuments", JSON.stringify(docs));
      setDocuments(docs);
      if (docs.length < 3) setLimitMessage("");
    } catch (err) {
      console.error("Storage full:", err);
      setLimitMessage("Skedarët janë shumë të mëdhenj. Përdorni versione më të vogla.");
    }
  };

  const compressImage = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 400;
        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL("image/jpeg", 0.7);
        callback(compressed);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (documents.length >= 3) {
      setLimitMessage("Ke arritur limitin e dokumenteve. <b>Upgrade planin</b> për të shtuar më shumë skedarë.");
      return;
    }

    const date = new Date().toLocaleDateString();

    const saveFile = (base64Data) => {
      const newDoc = {
        name: file.name,
        type: file.type,
        date,
        content: base64Data,
      };
      const updated = [...documents, newDoc];
      saveDocuments(updated);
    };

    if (file.type.startsWith("image/")) {
      compressImage(file, saveFile);
    } else {
      if (file.size > 2 * 1024 * 1024) {
        setLimitMessage("Ky skedar është shumë i madh. Përdorni një më të vogël se 2 MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => saveFile(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (name) => {
    const updated = documents.filter((doc) => doc.name !== name);
    saveDocuments(updated);
  };

  const handleDownload = (doc) => {
    const link = document.createElement("a");
    link.href = doc.content;
    link.download = doc.name;
    link.click();
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  const openDocumentsPage = () => {
    navigate("/panel/documents");
  };

  return (
    <div className="documents-container">
      <div className="documents-header">
        <div>
          <h2>Dokumentet e Mia</h2>
          <p>Ngarko ose menaxho dokumentet e tua personale (CV, Ese, etj).</p>
        </div>

        <div className="button-group">
          <button className="add-btn" onClick={triggerFileInput}>
            <Plus size={20} />
          </button>
          <input
            type="file"
            id="fileInput"
            accept=".pdf,.doc,.docx,.txt,.jpg,.png"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </div>
      </div>

      <div className="documents-list">
        {documents.length === 0 ? (
          <p className="empty-text">Nuk ke ngarkuar asnjë dokument ende.</p>
        ) : (
          documents.map((doc, i) => (
            <div key={i} className="document-card">
              <div className="doc-info">
                <FileText className="doc-icon" size={26} />
                <div>
                  <h4>{doc.name}</h4>
                  <p>{doc.date}</p>
                </div>
              </div>

              <div className="doc-actions">
                <button onClick={() => handleDownload(doc)} title="Shkarko">
                  <Download size={18} />
                </button>
                <button onClick={() => handleDelete(doc.name)} title="Fshij">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ Limit message BELOW the documents */}
      {limitMessage && (
        <p
          className="limit-message"
          dangerouslySetInnerHTML={{ __html: limitMessage }}
        ></p>
      )}
    </div>
  );
}