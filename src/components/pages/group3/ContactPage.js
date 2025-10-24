import React from "react";
import "./ContactPage.css";
import ContactHeader from "../../organisms/group3/ContactHeader";
import ContactDetails from "../../organisms/group3/ContactDetails";
import ContactForm from "../../molecules/group3/ContactForm";
import FAQSection from "../../organisms/group3/FAQSection";
import MapSection from "../../organisms/group3/MapSection";

const ContactPage = () => {
    return (
        <div className="contact-page">
            <ContactHeader />
            <ContactDetails />
            <div className="contact-body">
                <ContactForm />
                <FAQSection />
            </div>
            <MapSection />
        </div>
    );
};

export default ContactPage;
