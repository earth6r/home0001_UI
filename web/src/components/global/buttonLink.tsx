import React from "react";

interface ButtonLinkProps {
  color: string;
  className: string;
  type: string;
  value: string;
  id?: string;
  role?: string;
  disabled?: boolean;
  onClick?: () => Promise<void>;
}

const ButtonLink = ({ color, className, type, value, disabled, ...rest }: ButtonLinkProps) => {
  if (!type || !value) return <></>;

  const buttonDisabled = disabled || false;
  const customClassNames = className || "";

  const colorClassName =
    color === "black" && !buttonDisabled ? "bg-black hover:bg-black text-white" : "";

  const classNames = `${colorClassName} ${customClassNames} box rounded-md w-full block text-center leading-none h-2em  flex items-center justify-center text-mobileBody md:text-desktopBody`;

  return (
    <span className="max-w-2xl block w-full">
      <input className={classNames} type={type} value={value} disabled={buttonDisabled} {...rest} />
    </span>
  );
};

export default ButtonLink;
