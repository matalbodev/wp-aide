import clsx from "clsx";
import { ReactSVG } from "react-svg";
interface ButtonProps {
  children: string | JSX.Element | JSX.Element[];
  color: "blue" | "yellow";
  to?: string;
  as: "a" | "button";
  onClick?: () => void;
}
const Button = ({
  children,
  to,
  color,
  as: Component,
  onClick,
}: ButtonProps) => {
  const colorClasses = {
    yellow: "bg-yellow-theme text-blue-theme",
    blue: "bg-blue-theme text-white",
  };
  return (
    <Component
      onClick={onClick}
      className={`group inline-flex items-center overflow-hidden px-6 py-3 ${colorClasses[color]}`}
      href={to || undefined}
    >
      {children}
      <span
        className={clsx(
          "ml-4 h-3 w-4 text-blue-theme transition-transform group-hover:translate-x-2",
          color === "blue" ? "text-white" : "text-blue-theme"
        )}
      >
        <ReactSVG src="assets/arrow.svg" wrapper="svg" />
      </span>
    </Component>
  );
};

export default Button;
