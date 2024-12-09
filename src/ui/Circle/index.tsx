import styles from "./style.module.css";

export const Circle = ({ word }: { word: string }) => {
  const firstLetter = word[0];
  return <div className={styles.circle}>{firstLetter}</div>;
};
