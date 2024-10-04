import { findRegionByCity } from "@utils/arrayUtils";
import {
  toKebabCase,
  toPascalCase,
  toSnakeCase,
  toTitleCase,
  validateUserId,
} from "@utils/stringUtils";
// import { expect, test } from "vitest";

test("test validateUserId function", () => {
  const isValid = validateUserId("example123");

  expect(isValid).toBe(true);
});

test("test text case switching", () => {
  const camelCase = "camelCase";

  const snakeCase = toSnakeCase(camelCase);
  const kebabCase = toKebabCase(camelCase);
  const pascalCase = toPascalCase(camelCase);
  const titleCase = toTitleCase(camelCase);

  expect(snakeCase).toBe("camel_case");
  expect(kebabCase).toBe("camel-case");
  expect(pascalCase).toBe("CamelCase");
  expect(titleCase).toBe("Camel Case");
});

test("test find Region name with City name", () => {
  let region = findRegionByCity("tokyo");

  expect(region).toBe("east-asia");

  region = findRegionByCity("london");

  expect(region).toBe("europe");

  region = findRegionByCity("not-registered");

  expect(region).toBeNull();
});
