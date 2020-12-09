import React, { useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "../Auth/Auth";
import M from "materialize-css";

const ContactsContext = React.createContext(null);

export const useContacts = () => useContext(ContactsContext);

function ContactsProvider({ children }) {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(false);

  const addContact = async (name, phone) => {
    setLoading(true);
    try {
      const response = await fetch("/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          user: user.id,
        }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message ?? "Server error");

      setContacts([...contacts, data]);
    } catch (e) {
      M.toast({ html: e.message ?? "Server error" });
    } finally {
      setLoading(false);
    }
  };
  const editContact = async (id, name, phone) => {
    setLoading(true);
    try {
      const response = await fetch(`/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          phone,
          user: user.id,
        }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message ?? "Server error");

      setContacts(
        contacts.map((contact) => (contact.id === data.id ? data : contact))
      );
    } catch (e) {
      M.toast({ html: e.message ?? "Server error" });
    } finally {
      setLoading(false);
    }
  };
  const deleteContact = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`/contacts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message ?? "Server error");

      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (e) {
      M.toast({ html: e.message ?? "Server error" });
    } finally {
      setLoading(false);
    }
  };

  const loadContacts = useCallback(async () => {
    try {
      const response = await fetch(`/contacts?user=${user.id}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message ?? "Server error");

      setContacts(data);
    } catch (e) {
      M.toast({ html: e.message ?? "Server error" });
    }
  }, [user.id]);
  const clearContacts = useCallback(() => setContacts(null), []);
  useEffect(() => {
    loadContacts();
    return () => {
      clearContacts();
    };
  }, [loadContacts, clearContacts]);

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        addContact,
        editContact,
        deleteContact,
        search,
        setSearch,
        isLoading: loading,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export default ContactsProvider;
