import { UseQueryResult } from "@tanstack/react-query";
import LoadingBox from "components/presentational/LoadingBox";
import ErrorFallback from "pages/ErrorFallbackPage";

type AnyButDataProps = {
  [key: string]: unknown;
  data: never;
};

type QueryHandlerProps<D, E, P> = {
  query: UseQueryResult<D, E>;
  Component: React.FC<{ data: D } & P>;
} & Omit<P, "data">;

export default function QueryGuard<
  D, // type of query result
  E extends Error = Error,
  P = AnyButDataProps // type of props other than data
>({ query, Component, ...rest }: QueryHandlerProps<D, E, P>) {
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
