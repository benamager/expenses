import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import ExpensesContext from "@/contexts/Expenses";
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import groupExpensesByDay from "@/utils/groupExpensesByDay";
import useAddExpense from "@/hooks/useDeleteExpense";
import useFindCategory from "@/hooks/useFindCategory";
import { BsFillInfoSquareFill } from "react-icons/bs";

function editAction(navigate, expense) {
  // navigate to the expense page with the expense state on swipe
  return (
    <LeadingActions>
      <SwipeAction onClick={() => navigate("expense", { state: expense })} className="bg-blue-300 flex mr-3 rounded-sm">
        <span className="self-center text-center px-2">Edit</span>
      </SwipeAction>
    </LeadingActions>
  );
}

function deleteAction(expenseId, deleteExpense) {
  return (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => deleteExpense(expenseId)} className="bg-red-300 flex ml-3 rounded-sm">
        <span className="self-center text-center px-2">Delete</span>
      </SwipeAction>
    </TrailingActions>
  );
}

export default function ExpenseList() {
  const navigate = useNavigate();
  const { findCategory } = useFindCategory();

  const { expenses } = useContext(ExpensesContext);
  const [groupedExpenses, setGroupedExpenses] = useState([]);
  const { deleteExpense } = useAddExpense();

  // group expenses by day
  useEffect(() => {
    setGroupedExpenses(groupExpensesByDay(expenses));
  }, [expenses]);

  return groupedExpenses.length === 0 ? (
    <div className="text-center flex flex-col items-center mt-11 mx-1">
      <BsFillInfoSquareFill size="30px" className="mx-auto text-slate-300 mb-4" />
      <span className="text-lg mb-1">No expenses yet</span>
      <span className="text-slate-500 font-light">Add some by pressing the plus icon</span>
    </div>
  ) : (
    <ul className="mx-4 text-sm flex flex-col-reverse">
      {groupedExpenses.map((group) => (
        <li key={group.day} className="mb-11">
          <div className="border-b border-b-slate-100 flex justify-between text-slate-300 ml-11 pb-1">
            <span>{group.day}</span>
            <span>{group.total} DKK</span>
          </div>
          <SwipeableList className="flex flex-col-reverse">
            {group.expenses.map((expense) => {
              const category = findCategory(expense.categoryId);

              return (
                <SwipeableListItem key={expense.id} leadingActions={editAction(navigate, expense)} trailingActions={deleteAction(expense.id, deleteExpense)} className="flex items-center mt-2 py-1">
                  <span className="text-2xl mr-[20px]">{category?.icon ? category?.icon : "🤷‍♂️"}</span>
                  <div className="flex flex-col">
                    <span>{expense.title ? `${expense.title.charAt(0).toUpperCase() + expense.title.slice(1)}` : "No title"}</span>
                    <span className="text-slate-300">{category?.name ? category?.name : "No category"}</span>
                  </div>
                  <span className="ml-auto">{expense.price} DKK</span>
                </SwipeableListItem>
              );
            })}
          </SwipeableList>
        </li>
      ))}
    </ul>
  );
}
