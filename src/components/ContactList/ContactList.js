import React, { useEffect } from "react";
import M from "materialize-css";
import Contact from "../Contact/Contact";
import AddButton from "../AddButton/AddButton";
import { useContacts } from "../../hoc/Contacts/Contacts";
import Preloader from "../Preloader/Preloader";

function ContactList() {
  const { contacts, search } = useContacts();

  useEffect(() => {
    M.Collapsible.init(document.querySelectorAll(".collapsible"), {
      accordion: true,
    });
  });

  if (!contacts)
    return (
      <div className="container">
        <Preloader />
      </div>
    );

  return (
    <>
      <div className="container">
        <ul className="collapsible">
          {contacts
            .filter((contact) => {
              if (contact.name.toLowerCase().includes(search.toLowerCase()))
                return true;

              const searchDigits = search.replace(/[^+\d]/g, "");
              if (
                searchDigits &&
                contact.phone.replace(/[^+\d]/g, "").includes(searchDigits)
              )
                return true;

              return false;
            })
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(({ id, name, phone }) => (
              <Contact key={id} id={id} name={name} phone={phone} />
            ))}

          {!contacts.length && (
            <div style={{ padding: "10px 20px" }}>
              <h5>No contacts found.</h5>
              <p>Click the plus button below to add some :)</p>
            </div>
          )}
        </ul>
      </div>
      <AddButton />
    </>
  );
}

export default ContactList;
