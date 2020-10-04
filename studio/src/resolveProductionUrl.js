export default function resolveProductionUrl(document) {
  // console.log(document.content.main)
  return `http://localhost:8000/${document.content.main.slug.current}`
}

const sanityClient = require('@sanity/client')
const clientForPreview = sanityClient({
  projectId: 'm8l686jf',
  dataset: 'production',
  useCdn: false,
  withCredentials: true,
})

// skc1iSoaBZj7yye5DLuSCy4hJBaFlf5dwhMvT6aetmlFDaPXkgSyvyeEiCscZcYzGXZzqnvR3rTvSjmFhu9KWVmym3gf1rI6eHZxzHEVd4BGWF2xeUFAGMyHL2YegB2VnvdOHJJuP9OtIeCuXRd220Af85Ro4XCqqyEi6JxR7LkxAJIV8QGr
