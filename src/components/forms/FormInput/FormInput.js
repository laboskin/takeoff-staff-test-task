import React from "react";

function FormInput({
  register,
  id,
  name,
  type,
  inputMode,
  defaultValue,
  label,
}) {
  return (
    <div className="input-field row">
      <input
        className="col m12 xl6"
        ref={register}
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        defaultValue={defaultValue ?? ""}
      />
      <label className={defaultValue ? "active" : ""} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default FormInput;
