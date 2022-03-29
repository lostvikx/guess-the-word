function getFrequencyObj(str) {
  const frequencyObj = {};
  for (const letter of str) {
    frequencyObj[letter] = (frequencyObj[letter])
      ? frequencyObj[letter] + 1
      : 1;
  }
  return frequencyObj;
}

/**
 * matchLetters takes two arguments.
 * The return value is an object of with properties of exact and includes that match.
 * @param {string} word - variable metaWord
 * @param {string} guess - variable guessWord
 * @return {[object]} indices of match letters
 */
export default function matchLetters(word, guess) {

  console.assert(word.length === guess.length, "word length != guess word length");

  const wordFrequency = getFrequencyObj(word);

  console.log("letter frequency:", wordFrequency);

  const matches = {
    exact: [],
    contains: []
  };

  let i = 0;
  while (i < guess.length) {

    const exactMatch = word[i] === guess[i];
    const canGuess = wordFrequency[guess[i]] > 0;

    // exact match (green)
    if (exactMatch && canGuess) {
      matches.exact.push(i);
      wordFrequency[guess[i]]--;
    }

    // contains match (yellow)
    if (!exactMatch && canGuess) {
      matches.contains.push(i);
      wordFrequency[guess[i]]--;
    }

    // If found an exact match after the user has exhausted the frequency of that letter (already guessed it).
    // From the matches.contains array, we only remove the value that was exhausted and exactMatch was found.
    if (exactMatch && !canGuess) {

      const newExact = [];
      const newContains = [];

      console.log(i);
      // matches.contains.includes(i) && console.log("i in contains");

      let indexToBeTransferedToExact = null;

      for (const index of matches.contains) {
        if (guess[index] === guess[i]) {
          console.log(index, "==", i);
          indexToBeTransferedToExact = index;
        }
      }

      console.log("contains:", matches.contains, "exact:", matches.exact);

      matches.contains = matches.contains.filter(num => num !== indexToBeTransferedToExact);

      console.log("contains:", matches.contains, "exact:", matches.exact);

      matches.exact.push(i);

      console.log("newExact arr to concat:", newExact);
      console.log("newContains arr to concat:", newContains);

    }

    i++;
  }

  console.log("updated letter frequency:", wordFrequency);

  return matches;

}

// console.log(matchLetters("btckaskith", "baknabkgtt"));