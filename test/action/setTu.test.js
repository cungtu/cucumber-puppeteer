// const puppeteer = require("puppeteer");
// const GoLogin = require("gologin");
import puppeteer from 'puppeteer';
import GoLogin from '../../node_modules/gologin/src/gologin.js';
// F:\IdeaProjects\automation\automation\cucumber-puppeteer\node_modules
const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

(async () => {

    // const GL = new GoLogin({
    //     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDE5ZTIwYTUwNjY2Yzc1YTdlYzZkMDkiLCJ0eXBlIjoiZGV2Iiwiand0aWQiOiI2NDE5ZTI5ZDAzNzZmODFlZjM1MGRhNTgifQ.XjTlWLaSsQn2McYlyQvTr5pTsbnM8P8q_bytPD4LUds',
    //     profile_id: '6419e25f5068f337b0d0063b',
    // });
    //
    // const { status, wsUrl } = await GL.start().catch((e) => {
    //     console.trace(e);
    //
    //     return { status: 'failure' };
    // });
    //
    // if (status !== 'success') {
    //     console.log('Invalid status');
    //
    //     return;
    // }

    // const browser = await puppeteer.launch({
    //     headless: false,
    //     defaultViewport: false,
    //     userDataDir: "./tmp",
    //     browserWSEndpoint: wsUrl.toString(),
    //     ignoreHTTPSErrors: true,
    // });

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp",
    });

    while(true)
    {
        const page = await browser.newPage();
        await page.goto(
            "https://www.pinksale.finance/launchpad/0xe46Fe6fc5DED769f56d1300D9fD18c2166153Ab2?chain=DogeChain"
        );

        await page.waitForSelector('.mr-4.is-size-5');
        const productsHandles = await page.$$(
            'div.is-flex.mt-1.mb-2 > div> .mr-4.is-size-5'
        );

        for (const producthandle of productsHandles) {
            try {
                const urlSocialPage = await page.evaluate(el => el.href, producthandle);
                const socialPage = await browser.newPage();
                await socialPage.goto(urlSocialPage);
                await sleep(3000);
                await socialPage.close();
            } catch (error) {
                console.log(error)
            }
        }
        // cuộn chuột
        for (let i = 0; i < 4; i++) {
            //header title
            await page.waitForSelector('.media-content');
            await page.$eval('.media-content', el => el.scrollIntoView());
            await page.waitForTimeout(2300);

            await page.waitForSelector('.table-container.mt-0');
            await page.$eval('.table-container.mt-0', el => el.scrollIntoView());
            await page.waitForTimeout(2300);

            await page.waitForSelector('.ant-card-bordered'[1]);
            await page.$eval('.ant-card-bordered'[1], el => el.scrollIntoView());
            await page.waitForTimeout(2300);

            await page.waitForSelector('canvas');
            await page.$eval('canvas', el => el.scrollIntoView());
            await page.waitForTimeout(2300);

        }
        await page.close();
        // await browser.close();
    }
})();



