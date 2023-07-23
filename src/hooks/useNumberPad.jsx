import { useState } from "react";

export default function useNumberPad({ defaultNumber = "" }) {
  const [number, setNumber] = useState(defaultNumber);

  const handleClick = (value) => {
    switch (value) {
      case "DEL":
        // if deleting when number is e.g (79.8) and we delete 8, we want to delete the dot as well
        if (number.includes(".")) {
          const splitNumber = number.split(".");
          if (splitNumber[1].length === 1) {
            setNumber((prevNumber) => prevNumber.slice(0, -2));
            return;
          }
        }
        // if last digit is removed, set number to 0
        if (number.length === 1) {
          setNumber("0");
          return;
        }
        // remove last digit
        setNumber((prevNumber) => prevNumber.slice(0, -1));
        break;
      case ".":
        // if number already has a dot, don't add another one
        if (!number.includes(".")) {
          setNumber((prevNumber) => prevNumber + ".");
        }
        break;
      default:
        // not let it be more than 6 digits
        if (number.length === 9) {
          return;
        }
        // do not allow more than 2 decimals
        if (number.includes(".") && number.split(".")[1].length === 2) return;
        // add digit to number
        setNumber((prevNumber) => prevNumber + value);
        break;
    }
  };

  const numberPad = (
    <div className="w-full grid grid-cols-3 pb-8 text-xl select-none ">
      {["7", "8", "9", "4", "5", "6", "1", "2", "3", ".", "0", "DEL"].map((value, index) => (
        <div key={index} onClick={() => handleClick(value)} className="w-full py-3 rounded-md active:bg-slate-100 text-center">
          {value}
        </div>
      ))}
    </div>
  );

  // convert to float
  const floatNumber = parseFloat(number);

  return { numberPad, number: floatNumber };
}
