export function range(start = 0, end, step = 1) {
  const array = [];
  if (arguments.length === 1) {
    end = start;
    start = 0;
  }
  let item = start;

  if (step !== 0) {
    if (end > 0) {
      while (item < end) {
        array.push(item);
        item += step;
      }
    } else {
      while (item > end) {
        array.push(item);
        item -= step;
      }
    }
  } else {
    const length = Math.abs(end - start);
    for (let j = 0; j < length; j++) {
      array.push(step);
    }
  }

  return array;
}
