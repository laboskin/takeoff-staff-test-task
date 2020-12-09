import React from "react";
import { useContacts } from "../../hoc/Contacts/Contacts";
import { useModal } from "../../hoc/Modal/Modal";

function Contact({ id, name, phone }) {
  const { deleteContact } = useContacts();
  const showModal = useModal();

  return (
    <li>
      <div className="collapsible-header">
        <i className="material-icons">person</i>
        {name}
      </div>
      <div className="collapsible-body">
        <div style={{ paddingBottom: 20 }}>
          <strong>Phone number: </strong>
          {phone}
        </div>
        <div>
          <button
            className="waves-effect waves-light btn-small"
            style={{ marginRight: 10 }}
            onClick={(e) => {
              e.preventDefault();
              showModal({ id, name, phone });
            }}
          >
            <i className="material-icons left">edit</i>
            Edit
          </button>
          <button
            className="waves-effect waves-light btn-small red lighten-1"
            onClick={(e) => {
              e.preventDefault();
              deleteContact(id);
            }}
          >
            <i className="material-icons left">delete</i>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default Contact;
