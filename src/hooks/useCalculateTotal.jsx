import { useContext } from "react";
import ExpensesContext from "@/contexts/Expenses";

export default function useCalculateTotal() {
  const { expenses } = useContext(ExpensesContext);

  const total = expenses.reduce((sum, expense) => sum + Number(expense.price), 0);

  return { total };
}
