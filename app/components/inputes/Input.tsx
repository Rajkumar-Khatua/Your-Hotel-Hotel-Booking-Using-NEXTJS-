"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import React from "react";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  formatPrice?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  placeholder,
  required,
  formatPrice,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-500 absolute top-5 transform -translate-y-1/2 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
            peer
            w-full
            p-4
            pt-6
            rounded-lg
            font-light
            bg-white
            border-2
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${formatPrice ? "pl-9" : "pl-4"}
            ${errors[id] ? "border-rose-500" : "border-neutral-200"}
            ${
              errors[id]
                ? "focus:border-rose-500 text-rose-500 "
                : "focus:border-black text-black"
            }
        `}
      />
      <label
        htmlFor={id}
        className={`
          absolute
          text-md
          duration-300
          transform
            -translate-y-3
            top-5
            z-10
            origin-[0]
            ${formatPrice ? "left-10" : "left-4"}
            ${errors[id] ? "text-rose-500" : "text-zinc-500"}
            peer-placeholder-shown:scale-100
            peer-focus:scale-90
            peer-focus:-translate-y-4
            peer-placeholder-shown:translate-y-0
          `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
