// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// document schemas
import author from './documents/author'
import category from './documents/category'
import page from './documents/page'
import post from './documents/post'
import blockContent from './blockContent'
import blockText from './blockText'
import partner from './documents/partner'
import siteSettings from './documents/siteSettings'

//static pages
import landing from './documents/landing'
import home from './documents/home'
// import homes from './documents/homes'
// import howItWorks from './documents/howItWorks'
import checkout from './documents/checkout'
import about from './documents/about'
import rnd from './documents/rnd'
// import viewHomes from './documents/viewHomes'

// Object types
import bodyPortableText from './objects/bodyPortableText'
import bioPortableText from './objects/bioPortableText'
import imagePortableText from './objects/imagePortableText'
import listPortableText from './objects/listPortableText'
import excerptPortableText from './objects/excerptPortableText'
import mainImage from './objects/mainImage'
import flexImage from './objects/flexImage'
import flexEmbed from './objects/flexEmbed'
import flexPdf from './objects/flexPdf'
import authorReference from './objects/authorReference'
import partnerReference from './objects/partnerReference'
import header from './objects/header'
import circleButton from './objects/circleButton'
import flexCircle from './objects/flexCircle'
import specButton from './objects/specButton'
import richTableCell from './objects/cell'
import richTableRow from './objects/row'
import homeUnit from './objects/homeUnit'
import pane from './objects/pane'

// Modules
import accordion from './modules/accordion'
import article from './modules/article'
import articleItem from './modules/articleItem'
import accordionItem from './modules/accordionItem'
import externalLink from './modules/externalLink'
import internalLink from './modules/internalLink'
import metaCard from './modules/metaCard'
import postCategory from './modules/postCategory'
import social from './modules/social'
import nestedPages from './modules/nestedPages'
import pageItem from './modules/pageItem'
import pageModule from './modules/pageModule'
import imageModule from './modules/imageModule'
import standardText from './modules/standardText'
import moduleContent from './modules/moduleContent'
import paneContent from './modules/paneContent'
import gallery from './modules/gallery'
import flexGallery from './modules/flexGallery'
import richTable from './modules/tableModule'

// Tabs
import globalContent from './tabs/globalContent'
import pageContent from './tabs/pageContent'

// Content Types
import menus from './types/menus'

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
    page,
    //static pages
    landing,
    home,
    about,
    homeUnit,
    checkout,
    // homes,
    // howItWorks,
    // viewHomes,
    //
    accordion,
    accordionItem,
    category,
    author,
    article,
    rnd,
    partner,
    mainImage,
    flexImage,
    flexEmbed,
    flexPdf,
    authorReference,
    partnerReference,
    bodyPortableText,
    bioPortableText,
    imagePortableText,
    excerptPortableText,
    listPortableText,
    pageItem,
    pageContent,
    globalContent,
    externalLink,
    internalLink,
    pageModule,
    nestedPages,
    social,
    pane,
    paneContent,
    standardText,
    imageModule,
    moduleContent,
    gallery,
    flexGallery,
    articleItem,
    metaCard,
    blockContent,
    blockText,
    header,
    circleButton,
    flexCircle,
    specButton,
    postCategory,
    menus,
    richTable,
    richTableRow,
    richTableCell,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ]),
})
