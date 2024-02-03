"use client";

import useRegisterModel from "@/app/hooks/useRegisterModel";
import axios from "axios";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Modal from "./Model";

const RegisterModel = () => {
  const RegisterModel = useRegisterModel();
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoaded(true);

    axios
      .post("/api/register", data)
      .then(() => {
        RegisterModel.onClose();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoaded(false);
      });
  };

  return (
    <Modal
      disabled={isLoaded}
      isOpen={RegisterModel.isOpen}
      onClose={RegisterModel.onClose}
      title="Register"
      actionLabel="Create Account"
      onClose={RegisterModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      
    />
  );
};

export default RegisterModel;
