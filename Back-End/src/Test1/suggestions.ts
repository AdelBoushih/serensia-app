/**
 *
 * @param term the given searched term
 * @param choices list of the given choices
 * @param numberOfSuggestions the given number of suggestions
 * @returns list of suggestions
 */
export const GetSuggestions = (
  term: string,
  choices: Array<string>,
  numberOfSuggestions: number
): Array<string> => {
  if (numberOfSuggestions < 1) {
    return [];
  }

  const choice_differences = [];
  for (let choice of choices) {
    const score = getDifferenceScore(choice, term);
    choice_differences.push({
      choice,
      difference: score,
    });
  }

  choice_differences.sort(
    (a, b) =>
      a.difference > b.difference // Les différences de a et b sont différentes
        ? 1 // b est placé avant a
        : a.difference < b.difference
        ? -1 // a est placé avant b
        : a.choice.length > b.choice.length // Les diffénrences de a et b sont égales et leurs tailles sont différentes
        ? 1 // b est placé avant a
        : a.choice.length < b.choice.length
        ? -1 // a est placé avant b
        : a.choice.localeCompare(b.choice) // Les diffénrences et les tailles de a et b sont égales => a et b sont placés selon l'ordre alphabétique
  );

  return choice_differences
    .filter((element) => element.difference < term.length)
    .slice(0, numberOfSuggestions)
    .map((element) => element.choice);
};

/**
 *
 * @param choice one of the given choices
 * @param term the given searched term
 * @returns difference score of the given choice
 */

const getDifferenceScore = (choice: string, term: string): number => {
  let start;
  let difference = term.length;

  for (let index = 0; index < term.length; index++) {
    let flag = false;
    while ((start = choice.indexOf(term[index])) !== -1) {
      flag = true;
      choice = choice.substring(start + 1, choice.length);
      if (choice.length < term.length - (index + 1)) {
        continue;
      }

      let new_difference = 0;
      for (
        let i = 0, j = index + 1;
        i < choice.length && j < term.length;
        i++, j++
      ) {
        if (choice[i] != term[j]) new_difference++;
      }

      difference = difference > new_difference ? new_difference : difference;
    }
    if (flag || choice.length < term.length) break;
  }
  return difference;
};
