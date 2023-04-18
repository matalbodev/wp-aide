import clsx from "clsx";

interface PlusLessTypes {
	open: boolean;
}
const PlusLess = ({ open }: PlusLessTypes) => {
	return (
		<i
			className={clsx(
				"ml-auto relative h-4 w-4 before:absolute before:h-full before:w-1 before:bg-white before:transition-opacity after:absolute after:h-full after:w-1 after:bg-white after:rotate-90",
				open ? "before:opacity-0" : " before:opacity-100"
			)}
		></i>
	);
};

export default PlusLess;
