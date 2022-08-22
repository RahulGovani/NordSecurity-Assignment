const axios = require("axios")


/**
 * Function to authorize and get token
 * @returns {Object}
 */
module.exports.auth = async () => {
  const { username, password, targetUrl } = await this.getCreds('http://ptsv2.com/t/fu807-1554722621/post')

  // Axios supports basic authentication
  // Basic auth is hitting the url w creds in this format username:password@url
  const { data } = await axios.post(targetUrl, {}, {
    auth: {
      username,
      password
    }
  }).catch(err => {
    console.log('Err in getting info from target URL', err.message || err)
    throw err
  })
  return data
}

/**
 * Function to get data (creds) from given url
 * @param {String} url URL to get the creds from
 * @returns {Object}
 */
module.exports.getCreds = async (url) => {
  const { data } = await axios.get(url).catch(err => {
    console.error('Err while fetching creds', err.message || err)
    throw err
  })
  if (!data.username || !data.password || !data.targetUrl) {
    throw new Error('Missing mandatory params')
  }
  return data
}
