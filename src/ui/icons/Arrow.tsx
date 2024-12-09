export const Arrow = ({ open = false }: { open?: boolean }) => {
  const defaultStyle = {
    transition: "transform 0.2s ease",
    transform: "rotate(180deg)",
  };

  const rotateStyle = {
    transform: "rotate(0)",
  };

  const combinedStyle = !open
    ? { ...defaultStyle, ...rotateStyle }
    : defaultStyle;
  return (
    <svg
      style={combinedStyle}
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
    >
      <path
        d="M9 5.35938L5 1.35937L1 5.35937"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.2"
      />
    </svg>
  );
};
