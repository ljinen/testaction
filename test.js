const { chromium } = require('playwright');
const cheerio = require('cheerio');
const got = require('hooman');

(async () => {
	const { body } = await got('https://techblog.willshouse.com/2012/01/03/most-common-user-agents/');
	const $ = cheerio.load(body);
	const userAgents = $('tbody .useragent')
    .map(function () {
      return $(this).text()
    })
    .get();	
	let num = userAgents.length;
    //await console.log("共有" + num + "个UA" );	
	let UAnum = Math.round(Math.random()*num);
	let row = "row-" + UAnum;
	//await console.log(row);
	await console.log(userAgents[UAnum]);
	
	const browser = await chromium.launch();
	const context = await browser.newContext({
		userAgent: userAgents[UAnum]
	});
	const page = await context.newPage();
	await page.goto("https://khazrakh.blogspot.com/");
	let isclick = Math.round(Math.random()); 
	if(isclick == 1){
		//console.log("going to click");
		await page.waitForTimeout(5000);
		//await page.frame(url="https://ad.a-ads.com/1618660?size=200x200").click('a');

		await page.mouse.click(900, 335);
		await page.mouse.click(900, 345);
		await page.mouse.click(900, 365);
		console.log("click ad");
		await page.waitForTimeout(10000);
	}	
	await browser.close();
})();
