import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type TextTextAreaProps<TFieldValues extends FieldValues> = {
  placeholder?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  className?: string;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "type">;

const TextArea = <TFieldValues extends FieldValues>({
  placeholder,
  register,
  name,
  className,
  ...restProps
}: TextTextAreaProps<TFieldValues>): JSX.Element => {
  return (
    <textarea
      {...register(name)}
      {...restProps}
      placeholder={placeholder}
      className={`${className}`}
    />
  );
};

export default TextArea;
