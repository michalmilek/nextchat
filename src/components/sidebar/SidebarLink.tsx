import React from "react";
import { IconType } from "react-icons";
import Link from "next/link";

interface SidebarLinkProps {
  label: string;
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  label,
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  return (
    <li
      className={`p-4 ${active ? "bg-gray-700" : "hover:bg-gray-700"}`}
      onClick={onClick}>
      <Link
        className="flex items-center"
        href={href}>
        <Icon />
        <span className="ml-2">{label}</span>
      </Link>
    </li>
  );
};

export default SidebarLink;
