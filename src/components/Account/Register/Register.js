import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import "./Register.css";
import { auth, db } from "../../../Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default function Register() {
  const [roleSelection, setRoleSelection] = useState("");
  const [contractorType, setContractorType] = useState("");
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
    accredited: "",
    college: "",
    address: "",
    companyName: "",
  });

  const [touched, setTouched] = useState({});
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

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const isFieldEmpty = (field) => touched[field] && !formData[field];

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
        ...formData,
        role: roleSelection,
        contractorType: contractorType || "",
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
        accredited: "",
        college: "",
        address: "",
        companyName: "",
      });
      setRoleSelection("");
      setContractorType("");
      setTouched({});
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Ky email është tashmë i regjistruar.");
      } else {
        setError("Regjistrimi dështoi. Ju lutem provoni përsëri.");
      }
    }

    setLoading(false);
  };

  // Helper for inputs with validation message
  const InputField = ({ label, name, type = "text", required = true }) => (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={isFieldEmpty(name) ? "invalid" : ""}
        required={required}
      />
      {isFieldEmpty(name) && <small className="error-text">Kjo fushë është e detyrueshme.</small>}
    </div>
  );

  // ---------------- FORM RENDERERS ----------------
  const renderStudentForm = () => (
    <>
      <InputField label="Emri" name="name" />
      <InputField label="Mbiemri" name="surname" />
      <InputField label="Data e lindjes" name="dob" type="date" />
      <div className="form-group">
        <label>Gjinia</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          onBlur={handleBlur}
          className={isFieldEmpty("gender") ? "invalid" : ""}
          required
        >
          <option value="">Zgjidh...</option>
          <option value="Mashkull">Mashkull</option>
          <option value="Femër">Femër</option>
          <option value="Tjetër">Tjetër</option>
        </select>
        {isFieldEmpty("gender") && <small className="error-text">Zgjidh gjininë.</small>}
      </div>
      <InputField label="Telefoni" name="phone" />
      <InputField label="Email" name="email" type="email" />
      <InputField label="Fjalëkalimi" name="password" type="password" />
      <InputField label="Konfirmo Fjalëkalimin" name="confirmPassword" type="password" />
      <InputField label="Qyteti" name="city" />
      <div className="form-group">
        <label>Kombësia</label>
        <Select
          options={options}
          value={formData.nationality ? { label: formData.nationality, value: formData.nationality } : null}
          onChange={handleSelectChange}
          placeholder="Zgjidh kombin..."
        />
      </div>
    </>
  );

  const renderCollegeForm = () => (
    <>
      <InputField label="Emri i Kolegjit" name="name" />
      <InputField label="Email" name="email" type="email" />
      <InputField label="Telefoni" name="phone" />
      <InputField label="Qyteti" name="city" />
      <div className="form-group">
        <label>A është i akredituar?</label>
        <select
          name="accredited"
          value={formData.accredited}
          onChange={handleChange}
          onBlur={handleBlur}
          className={isFieldEmpty("accredited") ? "invalid" : ""}
          required
        >
          <option value="">Zgjidh...</option>
          <option value="Po">Po</option>
          <option value="Jo">Jo</option>
        </select>
        {isFieldEmpty("accredited") && <small className="error-text">Zgjidh nëse është i akredituar.</small>}
      </div>
      <InputField label="Fjalëkalimi" name="password" type="password" />
      <InputField label="Konfirmo Fjalëkalimin" name="confirmPassword" type="password" />
    </>
  );

  const renderProfessorForm = () => (
    <>
      <InputField label="Emri" name="name" />
      <InputField label="Mbiemri" name="surname" />
      <InputField label="Kolexhi ku jep mësim" name="college" />
      <InputField label="Email" name="email" type="email" />
      <InputField label="Telefoni" name="phone" />
      <InputField label="Fjalëkalimi" name="password" type="password" />
      <InputField label="Konfirmo Fjalëkalimin" name="confirmPassword" type="password" />
    </>
  );

  const renderLandlordForm = () => (
    <>
      <div className="form-group">
        <label>Lloji i kontraktorit</label>
        <select
          value={contractorType}
          onChange={(e) => setContractorType(e.target.value)}
          className={!contractorType && touched.contractorType ? "invalid" : ""}
          onBlur={() => setTouched({ ...touched, contractorType: true })}
          required
        >
          <option value="">Zgjidh...</option>
          <option value="Private">Privat</option>
          <option value="Company">Kompani</option>
        </select>
        {!contractorType && touched.contractorType && (
          <small className="error-text">Zgjidh llojin e kontraktorit.</small>
        )}
      </div>

      {contractorType === "Private" && (
        <>
          <InputField label="Emri" name="name" />
          <InputField label="Mbiemri" name="surname" />
          <InputField label="Email" name="email" type="email" />
          <InputField label="Telefoni" name="phone" />
          <InputField label="Fjalëkalimi" name="password" type="password" />
          <InputField label="Konfirmo Fjalëkalimin" name="confirmPassword" type="password" />
        </>
      )}

      {contractorType === "Company" && (
        <>
          <InputField label="Emri i Kompanisë" name="companyName" />
          <InputField label="Adresa" name="address" />
          <InputField label="Email" name="email" type="email" />
          <InputField label="Telefoni" name="phone" />
          <InputField label="Fjalëkalimi" name="password" type="password" />
          <InputField label="Konfirmo Fjalëkalimin" name="confirmPassword" type="password" />
        </>
      )}
    </>
  );

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Regjistrohu</h1>
        <p className="subtitle">Zgjidh rolin tënd për t’u regjistruar</p>

        <div className="form-group">
          <label>Zgjidh Rolin</label>
          <select
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

        {roleSelection === "Student" && renderStudentForm()}
        {roleSelection === "College" && renderCollegeForm()}
        {roleSelection === "Professor" && renderProfessorForm()}
        {roleSelection === "Landlord" && renderLandlordForm()}

        {roleSelection && (
          <button type="submit" disabled={loading}>
            {loading ? "Duke u regjistruar..." : "Regjistrohu"}
          </button>
        )}

        {error && <p className="error">{error}</p>}
        {success && <p className="success">Llogaria u krijua me sukses!</p>}
      </form>
    </div>
  );
}


