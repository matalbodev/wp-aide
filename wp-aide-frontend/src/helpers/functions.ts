import type { FormEvent } from "react";

export const combineCardTitle = (title: string) => {
  const arr = title.split("|");
  const supTitle = arr[0];
  const mainTitle = arr[1];
  return {
    supTitle,
    mainTitle,
  };
};

export const checkInput = (
  e: FormEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const target = e.currentTarget;
  const value = target.value;
  const name = target.name;
  if (name === "email") {
    const regex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    return regex.test(value);
  } else {
    return value !== "";
  }
};
