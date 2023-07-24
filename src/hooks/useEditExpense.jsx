import { useContext, useState } from "react";
import ExpensesContext from "@/contexts/Expenses";
import { useNavigate } from "react-router-dom";
import usePopup from "@/hooks/usePopup";

export default function useEditExpense() {
  const navigate = useNavigate();
  const { setExpenses } = useContext(ExpensesContext);

  // handle popups
  const [popupData, setPopupData] = useState({
    title: "",
    text: "",
  });
  const { popupJSX, triggerPopup } = usePopup({ title: popupData.title, text: popupData.text, cancelText: "Affirmative", cancelType: "primary" });

  // function that edits an expense in the expenses array
  function editExpense(updatedExpense) {
    // if title is too long
    if (updatedExpense.title.length > 20) {
      setPopupData({ title: "Title is too long", text: "Title must be less than 20 characters" });
      triggerPopup();
      return;
    }

    if (updatedExpense.price < 1) {
      setPopupData({ title: "Price is too low", text: "Price must be greater than 0" });
      triggerPopup();
      return;
    }

    // if no category
    if (!updatedExpense.categoryId) {
      setPopupData({ title: "No category selected", text: "Please select a category for your expense." });
      triggerPopup();
      return;
    }

    setExpenses((prevExpenses) => prevExpenses.map((expense) => (expense.id === updatedExpense.id ? { ...expense, ...updatedExpense } : expense)));

    // redirect to homepage
    navigate("/");
  }

  return { editExpense, popupJSX };
}
