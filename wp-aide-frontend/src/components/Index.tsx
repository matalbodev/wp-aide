import SearchBar from "./SearchBar";
import Offers from "./Offers";
import { HTMLReactParserOptions, Element, domToReact } from "html-react-parser";
import parse from "html-react-parser";
import ContactForm from "./ContactForm";
import Button from "./Button";

interface Props {
	contentString: string;
	offers: [];
}

const Index = (props: Props) => {
	const { contentString: content, offers } = props;
	const options: HTMLReactParserOptions = {
		replace: (domNode) => {
			if (domNode instanceof Element && domNode.attribs) {
				const { name, children, attribs } = domNode;
				if (attribs.id === "domainsSearchBar") {
					return <SearchBar />;
				}
				if (attribs.id === "offersList") {
					return <Offers offers={offers} />;
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
			}
		},
	};

	return <>{content && parse(content, options)}</>;
};

export default Index;
