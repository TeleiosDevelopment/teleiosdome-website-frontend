import Link from 'next/link';
import clsx from 'clsx';
import React from 'react';

interface ButtonProps {
  href: string;
  text: string;
  colored?: boolean;
  small?: boolean;
  newTab?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  href,
  text,
  colored = true,
  small = false,
  newTab = false,
}) => {
  const baseClasses = "flex items-center justify-center transition duration-300 transform -skew-x-12";
  const sizeClasses = small
    ? "px-4 h-[36px] text-xs leading-[20px] rounded-tl-[10px] rounded-br-[10px]"
    : "px-6 h-[44px] text-sm leading-[10px] rounded-tl-[12px] rounded-br-[12px]";
  const colorClasses = colored
    ? "bg-gradient-to-r from-[#7e61f8] to-[#d007a6] text-white hover:brightness-110"
    : "bg-transparent border border-white text-white hover:bg-white hover:text-black";

  return (
    <Link
      href={href}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener' : undefined}
      className={clsx(baseClasses, sizeClasses, colorClasses)}
    >
      <span className="skew-x-12">{text}</span>
    </Link>
  );
}

export default Button;