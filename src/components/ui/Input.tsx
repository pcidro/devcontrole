/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

export default function Input({
  name,
  placeholder,
  type,
  register,
  rules,
  error,
}: InputProps) {
  return (
    <>
      <input
        type={type}
        className="w-full border-2 rounded-md h-11 px-2"
        placeholder={placeholder}
        {...register(name, rules)}
        id={name}
      />
      {error && <p className="text-red-500 my-1">{error}</p>}
    </>
  );
}
