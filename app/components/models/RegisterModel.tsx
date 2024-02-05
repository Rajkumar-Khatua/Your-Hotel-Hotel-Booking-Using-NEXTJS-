"use client";

import useRegisterModel from "@/app/hooks/useRegisterModel";
import axios from "axios";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Modal from "./Model";
import Heading from "../Heading";
import Input from "../inputes/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { TfiGoogle } from "react-icons/tfi";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

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
        toast.error(error.response.data.message || "An error occurred");
      })
      .finally(() => {
        setIsLoaded(false);
      });
  };

  //  Body Content for the Model Component
  const bodyContent = (
    <div
      className="
      flex flex-col gap-4"
    >
      <Heading
        title="Welcome to Your Hotel"
        subtitle="Let's Continue your journey"
        center={false}
      />
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
        register={register}
        errors={errors}
      />
      <Input
        id="name"
        label="Name"
        type="text"
        placeholder="Enter your password"
        required
        register={register}
        errors={errors}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        required
        register={register}
        errors={errors}
      />
    </div>
  );
  // Footer Content for the Model Component
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="flex p-2 gap-2 items-center justify-center">
        <p className="text-sm text-neutral-500">Already have an account?</p>
        <button
          className="text-sm text-neutral-800 hover:underline transition duration-300"
          onClick={RegisterModel.onClose}
        >
          Login
        </button>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoaded}
      isOpen={RegisterModel.isOpen}
      onClose={RegisterModel.onClose}
      title="Register"
      actionLabel="Create Account"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModel;
