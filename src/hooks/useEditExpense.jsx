import { useContext } from "react";
import ExpensesContext from "@/contexts/Expenses";
import { useNavigate } from "react-router-dom";

export default function useEditExpense() {
  const navigate = useNavigate();
  const { setExpenses } = useContext(ExpensesContext);

  // function that edits an expense in the expenses array
  function editExpense(updatedExpense) {
    // if title is too long
    if (updatedExpense.title.length > 20) return alert("Title must be less than 20 characters");

    if (updatedExpense.price < 1) return alert("Please write a price for your expense");

    // if no category
    if (!updatedExpense.categoryId) {
      return alert("Please select a category");
    }

    setExpenses((prevExpenses) => prevExpenses.map((expense) => (expense.id === updatedExpense.id ? { ...expense, ...updatedExpense } : expense)));

    // redirect to homepage
    navigate("/");
  }

  return { editExpense };
}
