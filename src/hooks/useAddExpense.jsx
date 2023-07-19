import { useContext } from "react";
import ExpensesContext from "@/contexts/Expenses";
import { useNavigate } from "react-router-dom";

export default function useAddExpense() {
  const navigate = useNavigate();
  const { setExpenses } = useContext(ExpensesContext);

  // function that adds an expense to the expenses array
  function addExpense(expenseObject) {
    if (expenseObject.price < 1) return alert("Please write a price for your expense");

    setExpenses((prevExpenses) => [...prevExpenses, expenseObject]);
    // redirect to homepage
    navigate("/");
  }

  return { addExpense };
}
