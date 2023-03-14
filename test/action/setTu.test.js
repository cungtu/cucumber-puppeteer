const checkElementValue = require('../../features/support/check/checkElementValue');
const setElementValue = require('../../features/support/action/setElementValue');
const openUrl = require('../../features/support/action/openUrl');
const BrowserScope = require('../../features/support/scope/BrowserScope');
const clickElement = require("../../features/support/action/clickElement");
const keyboardPress = require("../../features/support/action/keyboardPress");
const checkContainsText = require("../../features/support/check/checkContainsText");
const waitFor = require("../../features/support/action/waitFor");
const waitForSelector = require("../../features/support/action/waitForSelector");
const checkElementVisible = require("../../features/support/check/checkElementVisible");
const checkElementExists = require("../../features/support/check/checkElementExists");

const testUrl = 'https://www.pinksale.finance/launchpad/0xe46Fe6fc5DED769f56d1300D9fD18c2166153Ab2?chain=DogeChain';
const browserScope = new BrowserScope();

const fs = require("fs");
const puppeteer = require("puppeteer");

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

describe('Automation tăng view ', () => {

  it('Vào trang và cuộn chuột', async () => {
      const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp",
      });

      const page = await browser.newPage();
      await page.goto(testUrl);

      let isBtnDisabled = false;
      while (!isBtnDisabled) {
        await page.waitForSelector("title mr-2");
        const productsHandles = await page.$$(
            "div.is-flex.mt-1.mb-2 > .mr-4 is-size-5"
        );

        for (const producthandle of productsHandles) {
          let title = "Null";
          let price = "Null";
          let img = "Null";

          try {
            title = await page.evaluate(
                (el) => el.querySelector("h2 > a > span").href,
                producthandle
            );
          } catch (error) {}

          try {
            price = await page.evaluate(
                (el) => el.querySelector(".a-price > .a-offscreen").textContent,
                producthandle
            );
          } catch (error) {}

          try {
            img = await page.evaluate(
                (el) => el.querySelector(".s-image").getAttribute("src"),
                producthandle
            );
          } catch (error) {}
          if (title !== "Null") {
            fs.appendFile(
                "results.csv",
                `${title.replace(/,/g, ".")},${price},${img}\n`,
                function (err) {
                  if (err) throw err;
                }
            );
          }
        }

        await page.waitForSelector("li.a-last", { visible: true });
        const is_disabled = (await page.$("li.a-disabled.a-last")) !== null;

        isBtnDisabled = is_disabled;
        if (!is_disabled) {
          await Promise.all([
            page.click("li.a-last"),
            page.waitForNavigation({ waitUntil: "networkidle2" }),
          ]);
        }
      }

      await browser.close();
    })();

    // await checkElementExists.call(browserScope, '.ant-list-item');
    // await checkElementVisible.call(browserScope, 'li.ant-list-item', null, '5');
    // await clickElement.call(browserScope, 'div.HorizontalPoolList_root__jacCz > div > div > div > div > div > ul > li > a > button.ant-btn.ant-btn-primary');
    //   await checkElementVisible( 'li.ant-list-item', null, 5);
      // await keyboardPress("Enter", "button.ant-btn.ant-btn-primary",)


    // await setElementValue.call(browserScope, 'input.ant-input', '80s');
    // await checkElementValue.call(browserScope, 'input.ant-input', null, '80s');
    // await waitForSelector.call(browserScope, 'input.ant-input', 2);
    //href="/launchpad/0xe46Fe6fc5DED769f56d1300D9fD18c2166153Ab2?chain=DogeChain"
    // const response = await openUrl.call(browserScope, 'https://www.pinksale.finance/launchpad/0xe46Fe6fc5DED769f56d1300D9fD18c2166153Ab2?chain=DogeChain');
    // expect(browserScope.page).not.toBe(null);
    // expect(response.status()).toBe(200);
    // expect(response.url()).toBe('https://www.pinksale.finance/launchpad/0xe46Fe6fc5DED769f56d1300D9fD18c2166153Ab2?chain=DogeChain');

}); 