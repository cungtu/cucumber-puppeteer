const checkContainsText = require('../../features/support/check/checkContainsText');
const checkUrl = require('../../features/support/check/checkUrl');
const clickElement = require('../../features/support/action/clickElement');
const openUrl = require('../../features/support/action/openUrl');
const BrowserScope = require('../../features/support/scope/BrowserScope');
// import puppeteer from 'puppeteer-core';
//
// import GoLogin from './cucumber-puppeteer/node_modules/gologin/src/gologin.js';

const testUrl = 'https://www.google.com.vn/?hl=vi';
const browserScope = new BrowserScope();

//


// const { connect } = puppeteer;
//
// (async () => {
//   const GL = new GoLogin({
//     token: 'yU0token',
//     profile_id: 'yU0Pr0f1leiD',
//   });
//
//   const { status, wsUrl } = await GL.start().catch((e) => {
//     console.trace(e);
//
//     return { status: 'failure' };
//   });
//
//   if (status !== 'success') {
//     console.log('Invalid status');
//
//     return;
//   }
//
//   const browser = await connect({
//     browserWSEndpoint: wsUrl.toString(),
//     ignoreHTTPSErrors: true,
//   });
//
//   const page = await browser.newPage();
//   await page.goto('https://myip.link/mini');
//   console.log(await page.content());
//   await browser.close();
//   await GL.stop();
// })();

//

beforeAll(async () => {
  await browserScope.init();
});
afterAll(async () => {
  await browserScope.close();
});

describe('clickElement', () => {

  it('clicks an existing element to trigger javascript', async () => {
    await openUrl.call(browserScope, testUrl);
    await clickElement.call(browserScope, '.gLFyf');
    await writeStringToMemory(browserScope,2,true);
    await checkContainsText.call(browserScope, '.inc', null, '1');
  });

  // it('clicks a link element to update page hash', async () => {
  //   await clickElement.call(browserScope, 'a.hash');
  // });
  //
  // it('clicks a link element to cause a page navigation', async () => {
  //   await clickElement.call(browserScope, 'a.nav', '#cssClass');
  //   await checkUrl.call(browserScope, null, 'http://localhost:8080/checkAttribute.html');
  // });
  //
  // it('clicks a submit button to submit a form', async () => {
  //   await openUrl.call(browserScope, testUrl);
  //   await clickElement.call(browserScope, '[type="submit"]', '.wizard');
  //   await checkUrl.call(browserScope, null, 'http://localhost:8080/checkContainsText.html?listenhere=meow');
  // });
  //
  // it('fails if the element does not exist', async () => {
  //   await expect(clickElement.call(browserScope, '.bueller')).rejects.toThrow('No node found for selector: .bueller');
  // });

}); 