export const last = (list) => {
  if (Array.isArray(list)) {
    const array = [...list];
    // const array = new Array(...list);
    return array[array.length - 1];
  }
  return undefined;
};
