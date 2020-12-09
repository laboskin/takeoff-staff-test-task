import React from "react";
import Header from "../../components/Header/Header";
import ContactList from "../../components/ContactList/ContactList";
import { ModalProvider } from "../../hoc/Modal/Modal";

function ContactsPage() {
  return (
    <ModalProvider>
      <Header />
      <ContactList />
    </ModalProvider>
  );
}

export default ContactsPage;
