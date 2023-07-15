export default function SpentHeading() {
  return (
    <div className="self-center flex flex-col items-center mb-11">
      <span className="text-slate-300 mb-2 text-sm">Spent this period</span>
      <div className="self-center flex">
        <span className="text-slate-300 mr-1 text-sm">DKK</span>
        <span className="text-4xl">2800</span>
        <span className="text-2xl">.00</span>
      </div>
    </div>
  );
}
