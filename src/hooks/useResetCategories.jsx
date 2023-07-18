import { useContext } from "react";
import CategoriesContext from "@/contexts/Categories";
import { defaultCategories } from "@/utils/defaultCategories";

export default function useResetCategories(setIsCategoriesModalOpen) {
  const { setCategories } = useContext(CategoriesContext);

  function resetCategories() {
    setCategories(defaultCategories);
    setIsCategoriesModalOpen(true);
  }

  return { resetCategories };
}
