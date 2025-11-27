import React, { useRef, useState } from "react";
import Input from "../../atoms/AboutUsAndContact/Input";
import TextArea from "../../atoms/AboutUsAndContact/TextArea";
import Button from "../../atoms/AboutUsAndContact/Button";
import "./ContactForm.css";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const formRef = useRef();
  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatusMessage(null);

    const SERVICE_ID = "service_gzclfjq ";
    const TEMPLATE_ID = "Ytemplate_r4wqj07";
    const PUBLIC_KEY = "B-VJ0Dgsad6GhHRsr";

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatusMessage({ type: "success", text: "Mesazhi u dërgua me sukses!" });
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatusMessage({ type: "error", text: "Gabim gjatë dërgimit. Provo përsëri." });
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
        <h3 className="form-title">Dërgoni një mesazh</h3>

        <div className="two-col">
          <Input label="Emri" name="first_name" placeholder="Emri juaj" required />
          <Input label="Mbiemri" name="last_name" placeholder="Mbiemri juaj" required />
        </div>

        <Input label="Email" type="email" name="email" placeholder="email@example.com" required />
        <Input label="Telefon" name="phone" placeholder="+383 49 123 4567" />
        <Input label="Subjekti" name="subject" placeholder="Si mund t'ju ndihmojmë?" required />
        <TextArea label="Mesazhi" name="message" placeholder="Shkruani mesazhin tuaj këtu..." required />

        <div className="form-actions">
          <Button type="submit">{sending ? "Dërgo..." : "Dërgo mesazhin"}</Button>
        </div>

        {statusMessage && (
          <div className={`status ${statusMessage.type === "success" ? "status-success" : "status-error"}`}>
            {statusMessage.text}
          </div>
        )}
      </form>
    </motion.div>
  );
}
