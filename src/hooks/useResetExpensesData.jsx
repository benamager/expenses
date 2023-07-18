import { useContext } from "react";
import ExpensesContext from "@/contexts/Expenses";
import { useNavigate } from "react-router-dom";

export default function useResetExpensesData() {
  const { setExpenses } = useContext(ExpensesContext);
  const navigate = useNavigate();

  function resetExpensesData() {
    setExpenses([]);
    // redirect to homepage
    navigate("/");
  }

  return { resetExpensesData };
}
