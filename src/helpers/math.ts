export const tween = (min: number, max: number, value: number, minDomain: number = 0, maxDomain: number = 32) => {
  const domain = maxDomain - minDomain;
  return min + ((value / domain) * (max - min));
}