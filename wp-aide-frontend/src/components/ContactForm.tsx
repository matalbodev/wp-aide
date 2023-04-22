import { EventHandler, FormEvent, useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmitedOnce, setIsSubmitedOnce] = useState(false);

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

  let isTest = false;

  useEffect(() => console.log(isSubmitedOnce), [isSubmitedOnce]);
  return (
    <form onSubmit={submit} noValidate>
      <div className="-mx-2 flex">
        <div className="relative flex-1 px-2 pb-4">
          <Input
            placeholder="Nom*"
            type="text"
            id="name"
            name="name"
            defaultValue={isTest ? "Test name" : undefined}
            required
            errorMsg={
              isSubmitedOnce ? "Veuillez indiquer votre nom" : undefined
            }
          />
        </div>
        <div className="flex-1 px-2 pb-4">
          <Input
            placeholder="Prénom"
            type="text"
            id="surname"
            name="surname"
            defaultValue={isTest ? "Test surname" : undefined}
          />
        </div>
      </div>
      <div className="relative -mx-2 flex">
        <div className="flex-1 px-2 pb-4 sm:basis-2/3">
          <Input
            placeholder="Email*"
            type="email"
            name="email"
            id="email"
            defaultValue={isTest ? "email@gmail.com" : undefined}
            required
            errorMsg={
              isSubmitedOnce ? "Veuillez indiquer un email valide" : undefined
            }
          />
        </div>
        <div className="flex-1 px-2 pb-4 sm:basis-1/3">
          <Input
            placeholder="Téléphone"
            type="tel"
            name="telephone"
            id="telephone"
            defaultValue={isTest ? "0643751026" : undefined}
          />
        </div>
      </div>
      <div className="-mx-2 flex">
        <div className="px-2 pb-4 sm:basis-1/2">
          <Select
            id="subject"
            name="subject"
            errorMsg={isSubmitedOnce ? "Veuillez indiquer un sujet" : undefined}
            required
          />
        </div>
      </div>
      <textarea
        placeholder="Description du projet..."
        rows={16}
        className={["w-full border p-2 shadow-lg", "mb-8"].join(" ")}
        id="message"
        name="message"
        defaultValue={isTest ? "Message test" : undefined}
      />
      <div className="text-right">
        <Button
          as="button"
          color="blue"
          onClick={() => setIsSubmitedOnce(true)}
        >
          Envoyer ma demande
        </Button>
      </div>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
