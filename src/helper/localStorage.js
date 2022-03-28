function getLocalData(key) {
  console.log("data stored in localStorage");
  const wordList = localStorage.getItem(key);
  if (wordList === null) return null;
  else {
    return JSON.parse(wordList);
  }
}

function setLocalData(key, value) {
  console.log("setting data to localStorage...");
  localStorage.setItem(key, JSON.stringify(value));
}

export { getLocalData, setLocalData };