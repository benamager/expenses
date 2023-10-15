import { useState, useEffect } from "react";

export default function useInput({ placeholder, className, type = "text", defaultValue = "" }) {
    const [inputValue, setInputValue] = useState(defaultValue);

    useEffect(() => {
        setInputValue(defaultValue);
    }, [defaultValue]);

    const input = <input onChange={(e) => setInputValue(e.target.value)} value={inputValue} maxLength={20} type={type} placeholder={placeholder} className={className} />;

    return { input, inputValue };
}
