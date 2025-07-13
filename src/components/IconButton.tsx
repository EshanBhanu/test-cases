import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  onClick: () => void;
  className?: string;
  title?: string;
};

const IconButton = ({
  icon,
  onClick,
  className,
  title,
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-shrink-0 px-2 text-gray-400 hover:text-gray-600 transition-colors ${className}`}
      {...props}
    >
      {icon}
      {title}
    </button>
  );
};

export { IconButton };
