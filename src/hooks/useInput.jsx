import { useState } from "react";

export default function useInput({ placeholder, className, type = "text" }) {
  const [inputValue, setInputValue] = useState("");

  const input = <input onChange={(e) => setInputValue(e.target.value)} value={inputValue} type={type} placeholder={placeholder} className={className} />;

  return { input, inputValue };
}
