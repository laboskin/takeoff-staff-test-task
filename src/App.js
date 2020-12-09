import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import ContactsProvider from "./hoc/Contacts/Contacts";
import AuthPage from "./pages/AuthPage/AuthPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import { useAuth } from "./hoc/Auth/Auth";

function App() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <AuthPage />;

  return (
    <ContactsProvider>
      <ContactsPage />
    </ContactsProvider>
  );
}

export default App;
