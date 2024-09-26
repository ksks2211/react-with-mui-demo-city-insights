import { changeObjectKey } from "@utils/arrayUtils";

test("test arrayUtils", () => {
  const data = [
    { year: 2000, population: 100 },
    { year: 2001, population: 200 },
  ];

  const changedArr = changeObjectKey(data, "population", "pop");

  console.log(changedArr);
});
