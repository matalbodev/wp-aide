import { useEffect, useState } from "react";
import OfferCard from "./OfferCard";
import { getOffers } from "../utils/api";

interface Offer {
  id: number;
  title: {
    rendered: string;
  };
  acf: {
    card_description: string;
    prix_de_loffre: string;
    suffixe_prix: string;
    tag_de_loffre: string;
  };
}

const animationOrder = [50, 100, 150, 200];
export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  useEffect(() => {
    const fetchOffers = async () => {
      setOffers(await getOffers());
    };
    fetchOffers();
  }, []);
  return (
    <div id="offers" className="flex flex-col lg:flex-row lg:flex-wrap">
      {offers
        ? offers.map((offer, index: number) => (
            <div className="p-4 lg:basis-1/2 xl:basis-1/4" key={offer.id}>
              <OfferCard
                title={offer.title.rendered}
                middle={index > 0 && index < 3}
                animationOrder={animationOrder[index]}
                tarif={[
                  {
                    prix: offer.acf.prix_de_loffre,
                    suffixe: offer.acf.suffixe_prix,
                  },
                ]}
                description={offer.acf.card_description}
                tag={offer.acf.tag_de_loffre}
              />
            </div>
          ))
        : null}
    </div>
  );
}
