import { type RefObject, useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  setIsOpen: (value: boolean) => void,
  toggleRef?: RefObject<HTMLElement>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toggleRef?.current &&
        toggleRef.current.contains(event.target as Node)
      ) {
        return;
      }
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, setIsOpen, toggleRef]);
};
