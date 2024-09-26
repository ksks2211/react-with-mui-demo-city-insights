export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export function extractStartAndEnd(arr: number[]) {
  if (arr.length === 0) {
    throw new Error("Array is empty");
  }
  arr.sort();
  return { startAt: arr[0], endAt: arr[arr.length - 1] };
}
