export function rand(max, min=0) {
  return Math.floor(Math.random() * max) + min;
}

export function randBool() {
  return rand(2) === 1;
}

export function randItem(array) {
  return array[rand(array.length)];
}
