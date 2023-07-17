import { useContext } from "react";
import CategoriesContext from "../contexts/Categories";

export default function useFindCategory() {
  const { categories } = useContext(CategoriesContext);

  // find category by id
  function findCategory(categoryId) {
    return categories.find((c) => c.id === categoryId);
  }

  // return the modal and the state setter function
  return { findCategory };
}
