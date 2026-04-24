import React from "react";
import { useTheme } from "next-themes";

const Button = ({ children, type, onClick, classes }) => {
  const { theme } = useTheme();

  const baseStyles =
    "text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg transition-all duration-300 ease-out hover:scale-105 active:scale-100 link";

  if (type === "primary") {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`${baseStyles} first:ml-0 ${
          theme === "dark"
            ? "bg-white text-black"
            : "bg-black text-white"
        } ${classes || ""}`}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={`${baseStyles} flex items-center tablet:first:ml-0 ${
        theme === "dark"
          ? "hover:bg-slate-600 text-white"
          : "hover:bg-slate-100"
      } ${classes || ""}`}
    >
      {children}
    </button>
  );
};

export default Button;