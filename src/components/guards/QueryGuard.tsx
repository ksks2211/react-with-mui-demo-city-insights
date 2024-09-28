import { UseQueryResult } from "@tanstack/react-query";
import ErrorFallback from "pages/ErrorFallbackPage";

type QueryHandlerProps1<D, E extends Error> = {
  query: UseQueryResult<D, E>;
  children: React.FC<{ data: D }>;
};

type QueryHandlerProps2<D, E extends Error> = {
  query: UseQueryResult<D, E>;
  Component: React.FC<{ data: D }>;
};

type QueryHandlerProps<D, E extends Error> =
  | QueryHandlerProps1<D, E>
  | QueryHandlerProps2<D, E>;

export default function QueryGuard<D, E extends Error>({
  query,
  ...rest
}: QueryHandlerProps<D, E>) {
  const { isLoading, error, data, refetch } = query;
  if (isLoading) return <div>Loading...</div>;
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

  if ("children" in rest) {
    return rest.children({ data });
  }

  return <rest.Component data={data} />;
}
