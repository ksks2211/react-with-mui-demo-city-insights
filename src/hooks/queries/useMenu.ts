import { useQuery } from "@tanstack/react-query";
import { getMenu } from "api/services";
import { sortBy } from "lodash-es";
import type { Menu } from "shared/types";

function sortMenuData(data: Menu) {
  const sortedData = sortBy(data, "title").map((obj) => {
    return {
      ...obj,
      items: sortBy(obj.items, "title"),
    };
  });

  return sortedData;
}

export function useGetMenu() {
  return useQuery<Menu, Error>({
    queryKey: ["menu"],
    queryFn: getMenu,
    select: sortMenuData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
