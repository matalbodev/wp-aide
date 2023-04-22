import { useState, type FormEvent, useEffect } from "react";
import { checkInput } from "../helpers/functions";

interface InputProps {
  errorMsg?: string;
  placeholder: string;
  type: string;
  id: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}
const Input = (props: InputProps) => {
  const [isValid, setIsValid] = useState(false);

  const { errorMsg, ...otherProps } = props;

  const displayError = otherProps.required && !isValid && errorMsg;

  return (
    <>
      <input
        {...otherProps}
        className="w-full appearance-none rounded-none border p-2 shadow-lg"
        onChange={(e) => setIsValid(checkInput(e))}
      />
      {displayError && (
        <span className="mt-1 block text-xs text-red-500">{errorMsg}</span>
      )}
    </>
  );
};

export default Input;
