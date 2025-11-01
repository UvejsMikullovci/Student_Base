import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import "./Register.css";
import { auth, db } from "../../../Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    nationality: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const options = useMemo(() => {
    const list = countryList().getData();
    const kosova = { value: "XK", label: "Kosova" };
    const updated = [...list, kosova].sort((a, b) =>
      a.label.localeCompare(b.label)
    );
    return updated;
  }, []);

  const handleSelectChange = (value) => {
    setFormData({ ...formData, nationality: value.label });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError("Fjalëkalimet nuk përputhen.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "registrations", user.uid), {
        name: formData.name || "",
        surname: formData.surname || "",
        dob: formData.dob || "",
        gender: formData.gender || "",
        phone: formData.phone || "",
        email: formData.email || "",
        city: formData.city || "",
        nationality: formData.nationality || "",
        role: "Student",
        createdAt: new Date().toISOString(),
      });

      setSuccess(true);
      setFormData({
        name: "",
        surname: "",
        dob: "",
        gender: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        city: "",
        nationality: "",
      });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Ky email është tashmë i regjistruar.");
      } else {
        setError("Regjistrimi dështoi. Ju lutem provoni përsëri.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Regjistrohu</h1>
        <p className="subtitle">Plotësoni të dhënat për të krijuar llogarinë tuaj</p>

        <div className="form-grid">
          <div className="form-group">
            <label>Emri</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mbiemri</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Data e lindjes</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Gjinia</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Zgjidh...</option>
              <option value="Mashkull">Mashkull</option>
              <option value="Femër">Femër</option>
              <option value="Tjetër">Tjetër</option>
            </select>
          </div>

          <div className="form-group">
            <label>Telefoni</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Fjalëkalimi</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Konfirmo Fjalëkalimin</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Qyteti</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Kombësia</label>
            <Select
              options={options}
              value={
                formData.nationality
                  ? { label: formData.nationality, value: formData.nationality }
                  : null
              }
              onChange={handleSelectChange}
              placeholder="Zgjidh kombin..."
              classNamePrefix="country-select"
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: "10px",
                  borderColor: "#e2dad2",
                  boxShadow: "none",
                  padding: "2px",
                  fontFamily: "Poppins, sans-serif",
                  "&:hover": { borderColor: "#df4c4a" },
                }),
                option: (base, { isFocused }) => ({
                  ...base,
                  backgroundColor: isFocused ? "#df4c4a15" : "white",
                  color: "#101010",
                }),
              }}
            />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Duke u regjistruar..." : "Regjistrohu"}
        </button>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {success && (
          <p className="success">
            Llogaria u krijua me sukses.
          </p>
        )}
      </form>
    </div>
  );
}