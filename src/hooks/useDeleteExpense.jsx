import { useContext } from "react";
import ExpensesContext from "@/contexts/Expenses";

export default function useAddExpense() {
  const { expenses, setExpenses } = useContext(ExpensesContext);

  // function that deletes an expense from the expenses array
  function deleteExpense(expenseId) {
    // filter out the expense with the given id
    const newExpenses = expenses.filter((expense) => expense.id !== expenseId);
    setExpenses(newExpenses);
  }

  return { deleteExpense };
}
