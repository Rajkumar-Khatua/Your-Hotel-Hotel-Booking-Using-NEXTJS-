"use client";

import useRegisterModel from "@/app/hooks/useRegisterModel";
import useLoginModel from "@/app/hooks/useLoginModel";
import axios from "axios";
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Modal from "./Model";
import Heading from "../Heading";
import Input from "../inputes/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { sign } from "crypto";

const LoginModel = () => {
  const router = useRouter();
  const RegisterModel = useRegisterModel();
  const LoginModel = useLoginModel();
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoaded(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoaded(false);

      if (callback?.ok) {
        toast.success("Wow! dear, nice to see you again");
        router.refresh();
        LoginModel.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
        console.error(callback.error);
      }
    });
  };
  // Toggling the Model Component
  const toggle = useCallback(() => {
    LoginModel.onClose();
    RegisterModel.onOpen();
  }, [LoginModel, RegisterModel]);

  //  Body Content for the Model Component
  const bodyContent = (
    <div
      className="
      flex flex-col gap-4"
    >
      <Heading
        title="Hey, Nice to see you again! 🎉"
        subtitle="One step ahead to access your account. 🚀"
        center={false}
      />
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
        disabled={isLoaded}
        register={register}
        errors={errors}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoaded}
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
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="flex p-2 gap-2 items-center justify-center">
        <p className="text-sm text-neutral-500">
          First Time Using Your Hotel ?{" "}
        </p>
        <button
          className="text-sm text-neutral-800 hover:underline transition duration-300"
          onClick={toggle}
        >
          Create an account now!
        </button>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoaded}
      isOpen={LoginModel.isOpen}
      onClose={LoginModel.onClose}
      title="Login"
      actionLabel="Login"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModel;
