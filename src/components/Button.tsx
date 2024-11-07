import React, { ButtonHTMLAttributes, FC } from "react";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`bg-blue-200 text-blue-800 border border-blue-300 
        rounded-md px-4 py-2 transition-all duration-300
        hover:bg-blue-300 hover:border-blue-400 
        focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:ring-offset-2 shadow-sm hover:shadow-lg 
        active:scale-95 transform ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
