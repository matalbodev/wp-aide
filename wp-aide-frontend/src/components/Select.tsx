import { useState, type FormEvent, useEffect } from "react";
import { checkInput } from "../helpers/functions";

interface SelectProps {
  id: string;
  name: string;
  required?: boolean;
  errorMsg?: string;
}
const Input = (props: SelectProps) => {
  const [isValid, setIsValid] = useState(false);

  const { required, errorMsg, ...otherProps } = props;
  const displayError = props.required && !isValid && errorMsg;

  return (
    <>
      <div className="border shadow-lg">
        <select
          {...otherProps}
          className="w-full rounded-none border-r-8 border-transparent p-2"
          required
          onChange={(e) => setIsValid(checkInput(e))}
        >
          <option value="" defaultValue={""}>
            Sujet de votre demande*
          </option>
          <option value="Starter e-commerce">Starter e-commerce</option>
          <option value="Starter site vitrine">Starter site vitrine</option>
          <option value="Maintenance premium">Maintenance premium</option>
          <option value="Intervention technique">Intervention technique</option>
        </select>
      </div>
      {displayError && (
        <span className="mt-1 block text-xs text-red-500">{errorMsg}</span>
      )}
    </>
  );
};

export default Input;
