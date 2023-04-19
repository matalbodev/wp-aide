import parse from "html-react-parser";
import React from "react";
interface FaqTypes {
	children: any;
}
const Faq = ({ children }: FaqTypes) => {
	return <div className="md:w-4/6 mx-auto">{children}</div>;
};

export default Faq;
