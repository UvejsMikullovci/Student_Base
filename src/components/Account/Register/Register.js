import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import "./Register.css";
import { auth, db } from "../../../Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [roleSelection, setRoleSelection] = useState("");
  const [contractorType, setContractorType] = useState("");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const options = useMemo(() => {
    const list = countryList().getData();
    const kosova = { value: "XK", label: "Kosova" };
    return [...list, kosova].sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (val) => {
    setFormData((prev) => ({ ...prev, nationality: val.label }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Fjalëkalimet nuk përputhen.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "registrations", user.uid), {
        ...formData,
        role: roleSelection,
        contractorType: contractorType || "",
        createdAt: new Date().toISOString(),
      });

      setSuccess("Llogaria u krijua me sukses!");
      setFormData({});
      setContractorType("");
      setRoleSelection("");

      if (roleSelection === "Student") navigate("/StudentPanel");
      if (roleSelection === "Professor") navigate("/ProfessorPanel");
      if (roleSelection === "Landlord") navigate("/LandlordPanel");
      if (roleSelection === "College") navigate("/CollegePanel");
    } catch (err) {
      if (err.code === "auth/email-already-in-use")
        setError("Ky email është tashmë i regjistruar.");
      else setError("Regjistrimi dështoi. Ju lutem provoni përsëri.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Regjistrohu</h1>
        <p className="subtitle">Zgjidh rolin tënd për t’u regjistruar</p>

        <div className="form-group">
          <label>Zgjidh Rolin</label>
          <select
            name="role"
            value={roleSelection}
            onChange={(e) => {
              setRoleSelection(e.target.value);
              setContractorType("");
            }}
            required
          >
            <option value="">Zgjidh...</option>
            <option value="Student">Student</option>
            <option value="College">Kolegj</option>
            <option value="Professor">Profesor</option>
            <option value="Landlord">Qiradhënës</option>
          </select>
        </div>

        {/* STUDENT */}
        {roleSelection === "Student" && (
          <>
            <div className="form-group">
              <label>Emri</label>
              <input name="name" value={formData.name || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Mbiemri</label>
              <input name="surname" value={formData.surname || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Data e lindjes</label>
              <input type="date" name="dob" value={formData.dob || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Gjinia</label>
              <select name="gender" value={formData.gender || ""} onChange={handleChange} required>
                <option value="">Zgjidh...</option>
                <option value="Mashkull">Mashkull</option>
                <option value="Femër">Femër</option>
                <option value="Tjetër">Tjetër</option>
              </select>
            </div>
            <div className="form-group">
              <label>Telefoni</label>
              <input name="phone" value={formData.phone || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Fjalëkalimi</label>
              <input type="password" name="password" value={formData.password || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Konfirmo Fjalëkalimin</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Qyteti</label>
              <input name="city" value={formData.city || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Kombësia</label>
              <Select
                options={options}
                value={formData.nationality ? { label: formData.nationality, value: formData.nationality } : null}
                onChange={handleSelect}
                placeholder="Zgjidh kombin..."
              />
            </div>
          </>
        )}

        {/* COLLEGE */}
        {roleSelection === "College" && (
          <>
            <div className="form-group">
              <label>Emri i Kolegjit</label>
              <input name="name" value={formData.name || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Telefoni</label>
              <input name="phone" value={formData.phone || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Qyteti</label>
              <input name="city" value={formData.city || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>A është i akredituar?</label>
              <select name="accredited" value={formData.accredited || ""} onChange={handleChange}>
                <option value="">Zgjidh...</option>
                <option value="Po">Po</option>
                <option value="Jo">Jo</option>
              </select>
            </div>
            <div className="form-group">
              <label>Fjalëkalimi</label>
              <input type="password" name="password" value={formData.password || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Konfirmo Fjalëkalimin</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword || ""} onChange={handleChange} required />
            </div>
          </>
        )}

        {/* PROFESSOR */}
        {roleSelection === "Professor" && (
          <>
            <div className="form-group">
              <label>Emri</label>
              <input name="name" value={formData.name || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Mbiemri</label>
              <input name="surname" value={formData.surname || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Kolexhi ku jep mësim</label>
              <input name="college" value={formData.college || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Telefoni</label>
              <input name="phone" value={formData.phone || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Fjalëkalimi</label>
              <input type="password" name="password" value={formData.password || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Konfirmo Fjalëkalimin</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword || ""} onChange={handleChange} required />
            </div>
          </>
        )}

        {/* LANDLORD */}
        {roleSelection === "Landlord" && (
          <>
            <div className="form-group">
              <label>Lloji i kontraktorit</label>
              <select
                value={contractorType}
                onChange={(e) => setContractorType(e.target.value)}
                required
              >
                <option value="">Zgjidh...</option>
                <option value="Private">Privat</option>
                <option value="Company">Kompani</option>
              </select>
            </div>

            {contractorType === "Private" && (
              <>
                <div className="form-group">
                  <label>Emri</label>
                  <input name="name" value={formData.name || ""} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Mbiemri</label>
                  <input name="surname" value={formData.surname || ""} onChange={handleChange} required />
                </div>
              </>
            )}

            {contractorType === "Company" && (
              <>
                <div className="form-group">
                  <label>Emri i Kompanisë</label>
                  <input name="companyName" value={formData.companyName || ""} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Adresa</label>
                  <input name="address" value={formData.address || ""} onChange={handleChange} required />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Telefoni</label>
              <input name="phone" value={formData.phone || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Fjalëkalimi</label>
              <input type="password" name="password" value={formData.password || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Konfirmo Fjalëkalimin</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword || ""} onChange={handleChange} required />
            </div>
          </>
        )}

        {roleSelection && (
          <button type="submit" disabled={loading}>
            {loading ? "Duke u regjistruar..." : "Regjistrohu"}
          </button>
        )}

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}