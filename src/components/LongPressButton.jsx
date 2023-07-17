import { useState, useEffect } from "react";

export default function LongPressButton({ onLongPress, onClick, children, ...props }) {
  const [pressTimer, setPressTimer] = useState(null);

  const startPress = () => {
    const timerId = setTimeout(onLongPress, 500); // Long press detection after 1 second
    setPressTimer(timerId);
  };

  const cancelPress = () => {
    clearTimeout(pressTimer);
    setPressTimer(null);
  };

  // Ensure timer is cleaned up if the component is unmounted while timer is running
  useEffect(() => {
    return () => clearTimeout(pressTimer);
  }, [pressTimer]);

  return (
    <button {...props} onMouseDown={startPress} onMouseUp={cancelPress} onMouseLeave={cancelPress} onTouchStart={startPress} onTouchEnd={cancelPress} onClick={onClick}>
      {children}
    </button>
  );
}
