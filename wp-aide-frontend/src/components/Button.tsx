import clsx from "clsx";
import { ReactSVG } from "react-svg";
interface ButtonProps {
	children: string | JSX.Element | JSX.Element[];
	color: "blue" | "yellow";
	to: string;
}
const Button = ({ children, to, color }: ButtonProps) => {
	const colorClasses = {
		yellow: "bg-yellow-theme text-blue-theme",
		blue: "bg-blue-theme text-white",
	};
	return (
		<>
			<a className={`inline-flex items-center group p-3 px-6 overflow-hidden ${colorClasses[color]}`} href={to}>
				{children}
				<span className={clsx("w-4 h-3 ml-4 group-hover:translate-x-2 text-blue-theme transition-transform", color === "blue" ? "text-white" : "text-blue-theme")}>
					<ReactSVG src="assets/arrow.svg" wrapper="svg" />
				</span>
			</a>
		</>
	);
};

export default Button;