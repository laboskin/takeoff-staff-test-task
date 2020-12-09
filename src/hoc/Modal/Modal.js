import React, { useCallback, useContext, useEffect, useState } from "react";
import M from "materialize-css";
import ContactForm from "../../components/forms/ContactForm/ContactForm";
import { useContacts } from "../Contacts/Contacts";

const ModalContext = React.createContext(null);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [contact, setContact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { addContact, editContact, isLoading } = useContacts();

  const showModal = (contact = null) => {
    setContact(contact);
    M.Modal.getInstance(document.querySelector(".modal")).open();
  };
  const submitHandler = useCallback(
    async (name, phone, id) => {
      if (id) await editContact(id, name, phone);
      else await addContact(name, phone);

      M.Modal.getInstance(document.querySelector("#contactModal")).close();
    },
    [addContact, editContact]
  );

  useEffect(() => {
    M.Modal.init(document.querySelector("#contactModal"), {
      onOpenStart: () => {
        setModalVisible(true);
      },
      onCloseEnd: () => {
        setModalVisible(false);
        setContact(null);
      },
      preventScrolling: false,
    });
  }, []);

  return (
    <ModalContext.Provider value={showModal}>
      {children}
      <div id="contactModal" className="modal">
        <div className="modal-content">
          <h4 style={{ marginBottom: 40 }}>
            {contact ? `Edit contact` : "Add contact"}
          </h4>
          {modalVisible && (
            <ContactForm submitHandler={submitHandler} contact={contact} />
          )}
        </div>
        <div style={{ padding: "15px 24px" }}>
          <button
            className="waves-effect waves-light btn"
            type="submit"
            form="contactForm"
            disabled={isLoading}
          >
            Save
          </button>
        </div>
      </div>
    </ModalContext.Provider>
  );
};