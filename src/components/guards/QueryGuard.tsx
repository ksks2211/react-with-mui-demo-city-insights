import { UseQueryResult } from "@tanstack/react-query";
import LoadingBox from "components/presentational/LoadingBox";
import ErrorFallback from "pages/ErrorFallbackPage";

type AnyProps = {
  [key: string]: unknown;
};

type QueryHandlerProps<D, E extends Error, P = AnyProps> = {
  query: UseQueryResult<D, E>;
  Component: React.FC<{ data: D } & P>;
} & Omit<P, "data">;

export default function QueryGuard<D, E extends Error, P = AnyProps>({
  query,
  Component,
  ...rest
}: QueryHandlerProps<D, E, P>) {
  const { isLoading, error, data, refetch } = query;
  if (isLoading) return <LoadingBox />;
  if (error)
    return <ErrorFallback error={error} resetErrorBoundary={refetch} />;
  if (data === undefined) {
    return (
      <ErrorFallback
        error={new Error("Not Found")}
        resetErrorBoundary={refetch}
      />
    );
  }

  return <Component data={data} {...(rest as P)} />;
}
