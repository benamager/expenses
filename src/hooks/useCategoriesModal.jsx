import { useState, useContext } from "react";
import { FaPlus } from "react-icons/fa";
import CategoriesContext from "../contexts/Categories";
import useAddEditCategory from "./useAddEditCategory";
import SettingsContext from "@/contexts/Settings";
import LongPressButton from "@/components/LongPressButton";
import { motion } from "framer-motion";
import { BsFillInfoSquareFill } from "react-icons/bs";

export default function useCategoriesModal() {
  const { categories } = useContext(CategoriesContext);
  const { settings } = useContext(SettingsContext);

  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // add/edit category modal
  const { categoryModal, setIsCategoryModalOpen } = useAddEditCategory(selectedCategory, selectCategory, setSelectedCategory);

  // select category and close modal
  function selectCategory(category) {
    setSelectedCategory(category);
    setIsCategoriesModalOpen(false);
  }

  // close modal when clicking outside of it
  function handleOutsideClick(e) {
    if (e.target.classList.contains("absolute")) {
      setIsCategoriesModalOpen(false);
    }
  }

  // open add category modal
  function openAddCategory() {
    setSelectedCategory(null);
    setIsCategoryModalOpen(true);
  }

  // open add/edit category modal on long press
  function handleLongPress(category) {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  }

  const animationProps = settings.enableAnimations ? { initial: { opacity: 0, y: "30vw" }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: "-30vw" } } : {};

  // JSX for modal
  let categoriesModal = isCategoriesModalOpen && (
    <div onClick={handleOutsideClick} className="z-10 absolute top-0 right-0 bottom-0 left-0 bg-[#00000030] flex transition-colors">
      <motion.div {...animationProps} className="w-full bg-white self-end mx-2 mb-5 rounded-xl flex flex-col shadow-md">
        <div className="grid grid-cols-3 w-full items-center px-2 mb-4">
          <span></span>
          <span className="justify-self-center text-slate-500">Categories</span>
          <span onClick={() => openAddCategory()} className="justify-self-end text-slate-500">
            <FaPlus size="18" className="p-3 box-content" />
          </span>
        </div>
        {categories.length < 1 ? (
          <div className="text-center flex flex-col items-center mx-1 h-[300px]">
            <BsFillInfoSquareFill size="30px" className="mx-auto text-slate-300 mb-4 mt-[70px]" />
            <span className="text-lg mb-1">No categories</span>
            <span className="text-slate-500 font-light">Add some by pressing the plus icon</span>
          </div>
        ) : (
          <ul className="grid grid-cols-3 text-center h-[300px] mx-2 gap-2 overflow-y-scroll mb-2">
            {categories.map((category) => (
              <LongPressButton className="self-start" key={category.id} onClick={() => selectCategory(category)} onLongPress={() => handleLongPress(category)}>
                <li className="flex flex-col active:bg-slate-100 rounded-md py-4 px-2 select-none items-center">
                  <img className="w-8 h-8 mb-2" src={category?.iconUrl} alt="Image of emoji" />
                  <span className="text-sm truncate capitalize">{category.name}</span>
                </li>
              </LongPressButton>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
  // return the modal and the state setter function
  // return add/edit category modal instead, if that is opened
  return { categoriesModal: categoryModal ? categoryModal : categoriesModal, selectedCategory, setIsCategoriesModalOpen };
}
