import { useContext } from "react";
import ExpensesContext from "@/contexts/Expenses";

export default function ExpenseList() {
  const { expenses } = useContext(ExpensesContext);

  console.log(expenses);

  return (
    <ul className="mx-4 text-sm">
      <li className="mb-11">
        <div className="border-b border-b-slate-100 flex justify-between text-slate-300 ml-11 pb-1">
          <span>I dag</span>
          <span>28 DKK</span>
        </div>
        <ul>
          <li className="flex items-center mt-2">
            <span className="text-2xl mr-[20px]">🍔</span>
            <div className="flex flex-col">
              <span>Indkøb i netto</span>
              <span className="text-slate-300">Kategori</span>
            </div>
            <span className="ml-auto">200 DKK</span>
          </li>
        </ul>
      </li>
    </ul>
  );
}
