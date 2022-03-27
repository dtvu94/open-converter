import puppeteer from 'puppeteer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const convertHtmlToPdf = async (html: string, options: puppeteer.PDFOptions = {}, puppeteerArgs = {}) => {
  let browser;

  if (puppeteerArgs) {
    browser = await puppeteer.launch(puppeteerArgs);
  } else {
    browser = await puppeteer.launch();
  }

  const page = await browser.newPage();

  if (!options) {
    options = { format: 'letter' };
  }

  await page.setContent(html);

  const pdf = await page.pdf(options);

  await browser.close();

  return pdf;
};

export default convertHtmlToPdf;
