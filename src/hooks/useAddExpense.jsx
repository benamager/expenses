import { useContext, useState } from "react";
import ExpensesContext from "@/contexts/Expenses";
import { useNavigate } from "react-router-dom";
import usePopup from "@/hooks/usePopup";

export default function useAddExpense() {
    const navigate = useNavigate();
    const { setExpenses } = useContext(ExpensesContext);

    // handle popups
    const [popupData, setPopupData] = useState({
        title: "",
        text: "",
    });
    const { popupJSX, triggerPopup } = usePopup({ title: popupData.title, text: popupData.text, cancelText: "Affirmative", cancelType: "primary" });

    // function that adds an expense to the expenses array
    function addExpense(expenseObject) {
        if (expenseObject.price < 1) {
            setPopupData({ title: "Price is too low", text: "Price must be greater than 0" });
            triggerPopup();
            return;
        }

        // if no category
        if (!expenseObject.categoryId) {
            setPopupData({ title: "No category selected", text: "Please select a category for your expense." });
            triggerPopup();
            return;
        }

        setExpenses((prevExpenses) => [...prevExpenses, expenseObject]);
        // redirect to homepage
        navigate("/");
    }

    return { addExpense, popupJSX };
}
