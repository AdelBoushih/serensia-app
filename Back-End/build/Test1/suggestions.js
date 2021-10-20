"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSuggestions = void 0;
/**
 *
 * @param term the given searched term
 * @param choices list of the given choices
 * @param numberOfSuggestions the given number of suggestions
 * @returns list of suggestions
 */
var GetSuggestions = function (term, choices, numberOfSuggestions) {
    if (numberOfSuggestions < 1) {
        return [];
    }
    var choice_differences = [];
    for (var _i = 0, choices_1 = choices; _i < choices_1.length; _i++) {
        var choice = choices_1[_i];
        var score = getDifferenceScore(choice, term);
        choice_differences.push({
            choice: choice,
            difference: score,
        });
    }
    choice_differences.sort(function (a, b) {
        return a.difference > b.difference // Les différences de a et b sont différentes
            ? 1 // b est placé avant a
            : a.difference < b.difference
                ? -1 // a est placé avant b
                : a.choice.length > b.choice.length // Les diffénrences de a et b sont égales et leurs tailles sont différentes
                    ? 1 // b est placé avant a
                    : a.choice.length < b.choice.length
                        ? -1 // a est placé avant b
                        : a.choice.localeCompare(b.choice);
    } // Les diffénrences et les tailles de a et b sont égales => a et b sont placés selon l'ordre alphabétique
    );
    return choice_differences
        .filter(function (element) { return element.difference < term.length; })
        .slice(0, numberOfSuggestions)
        .map(function (element) { return element.choice; });
};
exports.GetSuggestions = GetSuggestions;
/**
 *
 * @param choice one of the given choices
 * @param term the given searched term
 * @returns difference score of the given choice
 */
var getDifferenceScore = function (choice, term) {
    var start;
    var difference = term.length;
    for (var index = 0; index < term.length; index++) {
        var flag = 0;
        while ((start = choice.indexOf(term[index])) !== -1) {
            choice = choice.substring(start + 1, choice.length);
            if (choice.length < term.length - (index + 1)) {
                continue;
            }
            var new_difference = 0;
            for (var i = 0, j = index + 1; i < choice.length && j < term.length; i++, j++) {
                if (choice[i] != term[j])
                    new_difference++;
            }
            difference = difference > new_difference ? new_difference : difference;
            flag++;
        }
        if (flag || (!flag && choice.length < term.length))
            break;
    }
    return difference;
};
