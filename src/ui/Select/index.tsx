import { useCallback, useRef, useState } from "react";
import styles from "./style.module.css";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Item } from "./components/Item";
import { Option } from "@/types/select";
import { Arrow } from "../icons/Arrow";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

type Props = {
  onSelect?: (val: Option) => void;
  options: Option[];
  onScroll: () => void;
  placeholder?: string;
  totalOptions?: number;
};

export const Select = ({
  options,
  onSelect,
  onScroll,
  placeholder = "Please Select",
  totalOptions,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLDivElement | null>(null);

  const { setTarget } = useInfiniteScroll({
    onIntersect: onScroll,
    threshold: 0.1,
    root: ref.current,
    shouldStop: options.length === totalOptions,
  });

  useClickOutside(ref, setIsOpen, toggleRef);

  const handleSelect = useCallback(
    (option: Option) => {
      if (selectedOption?.id !== option.id) {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect?.(option);
      }
    },
    [onSelect, selectedOption]
  );

  return (
    <div className={styles.select}>
      <div
        className={styles["select-button"]}
        onClick={() => setIsOpen((prev) => !prev)}
        ref={toggleRef}
      >
        <div className={`${styles.title} ${isOpen ? styles.opened : ""}`}>
          {!selectedOption ? placeholder : selectedOption.title}
          <Arrow open={isOpen} />
        </div>
      </div>
      {isOpen && (
        <div className={styles.menu} ref={ref}>
          <div className={styles["menu-content"]}>
            {options.length > 0 ? (
              options.map((option, index) => {
                const isSelected = option.id === selectedOption?.id;
                const isLast = index === options.length - 1;

                return (
                  <div key={option.id} ref={isLast ? setTarget : null}>
                    <Item
                      option={option}
                      handleSelect={handleSelect}
                      isSelected={isSelected}
                    />
                  </div>
                );
              })
            ) : (
              <div className={styles["not-found"]}>Nothing has been found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
