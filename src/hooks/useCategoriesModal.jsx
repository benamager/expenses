import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const temp_categories = [
  {
    id: 1,
    name: "Food",
    icon: "🍔",
  },
  {
    id: 2,
    name: "Groceries",
    icon: "🥑",
  },
];

export default function useCategoriesModal() {
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  // JSX for modal
  const categoriesModal = isCategoriesModalOpen && (
    <div onClick={handleOutsideClick} className="z-10 absolute top-0 right-0 bottom-0 left-0 bg-[#00000070] flex">
      <div className="w-full bg-white self-end m-2 rounded-xl flex flex-col">
        <div className="grid grid-cols-3 w-full items-center px-2 mb-4">
          <span></span>
          <span className="justify-self-center text-slate-500">Categories</span>
          <span onClick={() => alert("Isn't implemented yet...")} className="justify-self-end text-slate-500">
            <FaPlus size="18" className="p-3 box-content" />
          </span>
        </div>
        <ul className="grid grid-cols-3 text-center h-[300px] mx-2 gap-2 overflow-y-scroll mb-2">
          {temp_categories.map((category) => (
            <li key={category.id} onClick={() => selectCategory(category)} className="flex flex-col self-start active:bg-slate-100 rounded-md py-4 px-2 select-none">
              <span className="text-3xl mb-2 text-slate-500">{category.icon}</span>
              <span className="text-sm truncate capitalize">{category.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // return the modal and the state setter function
  return { categoriesModal, selectedCategory, setIsCategoriesModalOpen };
}
