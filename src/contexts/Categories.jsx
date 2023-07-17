import { createContext } from "react";

const CategoriesContext = createContext({});

export const CategoriesProvider = CategoriesContext.Provider;
export const CategoriesConsumer = CategoriesContext.Consumer;

export default CategoriesContext;
