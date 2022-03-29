function getFrequencyObj(str) {
  const frequencyObj = {};
  for (const letter of str) {
    frequencyObj[letter] = (frequencyObj[letter])
      ? frequencyObj[letter] + 1
      : 1;
  }
  return frequencyObj;
}

function makeArrayWithBlankString(num) {
  const arr = [];
  let i = 0;
  while (i < num) {
    arr.push("");
    i++;
  }
  return arr;
}

function getRandomFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export { makeArrayWithBlankString, getRandomFromArray, getFrequencyObj };