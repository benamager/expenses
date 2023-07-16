import { useContext } from "react";
import ExpensesContext from "@/contexts/Expenses";
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

function editAction() {
  return (
    <LeadingActions>
      <SwipeAction onClick={() => console.info("swipe action triggered")} className="bg-blue-300 flex mr-2 rounded-sm">
        <span className="self-center text-center px-2">Edit</span>
      </SwipeAction>
    </LeadingActions>
  );
}

function deleteAction() {
  return (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => console.info("swipe action triggered")} className="bg-red-300 flex ml-2 rounded-sm">
        <span className="self-center text-center px-2">Delete</span>
      </SwipeAction>
    </TrailingActions>
  );
}

export default function ExpenseList() {
  const { expenses } = useContext(ExpensesContext);

  console.log(expenses);

  return (
    <ul className="mx-4 text-sm">
      <li className="mb-11">
        <div className="border-b border-b-slate-100 flex justify-between text-slate-300 ml-11 pb-1">
          <span>I dag</span>
          <span>28 DKK</span>
        </div>
        <SwipeableList>
          <SwipeableListItem leadingActions={editAction()} trailingActions={deleteAction()} className="flex items-center mt-2">
            <span className="text-2xl mr-[20px]">🍔</span>
            <div className="flex flex-col">
              <span>Indkøb i netto</span>
              <span className="text-slate-300">Kategori</span>
            </div>
            <span className="ml-auto">200 DKK</span>
          </SwipeableListItem>
        </SwipeableList>
      </li>
      <li className="mb-11">
        <div className="border-b border-b-slate-100 flex justify-between text-slate-300 ml-11 pb-1">
          <span>I dag</span>
          <span>28 DKK</span>
        </div>
        <SwipeableList>
          <SwipeableListItem leadingActions={editAction()} trailingActions={deleteAction()} className="flex items-center mt-2">
            <span className="text-2xl mr-[20px]">🍔</span>
            <div className="flex flex-col">
              <span>Indkøb i netto</span>
              <span className="text-slate-300">Kategori</span>
            </div>
            <span className="ml-auto">200 DKK</span>
          </SwipeableListItem>
        </SwipeableList>
      </li>
    </ul>
  );
}
