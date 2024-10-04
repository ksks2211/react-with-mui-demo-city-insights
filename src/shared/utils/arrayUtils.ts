import { getMenuData } from "components/tmp/data";
import { omit } from "lodash-es";

export function changeObjectKey<T extends { [key: string]: unknown }>(
  arr: T[],
  originalName: string,
  changedName: string
) {
  return arr.map((item) =>
    omit(
      {
        ...item,
        [changedName]: item[originalName],
      },
      [originalName]
    )
  );
}

export function findRegionByCity(name: string) {
  const data = getMenuData();
  for (const region of data) {
    for (const city of region.items) {
      if (city.title === name) {
        return region.title;
      }
    }
  }
  return null;
}
