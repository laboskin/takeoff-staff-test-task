import React, { useEffect } from "react";
import M from "materialize-css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../FormInput/FormInput";
import Inputmask from "inputmask";

function ContactForm({ contact, submitHandler }) {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required("Name is required")
      .max(42, "Name is too long"),
    phone: yup
      .string()
      .trim()
      .required("Phone number is required")
      .matches(
        /\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}/,
        "Please enter valid phone number"
      ),
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
  useEffect(() => {
    Inputmask({
      mask: "+7 (999) 999-99-99",
      showMaskOnHover: false,
    }).mask("#phone");
  }, []);

  return (
    <form
      id="contactForm"
      onSubmit={handleSubmit(({ name, phone, id }) =>
        submitHandler(name, phone, id)
      )}
    >
      <FormInput
        register={register}
        id="name"
        name="name"
        type="text"
        inputMode="text"
        label="Name"
        defaultValue={contact && contact.name}
      />
      <FormInput
        register={register}
        id="phone"
        name="phone"
        type="tel"
        inputMode="tel"
        label="Phone number"
        defaultValue={contact && contact.phone}
      />
      {contact && (
        <input
          ref={register}
          id="id"
          name="id"
          type="hidden"
          defaultValue={contact.id}
        />
      )}
    </form>
  );
}

export default ContactForm;
