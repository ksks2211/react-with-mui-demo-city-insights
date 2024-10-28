import { UseQueryResult } from "@tanstack/react-query";
import LoadingBox from "components/presentational/LoadingBox";
import WarningBox from "components/presentational/WarningBox";

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
    return (
      <WarningBox message="API Query Failed!" error={error} reset={refetch} />
    );
  if (data === undefined) {
    return (
      <WarningBox
        message="API Query Failed!"
        error={new Error("Not Found")}
        reset={refetch}
      />
    );
  }

  return <Component data={data} {...(rest as P)} />;
}
