type DataType<T> = {
  [key: string]: Array<T>;
};

// T는 적어도 'field'를 가지는 객체임을 보장
export function findKeysByField<T extends { [key: string]: unknown }>(
  data: DataType<T>,
  field: keyof T,
  value: T[keyof T]
): string[] {
  const result: string[] = [];

  for (const key in data) {
    // 해당 키의 리스트에서 필드 값이 일치하는 항목 찾기
    const item = data[key].find((entry) => entry[field] === value);
    if (item) {
      result.push(key); // 일치하는 키를 결과에 추가
    }
  }

  return result; // 결과 배열 반환
}
