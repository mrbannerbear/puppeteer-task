import puppeteer from "puppeteer-core";
import { executablePath } from "puppeteer-core";

(async () => {
  const browser = await puppeteer.launch({
    executablePath: executablePath("chrome"),
  });
  const page = await browser.newPage();

  await page.goto("https://www.google.com/");


  const inputValue = await page.evaluate(() => {
    return document.getElementById("APjFqb").value = "javascript";
  });

  await page.type("#APjFqb", inputValue);

  await Promise.all([
    page.waitForNavigation(), 
    page.keyboard.press('Enter'),
  ]);

   const results = await page.evaluate(() => {
    const elements = document.querySelectorAll("div > div > div > div > div > div > div > span > a > h3")
    return Array.from(elements).map(each => each.textContent);
  });


  results.forEach((result) => {
    console.log(`${result}`);
  });

  await browser.close();
})();
