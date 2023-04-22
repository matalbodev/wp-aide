import { useRef, type FC, useEffect, useState } from "react";
import parse from "html-react-parser";
import clsx from "clsx";
import Button from "./Button";
import useOnScreen from "../hooks/useOnScreen";
import useScreenSize from "../hooks/useScreenSize";
import { combineCardTitle } from "../helpers/functions";

interface Props {
  title: string;
  tarif: {
    prix: string;
    suffixe: string;
  }[];
  tag?: string;
  description: string;
  middle: boolean;
  animationOrder: number;
}

const OfferCard: FC<Props> = (props) => {
  const { title, description, tarif, middle, tag, animationOrder } = props;

  const { screenSize } = useScreenSize();
  const { supTitle, mainTitle } = combineCardTitle(title);

  const ref: any = useRef<HTMLDivElement>();

  const onScreen: boolean = useOnScreen<HTMLDivElement>(
    ref,
    middle ? "200px" : "220px"
  );

  return (
    <div
      ref={ref}
      className={clsx(
        "relative flex h-full flex-col overflow-hidden bg-blue-theme px-8 text-white",
        screenSize > 1280 &&
          (onScreen
            ? "animated animated__fadeInUp animated--" + animationOrder
            : "opacity-0"),
        middle ? "pt-16" : "pt-8 lg:align-middle xl:mt-[5%] xl:h-[95%]"
      )}
    >
      {tag !== "aucun" && (
        <div className="absolute left-0 top-0 bg-yellow-theme px-8 py-2 font-bold text-blue-theme">
          {tag}
        </div>
      )}
      <div className="text-center">
        <p className="uppercase leading-3">{supTitle} </p>
        <p className="text-4xl font-bold">{mainTitle} </p>
        <p className="my-4">
          <span className="text-4xl font-bold text-yellow-theme">
            {tarif[0].prix}
          </span>
          {tarif[0]?.suffixe !== "aucun" && <span>{tarif[0]?.suffixe}</span>}
        </p>
      </div>
      <div className="list-card mb-8">{parse(description)}</div>
      <div className="mb-8 mt-auto text-center">
        <Button color="yellow" as="a" to="#contact">
          Faire une demande
        </Button>
      </div>
    </div>
  );
};

export default OfferCard;
