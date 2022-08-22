const puppeteer = require('puppeteer')

module.exports.countJobCategories = async (url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  // Otherwise opens in a smaller window and these options might not be visible
  // Longer screen to show all categories in screenshot
  page.setViewport({
    width: 1920,
    height: 1920
  })
  await page.goto(url)

  // Inspecting the page we found the element ID which seems to be fixed
  await page.click('#menu-item-19')


  // In this particular page the classes can be used to uniquely identify the job categories
  const items = await page.$$('.row > .col-lg-3.mb-30')

  // Screenshotting and saving
  await page.screenshot({path: 'careers.png'});

  browser.close()
  return items.length
}
