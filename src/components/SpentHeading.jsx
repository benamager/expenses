export default function SpentHeading({ hasTitle, amount, className }) {
  const parsedAmount = parseFloat(amount);

  // break the parsedAmount into two parts: integer and decimal
  const integerPart = Math.floor(parsedAmount);
  let decimalPart = Math.round((parsedAmount - integerPart) * 100);

  // make sure decimal part is always two digits
  decimalPart = ("0" + decimalPart).slice(-2);

  return (
    <div className={`self-center flex flex-col items-center mb-11 ${className}`}>
      {hasTitle && <span className="text-slate-300 mb-2 text-sm">Spent this period</span>}
      <div className="self-center flex">
        <span className="text-slate-300 mr-1 text-sm">DKK</span>
        <span className="text-4xl">{integerPart}</span>
        <span className="text-2xl">.{decimalPart}</span>
      </div>
    </div>
  );
}
