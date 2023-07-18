import { useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import SpentHeading from "@/components/SpentHeading";
import { Link } from "react-router-dom";
import useCategoriesModal from "@/hooks/useCategoriesModal";
import useNumberPad from "@/hooks/useNumberPad";
import useInput from "@/hooks/useInput";
import useAddExpense from "@/hooks/useAddExpense";
import useEditExpense from "@/hooks/useEditExpense";
import Button from "@/components/Button";
import useFindCategory from "@/hooks/useFindCategory";

export default function Expense() {
  const location = useLocation();
  const existingExpense = location.state;
  const { findCategory } = useFindCategory();
  const { editExpense } = useEditExpense();

  const { categoriesModal, selectedCategory, setIsCategoriesModalOpen } = useCategoriesModal();
  const { numberPad, number } = useNumberPad({ defaultNumber: existingExpense ? existingExpense.price.toString() : "0" });
  const { input, inputValue } = useInput({
    placeholder: "Write title here...",
    className: "w-full py-1 outline-none focus:bg-slate-100 rounded-md focus:pl-2 text-lg transform scale-[80%] -translate-x-[14px]",
    defaultValue: existingExpense ? existingExpense.title : "",
  });
  const { addExpense } = useAddExpense();

  const expenseObject = {
    id: existingExpense ? existingExpense.id : nanoid(),
    title: inputValue,
    price: number,
    date: existingExpense ? new Date(existingExpense.date) : new Date(),
    categoryId: selectedCategory ? selectedCategory.id : existingExpense ? existingExpense.categoryId : null,
  };

  return (
    <>
      {categoriesModal}
      <div className="text-slate-300 relative mb-11">
        <Link to="/">
          <span className="absolute left-0 text-base py-4">Cancel</span>
        </Link>
        <h1 className="text-center text-md mt-4">{existingExpense ? "Editing expense" : "Adding expense"}</h1>
        <span></span>
      </div>
      <SpentHeading hasTitle={false} className="border-b pb-1 pt-[3px]" amount={number} />
      <div className="absolute right-4 bottom-0 left-4">
        <div className="text-sm flex justify-between items-center border-b py-2">
          <span className="italic text-slate-300">{expenseObject.date.toDateString()}</span>
          <Button type="primary" text="Save expense" clickHandler={() => (existingExpense ? editExpense(expenseObject) : addExpense(expenseObject))} />
        </div>
        <div className="text-sm flex justify-between items-center border-b py-2 mb-2">
          {input}
          <div className="flex items-center">
            {expenseObject?.categoryId && <span className="text-xl mr-2">{findCategory(expenseObject?.categoryId)?.icon}</span>}
            <Button className="whitespace-nowrap" type="secondary" text="Select category" clickHandler={() => setIsCategoriesModalOpen(true)} />
          </div>
        </div>
        {numberPad}
      </div>
    </>
  );
}
