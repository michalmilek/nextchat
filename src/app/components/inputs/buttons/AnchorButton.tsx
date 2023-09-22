import React from "react";
import { IconType } from "react-icons";
import { ButtonHTMLAttributes } from "react";

interface AnchorButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
  target?: string;
  rel?: string;
  icon?: IconType;
}

const AnchorButton: React.FC<AnchorButtonProps> = ({
  href,
  target,
  rel,
  icon: Icon,
  children,
  ...rest
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}>
      <button {...rest}>
        {Icon && <Icon className="inline-block mr-2" />}
        {children}
      </button>
    </a>
  );
};

export default AnchorButton;
