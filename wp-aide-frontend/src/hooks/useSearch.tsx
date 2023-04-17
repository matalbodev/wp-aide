import { useState } from "react";

export default function useSearch(fetch: Function) {
	const [isSearching, setIsSearching] = useState(false);

	return { isSearching };
}
