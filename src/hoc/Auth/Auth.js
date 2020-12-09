import React, { useContext, useState } from "react";
import M from "materialize-css";

const AuthContext = React.createContext(null);

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser")) || null
  );
  const [loading, setLoading] = useState(false);

  const findUserByEmail = async (email) => {
    const response = await fetch(`/users?email=${email}`);
    const data = await response.json();

    if (!response.ok || !data) throw new Error(data.message ?? "Server error");

    if (data && !data.length) return null;

    return data[0];
  };
  const signIn = (payload) => {
    localStorage.setItem("authUser", JSON.stringify(payload));
    setUser(payload);
  };

  const registerHandler = async (email, password) => {
    setLoading(true);
    try {
      const candidate = await findUserByEmail(email);
      if (candidate) throw new Error("Email is already in use");

      const response = await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message ?? "Server error");

      setTimeout(() => signIn({ id: data.id, email: data.email }), 0);
    } catch (e) {
      M.toast({ html: e.message ?? "Server error" });
    } finally {
      setLoading(false);
    }
  };
  const loginHandler = async (email, password) => {
    setLoading(true);
    try {
      const candidate = await findUserByEmail(email);

      if (!candidate) throw new Error("User with email doesn't exist");

      if (candidate.password !== password) throw new Error("Wrong password");

      setTimeout(() => signIn({ id: candidate.id, email: candidate.email }), 0);
    } catch (e) {
      M.toast({ html: e.message ?? "Server error" });
    } finally {
      setLoading(false);
    }
  };
  const logoutHandler = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading: loading,
        user,
        registerHandler,
        loginHandler,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
