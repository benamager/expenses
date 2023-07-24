import { motion } from "framer-motion";
import { useContext, useState } from "react";
import SettingsContext from "@/contexts/Settings";
import Button from "@/components/Button";

// custom hook to handle popup modals
export default function usePopup({ title, text, confirmText, confirmType, cancelText, cancelType, confirmHandler }) {
  const { settings } = useContext(SettingsContext); // get settings from context
  const [isPopupOpen, setIsPopupOpen] = useState(false); // state for whether the modal is open or not

  // set isPopupOpen to false when clicking outside of the modal (on the fixed overlay)
  function handleOutsideClick(e) {
    if (e.target.classList.contains("fixed")) {
      setIsPopupOpen(false);
    }
  }

  // function to open the popup
  function triggerPopup() {
    setIsPopupOpen(true);
  }

  const bounceAnimation = {
    initial: { scale: 0 },
    animate: {
      scale: [0.5, 1.1, 1],
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      },
    },
    exit: { scale: 0 },
  };

  // Inside your component
  const animationProps = settings?.enableAnimations ? bounceAnimation : {};

  // JSX for the popup, only if isPopupOpen is true otherwise return null
  const popupJSX = isPopupOpen ? (
    <div onClick={handleOutsideClick} className="z-50 fixed top-0 right-0 bottom-0 left-0 bg-[#00000030] flex transition-colors justify-center">
      <motion.div key={isPopupOpen} {...animationProps} className="w-[90%] bg-white self-center rounded-xl flex px-4 flex-col shadow-md max-w-sm py-4">
        <h3 className="text-lg text-center mb-1 font-medium">{title}</h3>
        <p className="text-center text-sm mb-4">{text}</p>
        <div className="flex justify-between mt-2 w-full">
          {cancelText ? <Button className="w-full mr-4" type={cancelType ? cancelType : cancelType} text={cancelText} clickHandler={() => setIsPopupOpen(false)} /> : null}
          {confirmText ? <Button className="w-full" text={confirmText} clickHandler={confirmHandler ? confirmHandler : null} type={confirmType ? confirmType : "primary"} /> : null}
        </div>
      </motion.div>
    </div>
  ) : null;

  return { popupJSX, triggerPopup };
}
