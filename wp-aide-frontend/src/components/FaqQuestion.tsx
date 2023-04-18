import clsx from "clsx";
import React, { useRef, useState } from "react";
import PlusLess from "./PlusLess";

interface FaqTypes {
	children: any;
}
const FaqQuestion = ({ children }: FaqTypes) => {
	const [open, setOpen] = useState(false);
	const nodesFiltered = children.filter((node: any) => node !== "\n");
	const question = React.cloneElement(nodesFiltered[0], {
		className: "text-xl text-white font-semibold mr-8",
	});

	const answer = React.cloneElement(nodesFiltered[1], {
		className: "p-4",
	});
	return (
		<>
			<div onClick={() => setOpen((prev: boolean) => !prev)} className="flex items-center bg-blue-theme p-4  mb-1 cursor-pointer">
				{question}
				<PlusLess open={open} />
			</div>
			<div className={clsx("overflow-hidden transition-transform origin-top", open ? "scale-y-full h-full" : "scale-y-0 h-0")}>{answer}</div>
		</>
	);
};

export default FaqQuestion;
