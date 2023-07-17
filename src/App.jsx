import useLocalStorage from "use-local-storage";
import Router from "@/routes/Router";
import { ExpensesProvider } from "@/contexts/Expenses";
import { CategoriesProvider } from "@/contexts/Categories";
import { defaultCategories } from "./utils/defaultCategories";

export default function App() {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [categories, setCategories] = useLocalStorage("categories", []);

  // set default categories if none exist
  if (categories.length === 0) {
    setCategories(defaultCategories);
  }

  return (
    <ExpensesProvider value={{ expenses, setExpenses }}>
      <CategoriesProvider value={{ categories, setCategories }}>
        <Router />
      </CategoriesProvider>
    </ExpensesProvider>
  );
}
