import { GetSuggestions } from "../Test1/suggestions";

describe("Testing get suggestions from List of choices for a given term", () => {
  beforeAll(() => {
    console.log("This test will be run on the term 'gros' ");
  });
  test("It should return no suggestions with number of suggestions: 0", async () => {
    const suggestions = GetSuggestions(
      "gros",
      ["gros", "gris", "graisse", "gras", "aggressif", "go", "ros", "gro"],
      0
    );
    expect(suggestions.length).toBe(0);
  });
  test("It should return no suggestions with number of suggestions: -1", async () => {
    const suggestions = GetSuggestions(
      "gros",
      ["gros", "gris", "graisse", "gras", "aggressif", "go", "ros", "gro"],
      -1
    );
    expect(suggestions.length).toBe(0);
  });
  test("It should return 1 suggestion with number of suggestions: 1", async () => {
    const suggestions = GetSuggestions(
      "gros",
      ["gros", "gris", "graisse", "gras", "aggressif", "go", "ros", "gro"],
      1
    );
    expect(suggestions.length).toBe(1);
    expect(suggestions).toEqual(["gros"]);
  });
  test("It should return 2 suggestion with number of suggestions: 2", async () => {
    const suggestions = GetSuggestions(
      "gros",
      ["gros", "gris", "graisse", "gras", "aggressif", "go", "ros", "gro"],
      2
    );
    expect(suggestions.length).toBe(2);
    expect(suggestions).toEqual(["gros", "gras"]);
  });
  test("It should return 3 suggestion with number of suggestions: 3", async () => {
    const suggestions = GetSuggestions(
      "gros",
      ["gros", "gris", "graisse", "gras", "aggressif", "go", "ros", "gro"],
      3
    );
    expect(suggestions.length).toBe(3);
    expect(suggestions).toEqual(["gros", "gras", "gris"]);
  });
  test("It should return 4 suggestion with number of suggestions: 4", async () => {
    const suggestions = GetSuggestions(
      "gros",
      ["gros", "gris", "graisse", "gras", "aggressif", "go", "ros", "gro"],
      4
    );
    expect(suggestions.length).toBe(4);
    expect(suggestions).toEqual(["gros", "gras", "gris", "aggressif"]);
  });
  test("It should return no suggestions with number of suggestions: 2", async () => {
    const suggestions = GetSuggestions("gros", ["go", "ros", "gro"], 2);
    expect(suggestions.length).toBe(0);
  });
});
