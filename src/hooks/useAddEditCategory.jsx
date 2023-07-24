import { nanoid } from "nanoid";
import { useState, useContext } from "react";
import CategoriesContext from "@/contexts/Categories";
import SettingsContext from "@/contexts/Settings";
import useEmojiModal from "./useEmojiModal";
import Button from "@/components/Button";
import useInput from "./useInput";
import { motion } from "framer-motion";
import usePopup from "@/hooks/usePopup";

export default function useAddEditCategory(selectedCategory, selectCategory, setSelectedCategory, quickMode = false, setIsCategoriesModalOpen) {
  const { categories, setCategories } = useContext(CategoriesContext);
  const { settings } = useContext(SettingsContext);
  const { emojiModal, setIsEmojiModalOpen, isEmojiModalOpen, selectedEmoji, setSelectedEmoji } = useEmojiModal();

  // handle popups
  const [popupData, setPopupData] = useState({
    title: "",
    text: "",
  });
  const { popupJSX, triggerPopup } = usePopup({ title: popupData.title, text: popupData.text, cancelText: "Affirmative", cancelType: "primary" });

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // close modal when clicking outside of it
  function handleOutsideClick(e) {
    if (e.target.classList.contains("fixed")) {
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
    iconUrl: selectedEmoji ? selectedEmoji : selectedCategory && selectedCategory.iconUrl,
  };

  function validateCategory(category) {
    if (category.name.length == 0) {
      setPopupData({ title: "No category name", text: "Please enter a name for your category." });
      triggerPopup();
      return false;
    }

    // category name cant be too long
    if (category.name.length > 20) {
      setPopupData({ title: "Category name is too long", text: "Please enter a shorter name for your category." });
      triggerPopup();
      return false;
    }

    if (!category.iconUrl) {
      setPopupData({ title: "Category icon is empty", text: "Please select an icon for your category." });
      triggerPopup();
      return false;
    }

    return true;
  }

  // add category
  function addCategory(category) {
    if (!validateCategory(category)) return;

    setCategories([category, ...categories]);
    selectCategory(category);
    setIsCategoryModalOpen(false);
    setSelectedEmoji(null);
    if (quickMode) {
      setIsCategoriesModalOpen(true);
      return;
    }
  }

  // edit category
  function editCategory(category) {
    if (!validateCategory(category)) return;

    const newCategories = categories.map((c) => {
      if (c.id === category.id) {
        return categoryObject;
      }
      return c;
    });

    const index = newCategories.findIndex((c) => c.id === categoryObject.id);

    if (index !== -1) {
      const updatedCategory = newCategories.splice(index, 1)[0];
      newCategories.unshift(updatedCategory);
    }

    setCategories(newCategories);
    setIsCategoryModalOpen(false);
    selectCategory(category);
    setSelectedEmoji(null);
    if (quickMode) {
      setIsCategoriesModalOpen(true);
      return;
    }
  }

  // delete category
  function deleteCategory(categoryId) {
    const newCategories = categories.filter((c) => c.id !== categoryId);
    setCategories(newCategories);
    setSelectedCategory(null);
    setIsCategoryModalOpen(false);
  }

  const animationProps = settings?.enableAnimations ? { initial: { opacity: 0, y: "30vw" }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: "-30vw" } } : {};

  // JSX for modal
  const categoryModal = isCategoryModalOpen && (
    <div onClick={handleOutsideClick} className="z-10 fixed top-0 right-0 bottom-0 left-0 bg-[#00000030] flex transition-colors justify-center">
      {popupJSX}
      <motion.div key={isCategoryModalOpen} {...animationProps} className="w-full bg-white self-end mx-2 mb-5 pb-2 rounded-xl flex flex-col shadow-md max-w-2xl">
        <div className="w-full text-center px-2 mb-4 text-slate-500 py-2">{selectedCategory ? "Editing category" : "Adding category"}</div>
        <div className="flex flex-col mx-4 mb-2">
          <div className="flex justify-between text-sm text-slate-500 mb-1">
            <span>Name</span>
            <span>Icon</span>
          </div>
          <div className="w-full mb-7 flex justify-between items-center">
            <div className="relative mr-2">
              {selectedEmoji ? (
                <img id="emojiIcon" className="w-6 h-6 absolute right-2 top-2.5" src={selectedEmoji} alt="Image of emoji" draggable="false" />
              ) : (
                selectedCategory && <img id="emojiIcon" className="w-6 h-6 absolute right-2 top-2.5" src={selectedCategory.iconUrl} alt="Image of emoji" draggable="false" />
              )}
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
