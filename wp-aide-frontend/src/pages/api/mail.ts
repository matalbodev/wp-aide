import type { APIRoute } from "astro";

export const post: APIRoute = async ({ request }) => {
	const data = await request.formData();
	const name = data.get("name");
	const email = data.get("email");
	const message = data.get("message");
	// Validate the data - you'll probably want to do more than this
	if (!name || !email || !message) {
		return new Response(
			JSON.stringify({
				message: "Missing required fields",
			}),
			{ status: 400 }
		);
	}

	const sendEmail = async () => {
		let headersList = {
			Accept: "*/*",
			"Content-Type": "application/json",
		};

		let bodyContent = JSON.stringify({
			html: `
				Name: ${name} <br />
				Email : ${email} <br />
				Message : <br />
				${message}
			`,
			to: "contact@wpaide.fr",
			subject: "test",
		});

		let response = await fetch("https://backoffice.wpaide.fr/wp-json/wp-mail-rest-api/v1/send-email", {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		});

		let data = await response.text();
		return data;
	};
	const response = await sendEmail();

	return new Response(response, { status: 200 });
};
