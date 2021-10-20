import fs, { link } from "fs";
import cheerio from "cheerio";
import util from "util";

import path from "path";

// Convert fs.readFile into Promise version
const readFile = util.promisify(fs.readFile);

interface IWebBrowser {
  getHtml: (url: string) => Promise<string | null>;
}

/**
 * Returns list of emails provided in HMTL documents in forms <a href="mailto:emails" ...
 * @param browser IWebBrowser exposting getHtml method
 * @param url url of document that will be parsed
 * @param maximumDepth maximum depth of search
 * @returns list of emails
 */
export const GetEmailsInPageAndChildPages = async (
  browser: IWebBrowser,
  url: string,
  maximumDepth: number
): Promise<string[]> => {
  const filePaths = [url];
  const emails: string[] = [];
  let currentDepth = 0;
  let currentFileIndex = 0;

  while (currentFileIndex < filePaths.length && currentDepth <= maximumDepth) {
    const filePath = filePaths[currentFileIndex];
    if (filePath) {
      const links = await getLinks(filePath, browser);
      links.forEach((link) => {
        if (link.includes("mailto")) {
          const email = link.replace("mailto:", "");
          if (!emails.includes(email)) emails.push(email);
        } else {
          const filePath = getAbsoluteFilePath(url, link);
          if (!filePaths.includes(filePath)) filePaths.push(filePath);
        }
      });
      if (links.length) currentDepth++;
    }
    currentFileIndex++;
  }
  return emails;
};

/**
 * Returns list of links that are present in a HTML file in forms <a href="...
 * @param browser IWebBrowser exposting getHtml method
 * @param filePath url of docuemnt that will be parsed
 * @returns list of links
 */
export const getLinks = async (
  filePath: string,
  browser: IWebBrowser
): Promise<string[]> => {
  const data = await browser.getHtml(filePath);
  const links: string[] = [];
  if (data) {
    const $ = cheerio.load(data);
    const linkTags = $("a");
    linkTags.each((_idx, el) => {
      const link: string | undefined = $(el).attr("href");
      if (link) links.push(link);
    });
  }
  return links;
};

/**
 * Returns the html content of a file
 * @param url url path of a file
 * @returns a string : HTML content of files
 */
export const getHtml = async (url: string): Promise<string | null> => {
  try {
    const data = await readFile(url, "utf8");
    return data;
  } catch {
    return null;
  }
};

/**
 * Build the absolute path of a file
 * @param parentFilePath the parent absoulute path
 * @param link the link to the child
 * @returns absolute file path
 */
const getAbsoluteFilePath = (parentFilePath: string, link: string): string => {
  // Vérifier si l'url est Verifie that the URL is based on "/" or "\"
  const slash = parentFilePath.includes("/") ? "/" : "\\";
  const absolutePath = parentFilePath.slice(
    0,
    parentFilePath.lastIndexOf(slash)
  );
  const fileName = link.replace(`.${slash}`, "");
  return path.resolve(absolutePath, fileName);
};
