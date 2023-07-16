export default function Button({ type, text, clickHandler, className }) {
  return (
    <button onClick={clickHandler} className={`${type === "primary" ? "bg-black text-white" : "bg-white text-black border border-black"} py-2 px-4 rounded-full ${className}`}>
      {text}
    </button>
  );
}
