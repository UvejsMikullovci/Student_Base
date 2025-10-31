import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import "./Register.css";
import { db, auth } from "../../../Firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

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
    citizenship: "",
    city: "",
    nationality: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const options = useMemo(() => {
    const list = countryList().getData();
    const kosovo = { value: "XK", label: "Kosovo" };
    const updated = [...list, kosovo].sort((a, b) =>
      a.label.localeCompare(b.label)
    );
    return updated;
  }, []);

  const handleSelectChange = (value) => {
    setFormData({ ...formData, citizenship: value.label });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError("❌ Fjalëkalimet nuk përputhen!");
      return;
    }

    setLoading(true);
    try {
      // Create user in Firebase Auth
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // Save user data in Firestore
      await addDoc(collection(db, "registrations"), {
        name: formData.name,
        surname: formData.surname,
        dob: formData.dob,
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email,
        citizenship: formData.citizenship,
        city: formData.city,
        nationality: formData.nationality,
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
        citizenship: "",
        city: "",
        nationality: "",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Gabim gjatë regjistrimit. Kontrollo të dhënat.");
    }
    setLoading(false);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Regjistrohu</h1>
        <p className="subtitle">Plotësoni të dhënat tuaja për t’u regjistruar</p>

        <div className="form-grid">
          <div className="form-group">
            <label>Emri</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Mbiemri</label>
            <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Data e lindjes</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Gjinia</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Zgjidh...</option>
              <option value="Mashkull">Mashkull</option>
              <option value="Femër">Femër</option>
              <option value="Tjetër">Tjetër</option>
            </select>
          </div>

          <div className="form-group">
            <label>Telefoni</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Fjalëkalimi</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Konfirmo Fjalëkalimin</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Shtetësia</label>
            <Select
              options={options}
              value={formData.citizenship ? { label: formData.citizenship, value: formData.citizenship } : null}
              onChange={handleSelectChange}
              placeholder="Zgjidh shtetin..."
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

          <div className="form-group">
            <label>Qyteti</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Duke regjistruar..." : "Regjistrohu"}
        </button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">✅ Llogaria u krijua me sukses!</p>}
      </form>
    </div>
  );
}