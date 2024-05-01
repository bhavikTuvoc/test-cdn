import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type TextInputProps<TFieldValues extends FieldValues> = {
  placeholder?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  type?: "text" | "password" | "email" | "number" | "date" | "tel";
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

const Input = <TFieldValues extends FieldValues>({
  placeholder,
  register,
  name,
  type = "text",
  className,
  ...restProps
}: TextInputProps<TFieldValues>): JSX.Element => {
  return (
    <input
      {...register(name)}
      type={type}
      placeholder={placeholder}
      className={`${className}`}
      {...restProps}
    />
  );
};

export default Input;
