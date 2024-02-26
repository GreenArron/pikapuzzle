function normalize(any) {
  return any.toString().replaceAll(" ", "");
}

function randomItems(arr, count, ...exclude) {
  arr = [...arr];
  const items = [];
  let randIndex;
  while (items.length < count && arr.length > 0) {
    do {
      randIndex = Math.floor(Math.random() * arr.length);
    } while (exclude.includes(arr[randIndex]));
    items.push(arr[randIndex]);
    arr.splice(randIndex, 1);
  }

  return items;
}

export { normalize, randomItems };
