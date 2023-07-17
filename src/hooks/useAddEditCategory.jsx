import { nanoid } from "nanoid";
import { useState, useContext } from "react";
import CategoriesContext from "../contexts/Categories";
import Button from "@/components/Button";
import useInput from "./useInput";

export default function useAddEditCategory(selectedCategory, selectCategory, setSelectedCategory) {
  const { categories, setCategories } = useContext(CategoriesContext);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // close modal when clicking outside of it
  function handleOutsideClick(e) {
    if (e.target.classList.contains("absolute")) {
      setIsCategoryModalOpen(false);
      // clear selected category
      if (selectedCategory) {
        setSelectedCategory(null);
      }
    }
  }

  const { input: nameInput, inputValue: nameInputValue } = useInput({
    placeholder: "Category name...",
    className: "w-[80%] p-2 border border-black rounded-md outline-none",
    defaultValue: selectedCategory ? selectedCategory.name : "",
  });
  const { input: iconInput, inputValue: iconInputValue } = useInput({ placeholder: "🥑", className: "w-[15%] p-2 border border-black rounded-md outline-none text-center", defaultValue: selectedCategory ? selectedCategory.icon : "" });

  const categoryObject = {
    id: selectedCategory ? selectedCategory.id : nanoid(),
    name: nameInputValue,
    icon: iconInputValue.length < 1 ? "🫙" : iconInputValue,
  };

  // add category
  function addCategory(category) {
    if (category.name.length < 3) {
      alert("Category name must be at least 3 characters long");
      return;
    }

    setCategories([category, ...categories]);
    selectCategory(category);
    setIsCategoryModalOpen(false);
  }

  // edit category
  function editCategory(category) {
    if (category.name.length < 3) {
      alert("Category name must be at least 3 characters long");
      return;
    }

    const newCategories = categories.map((c) => {
      if (c.id === category.id) {
        return categoryObject;
      }
      return c;
    });
    setCategories(newCategories);
    setIsCategoryModalOpen(false);
  }

  // delete category
  function deleteCategory(categoryId) {
    const newCategories = categories.filter((c) => c.id !== categoryId);
    setCategories(newCategories);
    setSelectedCategory(null);
    setIsCategoryModalOpen(false);
  }

  // JSX for modal
  const categoryModal = isCategoryModalOpen && (
    <div onClick={handleOutsideClick} className="z-10 absolute top-0 right-0 bottom-0 left-0 bg-[#00000070] flex">
      <div className="w-full bg-white self-end mx-2 mb-4 rounded-xl flex flex-col">
        <div className="w-full text-center px-2 mb-4 text-slate-500 py-2">{selectedCategory ? "Editing category" : "Adding category"}</div>
        <div className="flex flex-col mx-4 mb-2">
          <div className="flex justify-between text-sm text-slate-500 mb-1">
            <span>Name</span>
            <span>Icon</span>
          </div>
          <div className="w-full mb-7 flex justify-between">
            {nameInput}
            {iconInput}
          </div>
          <div className={`flex justify-between ${selectedCategory && "mb-11"}`}>
            <Button className="text-sm self-start" type="secondary" text="Cancel" clickHandler={() => setIsCategoryModalOpen(false)} />
            <Button className="text-sm self-start" type="primary" text={selectedCategory ? "Save changes" : "Add category"} clickHandler={() => (selectedCategory ? editCategory(categoryObject) : addCategory(categoryObject))} />
          </div>
          {selectedCategory && <Button className="text-sm bg-red-400 w-full" text="Delete category" clickHandler={() => deleteCategory(selectedCategory.id)} />}
        </div>
      </div>
    </div>
  );

  // return the modal and the state setter function
  return { categoryModal, setIsCategoryModalOpen };
}
