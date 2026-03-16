import React from "react";

interface InputTextProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  className?: string;
}

export default function InputText({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  type = "text",
  className = "",
}: InputTextProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          {label}
        </label>
      )}

      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`bg-transparent border  text-heading text-sm rounded-base focus:ring-[#00aeef] focus:border-[#00aeef] block w-full px-3 py-2.5 shadow-xs placeholder:text-body ${className}`}
      />
    </div>
  );
}