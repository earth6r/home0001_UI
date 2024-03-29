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
import cities from './documents/cities'
// static pages
import landing from './documents/landing'
import home from './documents/home'
// import homes from './documents/homes'
import howItWorks from './documents/howItWorks'
import checkout from './documents/checkout'
// import about from './documents/about'
import rnd from './documents/rnd'
// import viewHomes from './documents/viewHomes'

// Object types
import bodyPortableText from './objects/bodyPortableText'
import bioPortableText from './objects/bioPortableText'
import imagePortableText from './objects/imagePortableText'
import listPortableText from './objects/listPortableText'
import excerptPortableText from './objects/excerptPortableText'
import articleImage from './objects/articleImage'
import mainImage from './objects/mainImage'
import flexImage from './objects/flexImage'
import flexEdgetoEdge from './objects/flexEdgetoEdge'
import flexEmbed from './objects/flexEmbed'
import flexCallibration from './objects/flexCallibration'
import flexSquare from './objects/flexSquare'
import flexText from './objects/flexText'
import flexVerticalText from './objects/flexVerticalText'
import flexPdf from './objects/flexPdf'
import flexObround from './objects/flexObround'
import authorReference from './objects/authorReference'
import partnerReference from './objects/partnerReference'
import header from './objects/header'
import circleButton from './objects/circleButton'
import rdObroundButton from './objects/rdObroundButton'
import flexCircle from './objects/flexCircle'
import specButton from './objects/specButton'
import richTableCell from './objects/cell'
import richTableRow from './objects/row'
import homeUnit from './objects/homeUnit'
import pane from './objects/pane'
import viewSpacer from './objects/viewSpacer'
import newRow from './objects/newRow'
import newCell from './objects/newCell'
import imageWithFile from './objects/imageWithFile'
import reserveHomeForm from './objects/reserveHomeForm'

// Modules
import accordion from './modules/accordion'
import article from './modules/article'
import articleItem from './modules/articleItem'
import articleSection from './modules/articleSection'
import accordionItem from './modules/accordionItem'
import externalLink from './modules/externalLink'
import heroRnd from './modules/heroRnd'
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
import rowLinkTable from './modules/rowLinkTable'
import columnHeaderTable from './modules/columnHeaderTable'
import liveVideo from './modules/liveVideo'

// Tabs
import globalContent from './tabs/globalContent'
import pageContent from './tabs/pageContent'

// Content Types
import menus from './types/menus'
import property from './documents/property'
import propertyType from './documents/propertyType'
import homePage from './documents/homePage'
import map from './objects/map'
import simpleText from './objects/simpleText'
import aboutPage from './documents/aboutPage'
import inventoryModule from './modules/inventoryModule'
import inventoryRow from './objects/inventoryRow'
import inventoryCell from './objects/inventoryCell'
import legalPage from './documents/legalPage'
import newsLetter from './documents/newsLetter'
import newsLetterForm from './objects/newsLetterForm'
import contactPage from './documents/contactPage'
import faqPage from './documents/faqPage'

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
    // static pages
    landing,
    home,
    // about,
    homeUnit,
    checkout,
    // homes,
    homePage,
    cities,
    property,
    propertyType,
    howItWorks,
    faqPage,
    aboutPage,
    contactPage,
    legalPage,
    newsLetter,
    // viewHomes,
    //
    newsLetterForm,
    accordion,
    accordionItem,
    category,
    author,
    article,
    heroRnd,
    rnd,
    partner,
    articleImage,
    mainImage,
    flexImage,
    flexEdgetoEdge,
    flexEmbed,
    flexCallibration,
    flexText,
    flexVerticalText,
    flexSquare,
    flexPdf,
    flexObround,
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
    articleSection,
    metaCard,
    blockContent,
    blockText,
    header,
    circleButton,
    rdObroundButton,
    flexCircle,
    specButton,
    postCategory,
    menus,
    richTable,
    richTableRow,
    richTableCell,
    viewSpacer,

    newCell,
    newRow,
    rowLinkTable,
    columnHeaderTable,
    liveVideo,
    map,
    simpleText,
    inventoryModule,
    inventoryRow,
    inventoryCell,
    imageWithFile,
    reserveHomeForm
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ])
})
