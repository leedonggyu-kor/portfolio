export const splitToSpans = (text: string) =>
  text.split(' ').map((word, index, arr) => ({
    key: `${word}-${index}`,
    value: `${word}${index < arr.length - 1 ? ' ' : ''}`
  }));
