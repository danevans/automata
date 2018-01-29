export function rand(max, min=0) {
  return Math.floor(Math.random() * max) + min;
}

export function randBool() {
  return randItem([true, false]);
}

export function randItem(array) {
  return array[rand(array.length)];
}
