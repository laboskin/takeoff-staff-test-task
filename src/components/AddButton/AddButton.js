import React from "react";
import { useModal } from "../../hoc/Modal/Modal";

function AddButton() {
  const showModal = useModal();

  return (
    <div className="fixed-action-btn" onClick={() => showModal()}>
      <div className="btn-floating btn-large">
        <i className="large material-icons">add</i>
      </div>
    </div>
  );
}

export default AddButton;