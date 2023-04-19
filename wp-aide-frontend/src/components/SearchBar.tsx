import { useState, type FormEvent } from "react";

enum Availability {
	available = "available",
	unavailable = "unavailable",
}

const responses = {
	default: "Recherche",
	available: "Je me lance !",
	unavailable: "Domaine indispo",
};

export default function SearchBar() {
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [isAvailable, setIsAvailable] = useState<Availability | undefined>();
	const [isFilled, setIsFilled] = useState(false);
	const handleSentform = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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

	const status = responses[isAvailable || "default"];

	return (
		<form onSubmit={handleSentform} className="lg:-mr-24 flex items-center mt-8 shadow-xl">
			<input
				onChange={(e) => setIsFilled(e.target.value !== "")}
				type="text"
				placeholder="Je recherche un nom de domaine disponible pour mon site"
				name="domain"
				className="px-5 py-3 w-full flex-1 text-blue-theme"
				id="domain"
			/>
			<button className="bg-yellow-theme text-blue-theme px-8 py-3 font-semibold" type="submit">
				{isFilled ? (isSearching ? "Recherche en cours" : status) : "Recherche"}
			</button>
		</form>
	);
}
