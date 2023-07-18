import { useContext } from "react";
import CategoriesContext from "@/contexts/Categories";
import { useNavigate } from "react-router-dom";

export default function useDeleteCategories() {
  const { setCategories } = useContext(CategoriesContext);
  const navigate = useNavigate();

  function deleteCategories() {
    setCategories([]);
  }

  return { deleteCategories };
}
