import { nanoid } from "nanoid";
import { useState, useContext } from "react";
import CategoriesContext from "@/contexts/Categories";
import useEmojiModal from "./useEmojiModal";
import Button from "@/components/Button";
import useInput from "./useInput";
import { motion } from "framer-motion";

export default function useAddEditCategory(selectedCategory, selectCategory, setSelectedCategory) {
  const { categories, setCategories } = useContext(CategoriesContext);
  const { emojiModal, setIsEmojiModalOpen, isEmojiModalOpen, selectedEmoji, setSelectedEmoji } = useEmojiModal();

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // close modal when clicking outside of it
  function handleOutsideClick(e) {
    if (e.target.classList.contains("absolute")) {
      if (e.target.id == "emojiIcon") return;
      setIsCategoryModalOpen(false);
      // clear selected category
      if (selectedCategory) {
        setSelectedCategory(null);
      }
      setSelectedEmoji(null);
    }
  }

  const { input: nameInput, inputValue: nameInputValue } = useInput({
    placeholder: "Category name...",
    className: "w-full p-2 pr-9 border border-black rounded-md outline-none",
    defaultValue: selectedCategory ? selectedCategory.name : "",
  });

  const categoryObject = {
    id: selectedCategory ? selectedCategory.id : nanoid(),
    name: nameInputValue,
    iconUrl: selectedEmoji,
  };

  // add category
  function addCategory(category) {
    if (category.name.length < 3) {
      alert("Category name must be at least 3 characters long");
      return;
    }

    if (!category.iconUrl) {
      alert("Please select an icon");
      return;
    }

    setCategories([category, ...categories]);
    selectCategory(category);
    setSelectedEmoji(null);
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
    <div onClick={handleOutsideClick} className="z-10 absolute top-0 right-0 bottom-0 left-0 bg-[#00000030] flex transition-colors">
      <motion.div key={isCategoryModalOpen} initial={{ opacity: 0, y: "30vw" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "-30vw" }} className="w-full bg-white self-end mx-2 mb-5 pb-2 rounded-xl flex flex-col shadow-md">
        <div className="w-full text-center px-2 mb-4 text-slate-500 py-2">{selectedCategory ? "Editing category" : "Adding category"}</div>
        <div className="flex flex-col mx-4 mb-2">
          <div className="flex justify-between text-sm text-slate-500 mb-1">
            <span>Name</span>
            <span>Icon</span>
          </div>
          <div className="w-full mb-7 flex justify-between items-center">
            <div className="relative mr-2">
              {selectedEmoji && <img id="emojiIcon" className="w-6 h-6 absolute right-2 top-2.5" src={selectedEmoji} alt="Image of emoji" />}
              {nameInput}
            </div>
            <Button className="text-sm whitespace-nowrap self-stretch" type="primary" text="Select icon" clickHandler={() => setIsEmojiModalOpen(true)} />
          </div>
          <div className={`flex justify-between ${selectedCategory && "mb-11"}`}>
            <Button className="text-sm self-start" type="secondary" text="Cancel" clickHandler={() => setIsCategoryModalOpen(false)} />
            <Button className="text-sm self-start" type="primary" text={selectedCategory ? "Save changes" : "Add category"} clickHandler={() => (selectedCategory ? editCategory(categoryObject) : addCategory(categoryObject))} />
          </div>
          {selectedCategory && <Button className="text-sm bg-red-400 w-full" text="Delete category" clickHandler={() => deleteCategory(selectedCategory.id)} />}
        </div>
      </motion.div>
    </div>
  );

  // return the modal and the state setter function
  return { categoryModal: isEmojiModalOpen ? emojiModal : categoryModal, setIsCategoryModalOpen };
}
