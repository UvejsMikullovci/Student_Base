import React from "react";

const Input = ({ label, type = "text", name, placeholder }) => (
    <div className="input-group">
        <label>{label}</label>
        <input type={type} name={name} placeholder={placeholder} required />
    </div>
);

export default Input;
