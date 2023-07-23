import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import ExpenseList from "@/components/ExpenseList";
import SpentHeading from "@/components/SpentHeading";
import useExpenseData from "@/hooks/useExpenseData";
import ExpensesContext from "@/contexts/Expenses";
import useFindCategory from "@/hooks/useFindCategory";
import useInput from "@/hooks/useInput";

function searchItems(expenses, query) {
  return expenses.filter((expense) => expense.title.toLowerCase().includes(query.toLowerCase()) || expense.price.toString() === query || expense.category.name.toLowerCase().includes(query.toLowerCase()));
}

export default function Homepage() {
  const { totalForPeriod } = useExpenseData();
  const { expenses } = useContext(ExpensesContext);
  const { findCategory } = useFindCategory();
  const { input: searchInput, inputValue: searchQuery } = useInput({
    placeholder: "Search by name, price and category",
    className: "w-full py-1 outline-none focus:bg-slate-100 rounded-md text-lg transform scale-[80%] text-right pr-2 ml-auto max-w-[344px] translate-x-6 text-black placeholder-slate-300",
  });

  const expensesWithCategory = expenses.map((expense) => {
    return {
      ...expense,
      category: findCategory(expense.categoryId),
    };
  });

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(searchItems(expensesWithCategory, searchQuery));
  }, [searchQuery, expenses]);

  return (
    <>
      <Link to="expense" className="ml-auto">
        <AiFillPlusCircle size="35px" className="p-3 box-content ml-auto" />
      </Link>
      <SpentHeading hasTitle={true} amount={totalForPeriod} />
      {expensesWithCategory.length != 0 && <>{searchInput}</>}
      <ExpenseList expenses={searchQuery.length < 1 ? expensesWithCategory : searchResults} isSearching={searchQuery.length != 0} />
    </>
  );
}
