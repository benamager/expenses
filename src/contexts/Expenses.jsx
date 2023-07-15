import { createContext } from "react";

const ExpensesContext = createContext({});

export const ExpensesProvider = ExpensesContext.Provider;
export const ExpensesConsumer = ExpensesContext.Consumer;

export default ExpensesContext;
