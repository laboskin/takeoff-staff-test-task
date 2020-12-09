import React, { useEffect } from "react";
import M from "materialize-css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../FormInput/FormInput";

function AuthForm({ submitHandler }) {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .lowercase()
      .required("Email is required")
      .email("Email must be a valid email"),
    password: yup
      .string()
      .trim()
      .min(8, "Password is too short")
      .max(50, "Password is too long"),
  });
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const formErrors = Object.values(errors);
    if (formErrors.length) M.toast({ html: formErrors[0].message });
  });

  return (
    <form
      id="authForm"
      onSubmit={handleSubmit(({ email, password }) =>
        submitHandler(email, password)
      )}
    >
      <FormInput
        register={register}
        id="email"
        name="email"
        type="email"
        inputMode="email"
        label="Email"
      />
      <FormInput
        register={register}
        id="password"
        name="password"
        type="password"
        inputMode="text"
        label="Password"
      />
    </form>
  );
}

export default AuthForm;
