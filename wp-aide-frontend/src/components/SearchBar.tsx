import clsx from "clsx";
import { useState, type FormEvent } from "react";
import Button from "./Button";
import useScreenSize from "../hooks/useScreenSize";

enum Availability {
  available = "available",
  unavailable = "unavailable",
}

export default function SearchBar() {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<Availability | undefined>();
  const [isFilled, setIsFilled] = useState(false);
  const { isMobile } = useScreenSize();
  const handleSentform = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsSearching(true);
    const target = e.currentTarget;
    const data = new FormData(target);
    const url = data.get("domain") as string;
    const response = await fetch(`/api/domain?name=${url}`, {
      method: "GET",
    });
    const json: {
      products: {
        name: string;
        status: Availability;
      }[];
    } = await response.json();
    setIsAvailable(Availability[json.products[0].status]);
    setIsSearching(false);
  };
  const responses = {
    available: (
      <div className="mt-8 flex items-center bg-yellow-theme pl-4">
        <div className="font-bold text-blue-theme">Domaine disponible</div>
        <div className="ml-auto">
          <Button
            as="a"
            to="#contact?subject=Reservation de domaine"
            color="blue"
          >
            Demander la réservation
          </Button>
        </div>
      </div>
    ),
    unavailable: (
      <div className="mt-8 bg-yellow-theme px-4 py-3">
        <div className="font-bold text-blue-theme">Domaine indisponible</div>
      </div>
    ),
  };

  const status = responses[isAvailable as Availability];

  return (
    <>
      <form
        onSubmit={handleSentform}
        className="mt-8 flex items-start lg:-mr-24"
      >
        <div className="flex-1">
          <input
            onChange={(e) => setIsFilled(e.target.value.length > 0)}
            type="text"
            placeholder="Je recherche un nom de domaine disponible pour mon site"
            name="domain"
            className="w-full flex-1 appearance-none rounded-none px-5 py-3 text-blue-theme shadow-xl"
            id="domain"
          />
        </div>
        <Button color="yellow" as="button">
          {isSearching ? "Recherche en cours" : "Recherche"}
        </Button>
      </form>
      {isFilled && status}
    </>
  );
}
