import type { FC } from "react";
import parse from "html-react-parser";
import clsx from "clsx";
import Button from "./Button";

interface Props {
	title: string;
	tarif: {
		prix: string;
		suffixe: string;
	}[];
	tag?: string;
	description: string;
	middle: boolean;
}

const OfferCard: FC<Props> = (props) => {
	const { title, description, tarif, middle, tag } = props;

	const arrTitle = title.split("|");
	const suptitle = arrTitle[0];
	const mainTitle = arrTitle[1];

	return (
		<div className={clsx("bg-blue-theme text-white px-8 relative flex flex-col overflow-hidden", middle ? "h-full pt-16" : "h-[95%] align-middle pt-8 mt-[5%]")}>
			{tag !== "aucun" && <div className="absolute left-0 top-0 bg-yellow-theme py-2 px-8 text-blue-theme font-bold">{tag}</div>}
			<div className="text-center">
				<p className="uppercase leading-3">{suptitle} </p>
				<p className="text-4xl font-bold">{mainTitle} </p>
				<p className="my-4">
					<span className="text-yellow-theme font-bold text-4xl">{tarif[0].prix}</span>
					{tarif[0]?.suffixe !== "aucun" && <span>{tarif[0]?.suffixe}</span>}
				</p>
			</div>
			<div className="list-card mb-8">{parse(description)}</div>
			<div className="text-center mt-auto mb-8">
				<Button color="yellow" as="a" to="#contact">
					Faire une demande
				</Button>
			</div>
		</div>
	);
};

export default OfferCard;
