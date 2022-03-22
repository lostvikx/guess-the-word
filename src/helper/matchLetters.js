/**
 * matchLetters takes two arguments.
 * The return value is an object of with properties of exact and includes that match.
 * @param {string} word - variable metaWord
 * @param {string} guess - variable guessWord
 * @return {[object]} - indices of match letters
 */
export default function matchLetters(word, guess) {

  console.assert(word.length === guess.length);

  const matches = {
    exact: [],
    contains: []
  };

  let iter = 0;
  while (iter < word.length) {

    // exact match (green)
    if (word[iter] === guess[iter]) {
      matches.exact.push(iter);
    }

    iter++;
  }

  iter = 0;
  while (iter < word.length) {

    // contains (yellow)
    // if (word.includes(guess[iter]) && !lettersDone.includes(guess[iter])) {
    //   matches.contains.push(iter);
    //   lettersDone.push(guess[iter]);
    // }

    // let j = 0;
    // while (j < guess.length) {
    //   if (word[j] === guess[iter]) {
    //     if (!matches.contains.includes(iter)) {
    //       matches.contains.push(iter);
    //       wordArr.splice(j, 1);
    //     }
    //   }
    //   j++;
    // }

    iter++;
  }

  return matches;

}