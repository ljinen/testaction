const { chromium } = require('playwright');
(async () => {
	const browser = await chromium.launch();
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto('https://www.ipify.org/');
	let IP = await page.innerText('body > section.about-slide > div.content-in-blocks > div > div.pre-wrapper.self-ipv4-block > pre > code > span:nth-child(5)');
	console.log(IP);
	await browser.close();
})();
