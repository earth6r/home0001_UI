module.exports = {
  sanity: {
    projectId: process.env.GATSBY_SANITY_PROJECT_ID || 'dsk3cuzk',
    dataset: process.env.GATSBY_SANITY_DATASET //decided it would be better to throw build errors than connect to the wrong dataset
  }
}
