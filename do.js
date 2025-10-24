function add(a, b) {
  function getIt() {
    return a * 5;
  }
  return getIt() + b;
}

console.log(add(2, 3));
