import { GetEmailsInPageAndChildPages, getHtml } from "../Test2/emails";
import path from "path";

const browser = { getHtml };

describe("Testing get emails from HTML files", () => {
  beforeAll(() => {
    console.log("This test will be run on this tree");
    console.log("All the files contain mailto:nullepart@mozilla.org email");
    console.log(
      "index.html ([mailto:nullepart@mozilla.org])\n|--child1.html ([mailto:ailleurs@mozilla.org])\n|----child2.html ([mailto:loin@mozilla.org])\n|------child3.html ([mailto:tres-loin@mozilla.org])"
    );
  });
  test("It should return 1 email with depth: 0", async () => {
    const emails = await GetEmailsInPageAndChildPages(
      browser,
      path.resolve(__dirname, "../Test2/html-files/index.html"),
      0
    );
    expect(emails.length).toBe(1);
    expect(emails.sort()).toEqual(["nullepart@mozilla.org"].sort());
  });
  test("It should return 2 emails with depth: 1", async () => {
    const emails = await GetEmailsInPageAndChildPages(
      browser,
      path.resolve(__dirname, "../Test2/html-files/index.html"),
      1
    );
    expect(emails.length).toBe(2);
    expect(emails.sort()).toEqual(
      ["nullepart@mozilla.org", "ailleurs@mozilla.org"].sort()
    );
  });
  test("It should return 3 emails with depth: 2", async () => {
    const emails = await GetEmailsInPageAndChildPages(
      browser,
      path.resolve(__dirname, "../Test2/html-files/index.html"),
      2
    );
    expect(emails.length).toBe(3);
    expect(emails.sort()).toEqual(
      [
        "nullepart@mozilla.org",
        "ailleurs@mozilla.org",
        "loin@mozilla.org",
      ].sort()
    );
  });

  test("It should return 4 emails with depth: 3", async () => {
    const emails = await GetEmailsInPageAndChildPages(
      browser,
      path.resolve(__dirname, "../Test2/html-files/index.html"),
      3
    );
    expect(emails.length).toBe(4);
    expect(emails.sort()).toEqual(
      [
        "nullepart@mozilla.org",
        "ailleurs@mozilla.org",
        "loin@mozilla.org",
        "tres-loin@mozilla.org",
      ].sort()
    );
  });

  test("It should return no emails with depth: -1", async () => {
    const emails = await GetEmailsInPageAndChildPages(
      browser,
      path.resolve(__dirname, "../Test2/html-files/index.html"),
      -1
    );
    expect(emails.length).toBe(0);
  });
  test("It should return no emails with wrong path", async () => {
    const emails = await GetEmailsInPageAndChildPages(
      browser,
      "no-file.html",
      2
    );
    expect(emails.length).toBe(0);
  });
});
