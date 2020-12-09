import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { useAuth } from "../../hoc/Auth/Auth";
import AuthForm from "../../components/forms/AuthForm/AuthForm";

function AuthPage() {
  const [registrationMode, setRegistrationMode] = useState(false);
  const { isLoading, registerHandler, loginHandler } = useAuth();

  useEffect(() => {
    const modalInstance = M.Modal.init(document.querySelector("#authModal"), {
      dismissible: false,
    });
    modalInstance.open();

    return () => modalInstance.destroy();
  }, []);

  return (
    <main id="authModal" className="modal">
      <div className="modal-content">
        <h4 style={{ marginBottom: 40 }}>
          {registrationMode ? `Sign up` : "Log in"}
        </h4>
        <AuthForm
          submitHandler={registrationMode ? registerHandler : loginHandler}
        />
      </div>
      <div style={{ padding: "15px 24px" }}>
        <button
          className="waves-effect waves-light btn"
          type="submit"
          form="authForm"
          disabled={isLoading}
        >
          {registrationMode ? "Sign up" : "Log in"}
        </button>
        <button
          className="btn-flat"
          style={{ backgroundColor: "transparent" }}
          onClick={() => setRegistrationMode(!registrationMode)}
        >
          {registrationMode ? "Log in?" : "Sign up"}
        </button>
      </div>
    </main>
  );
}

export default AuthPage;
