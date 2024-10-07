import type { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  let msg = "No Message";
  let name = "No name";
  if (error instanceof Error) {
    msg = error.message;

    name = error.name;
  }

  console.log(resetErrorBoundary);
  return (
    <div role="alert">
      <h1>{msg}</h1>
      <pre>{name}</pre>

      <button onClick={resetErrorBoundary}>reset</button>
    </div>
  );
}
