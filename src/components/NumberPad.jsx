export default function NumberPad() {
  return (
    <div className="w-full flex flex-col pb-5 text-xl select-none">
      <ul className="flex text-center">
        <li className="w-[33.3%] py-3 rounded-md active:bg-slate-100">7</li>
        <li className="w-[33.3%] py-3 rounded-md active:bg-slate-100">8</li>
        <li className="w-[33.3%] py-3 rounded-md active:bg-slate-100">9</li>
      </ul>
      <ul className="flex text-center">
        <li className="w-[33.3%] py-3 rounded-md active:bg-slate-100">4</li>
        <li className="w-[33.3%] py-3 rounded-md active:bg-slate-100">5</li>
        <li className="w-[33.3%] py-3 rounded-md active:bg-slate-100">6</li>
      </ul>
      <ul className="flex text-center">
        <li className="w-[33.3%] py-3 rounded-md active:bg-slate-100">1</li>
        <li className="w-[33.3%] py-3 rounded-md active:bg-slate-100">2</li>
        <li className="w-[33.3%] py-3 rounded-md active:bg-slate-100">3</li>
      </ul>
      <ul className="flex text-center">
        <li className="w-[33.3%] py-3 rounded-md active:bg-slate-100">.</li>
        <li className="w-[33.3%] py-3 rounded-md active:bg-slate-100">0</li>
        <li className="w-[33.3%] py-3 rounded-md active:bg-slate-100">DEL</li>
      </ul>
    </div>
  );
}
