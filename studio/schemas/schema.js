// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// document schemas
import author from './documents/author'
import artist from './documents/artist'
import category from './documents/category'
import gallery from './documents/gallery'
import exhibition from './documents/exhibition'
import viewingRoom from './documents/viewingRoom'
import fair from './documents/fair'
import job from './documents/job'
import post from './documents/post'
import siteSettings from './documents/siteSettings'
import staff from './documents/staff'

// Object types
import bodyPortableText from './objects/bodyPortableText'
import bioPortableText from './objects/bioPortableText'
import imagePortableText from './objects/imagePortableText'
import listPortableText from './objects/listPortableText'
import excerptPortableText from './objects/excerptPortableText'
import mainImage from './objects/mainImage'
import artworkImage from './objects/artworkImage'
import artistReference from './objects/artistReference'
import authorReference from './objects/authorReference'
import galleryReference from './objects/galleryReference'
import pageItem from './objects/pageItem'
import hoursItem from './objects/hoursItem'
import contactItem from './objects/contactItem'
import exhibitionDetails from './objects/exhibitionDetails'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'blog',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    siteSettings,
    post,
    category,
    artist,
    author,
    job,
    gallery,
    viewingRoom,
    exhibition,
    fair,
    artworkImage,
    mainImage,
    artistReference,
    authorReference,
    galleryReference,
    bodyPortableText,
    bioPortableText,
    imagePortableText,
    excerptPortableText,
    listPortableText,
    pageItem,
    hoursItem,
    contactItem,
    exhibitionDetails,
    staff,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ]),
})
