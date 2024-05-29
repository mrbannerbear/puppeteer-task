import puppeteer from "puppeteer-core";
import { executablePath } from "puppeteer-core";

(async () => {
  const browser = await puppeteer.launch({
    executablePath: executablePath("chrome"),
  });
  const page = await browser.newPage();

  await page.goto("https://www.google.com/");
  // #APjFqb

  const inputValue = await page.evaluate(() => {
    return document.getElementById("APjFqb").value = "cow";
  });

  await page.type(inputValue)

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Wait and click on first result
  const searchResultSelector = ".devsite-result-item-link";
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    "text/Customize and automate"
  );
  const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
})();
