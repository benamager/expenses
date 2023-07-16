import { useContext } from "react";
import ExpensesContext from "@/contexts/Expenses";
import { useNavigate } from "react-router-dom";

export default function useEditExpense() {
  const navigate = useNavigate();
  const { setExpenses } = useContext(ExpensesContext);

  // function that edits an expense in the expenses array
  function editExpense(updatedExpense) {
    if (updatedExpense.price < 1) return alert("Please write a price for your expense");
    if (updatedExpense.title.length < 1) return alert("Please write a title for your expense");

    setExpenses((prevExpenses) => prevExpenses.map((expense) => (expense.id === updatedExpense.id ? { ...expense, ...updatedExpense } : expense)));

    // redirect to homepage
    navigate("/");
  }

  return { editExpense };
}
