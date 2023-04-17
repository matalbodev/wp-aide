const apiRequester = async (endpoint: string): Promise<any> => {
	return await fetch(`https://backoffice.wpaide.fr/wp-json/wp/v2/${endpoint}`);
};

export const getHomeContent = async () => {
	let data;
	try {
		const res = await apiRequester("pages/2");
		const json = await res.json();
		data = json.content.rendered;
	} catch (error) {
		data = error;
	}

	return data;
};

export const getOffers = async () => {
	let data;
	try {
		// get offers
		const resOffers = await apiRequester("offres");
		data = await resOffers.json();
	} catch (error) {
		data = error;
	}

	return data;
};
