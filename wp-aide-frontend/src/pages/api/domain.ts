import type { APIRoute } from "astro";

const searchDomain = async (domain: string) => {
	let data;
	const url = `https://api.gandi.net/v5/domain/check?name=${domain}`;
	const apiKey = "6OoZODs2lInnkS6xyo0vqa05";
	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				authorization: `Apikey ${apiKey}`,
			},
		});

		data = response.json();
	} catch (error) {
		console.error(error);
	}

	return data;
};

export const get: APIRoute = async ({ params, request }) => {
	const url = new URL(request.url);

	const domain = url.searchParams.get("name") ?? "example.com";
	const data = await searchDomain(domain);
	return {
		body: JSON.stringify(data) ?? "blop",
	};
};
