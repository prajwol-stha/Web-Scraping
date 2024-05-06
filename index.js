const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://en.wikipedia.org/wiki/Coronavirus');
  await page.setViewport({width: 1080, height: 1024});

  await page.screenshot({path:'wiki.png'})

  // // Type into search box
  // await page.type('.devsite-search-field', 'automate beyond recorder');

  // // Wait and click on first result
  // const searchResultSelector = '.devsite-result-item-link';
  // await page.waitForSelector(searchResultSelector);
  // await page.click(searchResultSelector);

  // // Locate the full title with a unique string
  // const textSelector = await page.waitForSelector(
  //   'text/Customize and automate'
  // );
  // const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // // Print the full title
  // console.log('The title of this blog post is "%s".', fullTitle);

  // await browser.waitForTarget(()=>false)
  const result=await page.evaluate(()=>{
    let headings=document.querySelectorAll(".mw-headline")
    const headingList=[...headings]
    return headingList.map(h=>h.innerText)
  })

  console.log(result)
  await browser.close();
})();