import { useContext } from "react";
import ExpensesContext from "@/contexts/Expenses";
import { useNavigate } from "react-router-dom";

export default function useAddExpense() {
  const navigate = useNavigate();
  const { setExpenses } = useContext(ExpensesContext);

  // function that adds an expense to the expenses array
  function addExpense(expenseObject) {
    // if title is too long
    if (expenseObject.title.length > 20) return alert("Title must be less than 20 characters");

    if (expenseObject.price < 1) return alert("Please write a price for your expense");

    // if no category
    if (!expenseObject.categoryId) {
      return alert("Please select a category");
    }

    setExpenses((prevExpenses) => [...prevExpenses, expenseObject]);
    // redirect to homepage
    navigate("/");
  }

  return { addExpense };
}
