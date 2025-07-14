import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import type { ReactNode } from "react";
import { useState } from "react";
import { LuUserRound, LuChevronDown, LuLogOut } from "react-icons/lu";

// Dummy utility function to replace cn from styleUtils
const cn = (...classes: (string | undefined)[]): string => {
  return classes.filter(Boolean).join(" ");
};

interface LinkButtonProps extends LinkProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient" | "authenticated";
  userName?: string; // For authenticated variant
  onLogout?: () => void; // For authenticated variant
}

export const LinkButton = ({
  to,
  children,
  className,
  variant = "primary",
  userName,
  onLogout,
  ...props
}: LinkButtonProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getFirstName = (fullName: string): string => {
    const firstSpaceIndex = fullName.indexOf(" ");
    return firstSpaceIndex !== -1
      ? fullName.substring(0, firstSpaceIndex)
      : fullName;
  };

  const baseStyles =
    "px-4 py-2 rounded-md text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-[#6E40C9] text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary:
      "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
    authenticated:
      "bg-green-500 text-white shadow-none cursor-default hover:transform-none",
  };

  if (variant === "authenticated" && userName) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={cn(
            baseStyles,
            variantStyles.authenticated,
            "flex items-center gap-2",
            className
          )}
        >
          <LuUserRound /> {getFirstName(userName)}{" "}
          <LuChevronDown className="ml-1" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <button
              onClick={() => {
                onLogout?.();
                setIsDropdownOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-[#090830] hover:bg-gray-200 flex items-center gap-2 rounded-lg"
            >
              <LuLogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}

        {isDropdownOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
      </div>
    );
  }

  return (
    <Link
      to={to}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
};
