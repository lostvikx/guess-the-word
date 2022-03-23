/**
 * matchLetters takes two arguments.
 * The return value is an object of with properties of exact and includes that match.
 * @param {string} word - variable metaWord
 * @param {string} guess - variable guessWord
 * @return {[object]} - indices of match letters
 */
export default function matchLetters(word, guess) {

  console.assert(word.length === guess.length);

  const letterFrequency = {};
  for (const letter of word) {
    letterFrequency[letter] = (letterFrequency[letter]) 
      ? letterFrequency[letter] + 1 
      : 1;
  }

  console.log("letter frequency:", letterFrequency);

  const matches = {
    exact: [],
    contains: []
  };

  let i = 0;
  while (i < word.length) {

    const exactMatch = word[i] === guess[i];
    const canGuess = letterFrequency[guess[i]] > 0;
    const frequencyIsZero = letterFrequency[guess[i]] === 0;

    // If found an exact match after the user has exhausted the frequency of that letter (already guessed it), remove that guess (index) from the matches.contains array.
    // 
    if (exactMatch && frequencyIsZero) {
      let countRemoved = 0;
      const newContains = [];

      console.log("matches.contains:", matches.contains);

      for (let j = 0; j < matches.contains.length; j++) {
        if (matches.contains[j] !== i && !newContains.includes(i)) {
          newContains.push(i);
        } else {
          countRemoved++;
        }
      }

      console.log("removed:", countRemoved);

      console.log("new contains arr:", newContains);

      matches.exact.push(...newContains);
      matches.exact.sort();
      // matches.contains = newContains;
      letterFrequency[guess[i]]+=countRemoved;
      // matches.exact.push(i);
    }

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

    i++;
  }

  return matches;

}