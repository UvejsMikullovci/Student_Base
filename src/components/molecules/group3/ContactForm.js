import React from "react";
import Input from "../../atoms/group3/Input";
import Button from "../../atoms/group3/Button";

const ContactForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // 🚀 Këtu do shtosh kodin e emailjs
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-grid">
                <Input label="Emri" name="firstName" placeholder="Emri juaj" />
                <Input label="Mbiemri" name="lastName" placeholder="Mbiemri juaj" />
                <Input label="Email" type="email" name="email" placeholder="email@example.com" />
                <Input label="Telefon" name="phone" placeholder="+355 ..." />
                <Input label="Subjekti" name="subject" placeholder="Si mund t’ju ndihmojmë?" />
                <div className="textarea-group">
                    <label>Mesazhi</label>
                    <textarea name="message" placeholder="Shkruani mesazhin tuaj këtu..."></textarea>
                </div>
            </div>
            <Button type="submit" text="Dërgo mesazhin" />
        </form>
    );
};

export default ContactForm;
