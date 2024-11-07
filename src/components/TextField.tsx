import React, { forwardRef } from "react";
import Label from "./Label.tsx";

type Props = React.InputHTMLAttributes<unknown> & {
  endIcon?: JSX.Element;
};

const Hint: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <span className="block pl-1 text-xs font-normal leading-tight text-gray-500 dark:text-gray-400">
      {children}
    </span>
  );
};

const Input = forwardRef<React.ElementRef<"input">, Props>(
  function TextFieldInputComponent(
    { className, children, endIcon: EndIcon, ...props },
    ref
  ) {
    const inputClassName = `flex h-10 w-full rounded-md border border-input bg-background p-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
      className || ""
    }`;

    return (
      <div className="relative flex items-center w-full">
        <input {...props} className={inputClassName} ref={ref} />
        {EndIcon && <div className="absolute right-3">{EndIcon}</div>}
      </div>
    );
  }
);

type TextFieldComponent = React.FC<
  React.PropsWithChildren<{
    className?: string;
  }>
> & {
  Label: typeof Label;
  Hint: typeof Hint;
  Input: typeof Input;
  Error: typeof ErrorMessage;
};

const TextField: TextFieldComponent = ({ children, className }) => {
  return (
    <div className={`flex flex-col space-y-1 ${className || ""}`}>
      {children}
    </div>
  );
};

const ErrorMessage: React.FC<
  { error: string | undefined } & React.HTMLAttributes<unknown>
> = ({ error, ...props }) => {
  const shouldDisplay = !!error;

  if (!shouldDisplay) {
    return null;
  }

  return (
    <Hint>
      <span {...props} className="py-0.5 text-red-700 dark:text-red-500">
        {error}
      </span>
    </Hint>
  );
};

TextField.Hint = Hint;
TextField.Label = Label;
TextField.Input = Input;
TextField.Error = ErrorMessage;

export default TextField;

export {
  TextField,
  Hint as TextFieldHint,
  Label as TextFieldLabel,
  Input as TextFieldInput,
  ErrorMessage as TextFieldError,
};
