import React, { FC, useState } from "react";

interface CustomInputProps {
  label: string;
}

const CustomInput: FC<CustomInputProps> = ({ label }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(value !== "")}
        className={`peer h-10 w-full border-b-2 border-gray-300 bg-transparent text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 ${
          focused ? "border-blue-500" : ""
        }`}
      />
      <label
        className={`absolute left-0 text-gray-500 transition-all duration-300 transform ${
          focused || value
            ? "-top-4 text-xs text-blue-500"
            : "top-2 text-base text-gray-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default CustomInput;
