import { EventHandler, FormEvent, useState } from "react";
import Button from "./Button";

export default function Form() {
	const [responseMessage, setResponseMessage] = useState("");

	async function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		const response = await fetch("/api/mail", {
			method: "POST",
			body: formData,
		});
		const data = await response.json();
		if (data.message) {
			setResponseMessage(data.message);
		}
	}

	const commonsInputClasses = "border w-full shadow-xl p-2";
	let isTest = true;
	return (
		<form onSubmit={submit}>
			<div className="flex -mx-2">
				<div className="px-2 pb-4 flex-1">
					<input placeholder="Nom" className={commonsInputClasses} type="text" id="name" name="name" defaultValue={isTest ? "Test name" : undefined} />
				</div>
				<div className="px-2 pb-4 flex-1">
					<input placeholder="Prénom" className={commonsInputClasses} type="text" id="surname" name="surname" defaultValue={isTest ? "Test surname" : undefined} />
				</div>
			</div>
			<div className="flex -mx-2">
				<div className="px-2 sm:basis-2/3 pb-4 flex-1">
					<input className={commonsInputClasses} placeholder="Email" type="email" name="email" id="email" defaultValue={isTest ? "email@gmail.com" : undefined} />
				</div>
				<div className="px-2 sm:basis-1/3 pb-4 flex-1">
					<input className={commonsInputClasses} placeholder="Téléphone" type="tel" name="telephone" id="telephone" defaultValue={isTest ? "0643751026" : undefined} />
				</div>
			</div>
			<textarea
				placeholder="Description du projet..."
				rows={16}
				className={[commonsInputClasses, "mb-8"].join(" ")}
				id="message"
				name="message"
				defaultValue={isTest ? "Message test" : undefined}
			/>
			<div className="text-right">
				<Button as="button" color="blue">
					Envoyer ma demande
				</Button>
			</div>
			{responseMessage && <p>{responseMessage}</p>}
		</form>
	);
}
