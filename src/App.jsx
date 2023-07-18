import { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import Router from "@/routes/Router";
import { ExpensesProvider } from "@/contexts/Expenses";
import { CategoriesProvider } from "@/contexts/Categories";
import { SettingsProvider } from "@/contexts/Settings";
import { defaultCategories } from "@/utils/defaultCategories";
import { defaultSettings } from "@/utils/defaultSettings";

export default function App() {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [categories, setCategories] = useLocalStorage("categories", []);
  const [settings, setSettings] = useLocalStorage("settings", []);

  useEffect(() => {
    // new user, set default categories and settings
    if (settings["newUser"] === undefined) {
      setCategories(defaultCategories);
      setSettings(defaultSettings);
    }
  });

  return (
    <ExpensesProvider value={{ expenses, setExpenses }}>
      <CategoriesProvider value={{ categories, setCategories }}>
        <SettingsProvider value={{ settings, setSettings }}>
          <Router />
        </SettingsProvider>
      </CategoriesProvider>
    </ExpensesProvider>
  );
}
