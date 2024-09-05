export const coordToIndex = (x, y, width) => {
  return x + y * (width + 1);
};

export const indexToCoord = (i, width) => {
  return [i % (width + 1), Math.floor(i / (width + 1))];
};
