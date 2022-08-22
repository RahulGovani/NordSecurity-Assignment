const app = require('./index')
const crawler = require('./crawler')

app.auth().then(response => {
    console.log('Auth Response', response)
}).catch(err => {
    console.log('Err in auth', err.message)
})


crawler.countJobCategories('https://www.tesonet.com').then(count => {
  console.log('Job categories count : ', count)
}).catch(err => {
  console.error('Err in scraping for job categories', err)
})