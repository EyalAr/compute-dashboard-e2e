const puppeteer = require('puppeteer');
const mkdirp = require('mkdirp');

const PAGE_WIDTH = process.env.PAGE_WIDTH || 1366;
const PAGE_HEIGHT = process.env.PAGE_HEIGHT || 768;
const APP_URL = process.env.APP_URL || 'http://localhost:8080';
const ARTIFACTS = process.env.ARTIFACTS || '.artifacts';
const USERNAME = process.env.USERNAME || 'demo';
const PASSWORD = process.env.PASSWORD || 'demo';

const browser = puppeteer.launch();
const resetPage = async () => {
  const page = await (await browser).newPage();
  await page.setViewport({
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
  });
  await page.goto(APP_URL);
  await page.evaluate(() => {
    localStorage.clear(); // eslint-disable-line
  });
  await page.reload();
  global.page = page;
};

global.resetPage = resetPage;
global.USERNAME = USERNAME;
global.PASSWORD = PASSWORD;

before(done => mkdirp(ARTIFACTS, done));

after(async () => {
  await (await browser).close();
});

/* eslint-disable */
afterEach(async function() {
  const title = (await this.currentTest.fullTitle()).replace(/ /g, "_");
  const path = `${ARTIFACTS}/${title}.jpg`;
  await page.screenshot({ path });
});
/* eslint-enable */
