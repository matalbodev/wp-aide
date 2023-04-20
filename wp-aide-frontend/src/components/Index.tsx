import SearchBar from "./SearchBar";
import Offers from "./Offers";
import { HTMLReactParserOptions, Element, domToReact } from "html-react-parser";
import parse from "html-react-parser";
import ContactForm from "./ContactForm";
import Button from "./Button";
import Faq from "./Faq";
import FaqQuestion from "./FaqQuestion";

interface Props {
	contentString: string;
}

const Index = (props: Props) => {
	const { contentString: content } = props;
	const options: HTMLReactParserOptions = {
		replace: (domNode) => {
			if (domNode instanceof Element && domNode.attribs) {
				const { name, children, attribs } = domNode;
				if (attribs.id === "domainsSearchBar") {
					return <SearchBar />;
				}
				if (attribs.id === "offersList") {
					return <Offers />;
				}
				if (attribs.id === "contactForm") {
					return <ContactForm />;
				}
				if (name === "a" && attribs.class.includes("wp-block-button")) {
					const { href } = attribs;
					const srcClass = attribs.class;
					let color: "yellow" | "blue";
					if (srcClass.includes("has-strong-blue-background-color")) {
						color = "blue";
					} else {
						color = "yellow";
					}
					return (
						<Button as="a" color={color} to={href}>
							{domToReact(children)}
						</Button>
					);
				}
				if (attribs.class && attribs.class.includes("rank-math-list")) {
					const childNodes = domToReact(children, {
						replace: (domNode) => {
							if (domNode instanceof Element && domNode.attribs) {
								const { name, children, attribs } = domNode;
								if (attribs.class && attribs.class.includes("rank-math-list-item")) {
									return <FaqQuestion>{domToReact(children)}</FaqQuestion>;
								}
							}
						},
					}) as JSX.Element[];
					return <Faq>{childNodes}</Faq>;
				}
			}
		},
	};

	return <>{content && parse(content, options)}</>;
};

export default Index;
