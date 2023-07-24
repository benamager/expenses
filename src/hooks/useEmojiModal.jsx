/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useState } from "react";
import { motion } from "framer-motion";
import SettingsContext from "@/contexts/Settings";
import EmojiPicker from "emoji-picker-react";

export default function useEmojiModal() {
  const { settings } = useState(SettingsContext);
  const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  // CSS to tweak the emoji picker to our needs
  const style = css`
    aside.EmojiPickerReact.epr-main {
      max-width: 672px !important;
      margin: 8px auto;
      border-width: 0 !important;
      .epr-preview {
        display: none !important;
      }
      ul.epr-emoji-list li:first-of-type {
        display: none !important;
      }
      .epr-category-nav button:first-of-type {
        display: none !important;
      }
    }
  `;

  // close modal when clicking outside of it
  function handleOutsideClick(e) {
    if (e.target.classList.contains("fixed")) {
      setIsEmojiModalOpen(false);
    }
  }

  // select emoji and close modal
  function selectEmoji(emojiObject) {
    setIsEmojiModalOpen(false);
    setSelectedEmoji(emojiObject.target.src);
  }

  const animationProps = settings?.enableAnimations ? { initial: { opacity: 0, y: "30vw" }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: "-30vw" } } : {};

  // JSX for modal
  const emojiModal = isEmojiModalOpen && (
    <div onClick={handleOutsideClick} className="z-20 fixed top-0 right-0 bottom-0 left-0 bg-[#00000030] flex transition-colors justify-center">
      <motion.div css={style} key={isEmojiModalOpen} {...animationProps} className="w-full bg-white self-end mx-2 mb-5 pb-2 rounded-xl flex flex-col shadow-md max-w-2xl">
        <div className="w-full text-center px-2 text-slate-500 py-2">Selecting icon</div>
        <EmojiPicker autoFocusSearch={false} suggestedEmojisMode={false} width="100%" skinTonesDisabled={true} onEmojiClick={(e, emojiObject) => selectEmoji(emojiObject)} />
      </motion.div>
    </div>
  );

  // return the modal and the state setter function
  return { emojiModal, setIsEmojiModalOpen, isEmojiModalOpen, selectedEmoji, setSelectedEmoji };
}
