type SquareWrapperProps = {
  size: string; // '100px', '50%' 등 크기 값
};

function withSquareWrapper<P extends object>(
  Component: React.ComponentType<P>
) {
  return ({
    size,
    ...props
  }: SquareWrapperProps & Omit<P, keyof SquareWrapperProps>) => {
    const squareStyle: React.CSSProperties = {
      width: size,
      aspectRatio: "1 / 1",
    };

    return (
      <div style={squareStyle}>
        <Component {...(props as P)} />
      </div>
    );
  };
}

export default withSquareWrapper;
