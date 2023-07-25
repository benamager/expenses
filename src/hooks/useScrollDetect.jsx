import { useState, useEffect, useRef } from "react";

export default function useScrollDetect() {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollingRef = useRef(null);

  useEffect(() => {
    let scrollingTimeout;
    const handleScrollEnd = () => {
      setIsScrolling(false);
    };

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollingTimeout);
      scrollingTimeout = setTimeout(() => handleScrollEnd(), 250);
    };

    const elem = scrollingRef.current;
    if (elem) {
      elem.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (elem) {
        elem.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return { isScrolling, scrollingRef };
}
