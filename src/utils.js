export const humanize = x => {
  return x.toFixed(2).replace(/\.?0*$/, '');
};

export const sum = list => {
  const add = (x, y) => x + y;
  return list.reduce(add, 0);
};
