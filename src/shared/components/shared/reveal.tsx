interface RevealProps extends React.PropsWithChildren {
  delay: number;
}

const Reveal: React.FC<RevealProps> = ({ children, delay }) => {
  return (
    <div
      className={"opacity-0 animate-reveal"}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
