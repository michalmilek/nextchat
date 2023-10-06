export function moveElementToStart(arr: any[], index: number) {
  if (index < 0 || index >= arr.length) {
    console.error("Invalid index");
    return;
  }

  const element = arr.splice(index, 1)[0];
  arr.unshift(element);

  return arr;
}
