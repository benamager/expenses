import useLocalStorage from "use-local-storage";
import Router from "@/routes/Router";
import { ExpensesProvider } from "./contexts/Expenses";

export default function App() {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  return (
    <ExpensesProvider value={{ expenses, setExpenses }}>
      <Router />
    </ExpensesProvider>
  );
}
