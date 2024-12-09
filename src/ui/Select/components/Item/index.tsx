import { Option } from "@/types/select";
import styles from "./style.module.css";
import { Circle } from "@/ui/Circle";

type Props = {
  option: Option;
  handleSelect(val: Option): void;
  isSelected: boolean;
};

export const Item = ({ option, handleSelect, isSelected }: Props) => {
  const className = isSelected ? styles.selected : "";

  return (
    <div
      className={`${styles.item} ${className}`}
      onClick={() => handleSelect(option)}
    >
      <Circle word={option.title} />
      {option.title}
    </div>
  );
};
