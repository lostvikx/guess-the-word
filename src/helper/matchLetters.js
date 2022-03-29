/**
 * matchLetters takes two arguments.
 * The return value is an object of with properties of exact and includes that match.
 * @param {string} word - variable metaWord
 * @param {string} guess - variable guessWord
 * @return {[object]} - indices of match letters
 */
export default function matchLetters(word, guess) {

  console.assert(word.length === guess.length, "word length != guess word length");

  const letterFrequency = {};
  for (const letter of word) {
    letterFrequency[letter] = (letterFrequency[letter]) 
      ? letterFrequency[letter] + 1 
      : 1;
  }

  // console.log("letter frequency:", letterFrequency);

  const matches = {
    exact: [],
    contains: []
  };

  let i = 0;
  while (i < word.length) {

    const exactMatch = word[i] === guess[i];
    const canGuess = letterFrequency[guess[i]] > 0;

    // exact match (green)
    if (exactMatch && canGuess) {
      matches.exact.push(i);
      letterFrequency[guess[i]]--;
    }

    // contains match (yellow)
    if (!exactMatch && canGuess) {
      matches.contains.push(i);
      letterFrequency[guess[i]]--;
    }

    // If found an exact match after the user has exhausted the frequency of that letter (already guessed it).
    // From the matches.contains array, we only remove the value that was exhausted and exactMatch was found.
    if (exactMatch && !canGuess) {
      const newExact = [];
      const newContains = [];

      // console.log("matches.contains:", matches.contains);

      if (!matches.contains.includes(i) && !newExact.includes(i)) {
        newExact.push(i);
      }

      for (let j = 0; j < matches.contains.length; j++) {
        if (guess[j] !== guess[i]) {
          newContains.push(j);
        }
      }

      // console.log("newExact arr to concat:", newExact);
      matches.exact.push(...newExact);
      matches.contains = newContains;
    }

    i++;
  }

  return matches;

}

// console.log(matchLetters("joker", "oajer"));