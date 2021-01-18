export function shuffleArray<T>(array: T[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
export function getRandArray(length: number) {
  return shuffleArray([...Array(length).keys()]);
}
export function randCode() {
  return (Math.floor(Math.random() * 90000) + 10000).toString();
}
