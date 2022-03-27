import express, { Request, Response } from 'express';
import puppeteer from 'puppeteer';

import convertHtmlToPdf from '../functions/convertHtmlToPdf';

const router = express.Router();

/* GET home page. */
router.get('/', function(_req: Request, res: Response) {
  res.send('Server info');
});

router.get('/html-to-pdf', async function(req: Request, res: Response) {
  if (typeof req.body !== 'object') {
    res.status(400);
    res.end();
    return;
  }

  const { html, pdfOptions } = req.body;

  if (typeof html !== 'string' ) {
    res.status(400);
    res.end();
    return;
  }

  const source = Buffer.from(html, 'base64').toString('utf-8');

  let options: puppeteer.PDFOptions = {};
  if (typeof pdfOptions === 'object') {
    options = pdfOptions;
  }

  if (!options.format) {
    options.format = 'a4';
  }

  const puppeteerArgs: puppeteer.LaunchOptions & puppeteer.BrowserLaunchArgumentOptions & puppeteer.BrowserConnectOptions = {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
  };

  if (process.env.NODE_ENV === 'production') {
    const {
      PUPPETEER_CHROME_PATH = 'google-chrome-stable',
    } = process.env;

    puppeteerArgs.executablePath = PUPPETEER_CHROME_PATH;
  }

  const pdf = await convertHtmlToPdf(source, options, puppeteerArgs);

  res.setHeader('Content-Type', 'application/pdf');
  res.send(pdf);

  return;
});

export default router;
