import { createElement, FC } from "react";

type Props = React.LabelHTMLAttributes<unknown> & {
  as?: string;
};

const Label: FC<Props> = ({ children, className, as, ...props }) => {
  const tag = as ?? "label";

  const classNames = `w-full text-sm font-medium text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem] ${
    className || ""
  }`;

  return createElement(
    tag,
    {
      className: classNames.trim(),
      ...props,
    },
    children
  );
};

export default Label;
