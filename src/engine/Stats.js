export function min(list) {
  return Math.min(...list);
}

export function max(list) {
  return Math.max(...list);
}

export function normalized(list) {

  const minValue = min(list);
  const maxValue = max(list);
  return list.map(value => (value-minValue)/((maxValue-minValue) || 1));
}

