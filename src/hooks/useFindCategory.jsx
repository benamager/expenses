import { useContext } from "react";
import CategoriesContext from "../contexts/Categories";
import { nanoid } from "nanoid";

export default function useFindCategory() {
  const { categories } = useContext(CategoriesContext);

  // find category by id
  function findCategory(categoryId) {
    let category = categories.find((c) => c.id === categoryId);

    if (!category) {
      category = {
        id: nanoid(),
        name: "No category",
        iconUrl: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f937-200d-2642-fe0f.png",
      };
    }

    return category;
  }

  // return the modal and the state setter function
  return { findCategory };
}
