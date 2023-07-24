export default function Button({ type, text, clickHandler, className }) {
  // if no type is passed, return a default button
  if (!type) {
    return (
      <button onClick={clickHandler} className={`py-2 px-4 rounded-full ${className}`}>
        {text}
      </button>
    );
  }

  // if a type is passed, return a button with the appropriate styling
  if (type == "primary") {
    return (
      <button onClick={clickHandler} className={`${className} bg-black text-white py-2 px-4 rounded-full`}>
        {text}
      </button>
    );
  }

  if (type == "secondary") {
    return (
      <button onClick={clickHandler} className={`${className} bg-white text-black border border-black py-2 px-4 rounded-full`}>
        {text}
      </button>
    );
  }

  if (type == "danger") {
    return (
      <button onClick={clickHandler} className={`${className} bg-red-400 text-black py-2 px-4 rounded-full`}>
        {text}
      </button>
    );
  }
}
