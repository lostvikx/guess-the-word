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

  console.log(letterFrequency);

  const matches = {
    exact: [],
    contains: []
  };

  let i = 0;
  while (i < word.length) {

    // exact match (green)
    if (word[i] === guess[i]) {
      matches.exact.push(i);

      if (letterFrequency[word[i]] > 0) {
        letterFrequency[word[i]] = letterFrequency[word[i]] - 1
      }
    }

    i++;
  }

  // i = 0;
  // while (i < word.length) {

  //   i++;
  // }

  return matches;

}