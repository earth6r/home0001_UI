import S from '@sanity/desk-tool/structure-builder'
import {
  MdDescription,
  MdHome,
  MdLocalOffer,
  MdSettings,
  MdPublic,
  MdPeople,
  MdFolder
} from 'react-icons/md'
import IframePreview from '../previews/IframePreview'

// Web preview configuration
const remoteURL = ''
const localURL = 'http://localhost:8000'
const previewURL = window.location.hostname === 'localhost' ? localURL : remoteURL

export const getDefaultDocumentNode = props => {
  /**
   * Here you can define fallback views for document types without
   * a structure definition for the document node. If you want different
   * fallbacks for different types, or document values (e.g. if there is a slug present)
   * you can set up that logic in here too.
   * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
   */
  const {schemaType} = props
  if (schemaType === 'post') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(IframePreview)
        .title('Web preview')
        .options({previewURL})
    ])
  }
  if (schemaType === 'page') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(IframePreview)
        .title('Web preview')
        .options({previewURL})
    ])
  }
  return S.document().views([S.view.form()])
}

/**
 * This defines how documents are grouped and listed out in the Studio.
 * Relevant documentation:
 * - https://www.sanity.io/guides/getting-started-with-structure-builder
 * - https://www.sanity.io/docs/structure-builder-introduction
 * - https://www.sanity.io/docs/structure-builder-typical-use-cases
 * - https://www.sanity.io/docs/structure-builder-reference
 */

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      S.listItem()
        .title('Home')
        .child(
          S.editor()
            .id('homePage')
            .schemaType('homePage')
            .documentId('homePage')
        ),
      S.listItem()
        .title('Cities')
        .schemaType('cities')
        .child(S.documentTypeList('cities').title('Cities')),
      S.listItem()
        .title('Properties')
        .schemaType('property')
        .child(S.documentTypeList('property').title('Properties')),
      S.listItem()
        .title('Property Types')
        .schemaType('propertyType')
        .child(S.documentTypeList('propertyType').title('Property Types')),
      S.divider(),
      S.listItem()
        .title('How It Works')
        .child(
          S.editor()
            .id('howItWorksPage')
            .schemaType('howItWorksPage')
            .documentId('howItWorksPage')
        ),
      S.listItem()
        .title('FAQ')
        .child(
          S.editor()
            .id('faqPage')
            .schemaType('faqPage')
            .documentId('faqPage')
        ),
      S.listItem()
        .title('About')
        .child(
          S.editor()
            .id('aboutPage')
            .schemaType('aboutPage')
            .documentId('aboutPage')
        ),
      S.listItem()
        .title('Contact')
        .child(
          S.editor()
            .id('contactPage')
            .schemaType('contactPage')
            .documentId('contactPage')
        ),
      S.listItem()
        .title('Newsletter')
        .child(
          S.editor()
            .id('newsLetter')
            .schemaType('newsLetter')
            .documentId('newsLetter')
        ),
      S.listItem()
        .title('Legal')
        .child(
          S.editor()
            .id('legalPage')
            .schemaType('legalPage')
            .documentId('legalPage')
        ),
      S.divider(),
      S.listItem()
        .title('Menus')
        .child(
          S.documentTypeList('menus')
            .title('Menus')
            .filter('_type == $type')
            .params({type: 'menus'})
        ),
      S.divider(),
      S.listItem()
        .title('Blog posts')
        .icon(MdDescription)
        .schemaType('post')
        .child(S.documentTypeList('post').title('Blog posts')),
      S.divider(),
      // S.listItem()
      //   .title('Landing')
      //   .icon(MdDashboard)
      //   .child(S.editor().id('landing').schemaType('landing').documentId('landing')),
      // S.divider(),
      // S.listItem()
      //   .title('View Homes')
      //   .icon(MdSettings)
      //   .child(S.editor().id('homes').schemaType('homes').documentId('homes')),
      S.listItem()
        .title('Homes')
        .icon(MdHome)
        .schemaType('home')
        .child(S.documentTypeList('home').title('Home')),
      S.divider(),
      // S.listItem()
      //   .title('How It Works')
      //   .icon(MdInfoOutline)
      //   .child(S.editor().id('howItWorks').schemaType('howItWorks').documentId('howItWorks')),
      // S.divider(),
      S.listItem()
        .title('Checkouts')
        .icon(MdFolder)
        .schemaType('checkout')
        .child(S.documentTypeList('checkout').title('Checkouts')),
      // S.listItem()
      //   .title('Checkout')
      //   .icon(MdPayment)
      //   .child(S.editor().id('checkout').schemaType('checkout').documentId('checkout')),
      S.divider(),
      S.listItem()
        .title('R & D')
        .icon(MdPublic)
        .child(
          S.editor()
            .id('rnd')
            .schemaType('rnd')
            .documentId('rnd')
        ),

      // S.listItem()
      //   .title('Artists')
      //   .icon(MdPerson)
      //   .schemaType('artist')
      //   .child(S.documentTypeList('artist').title('Artists')),
      // S.listItem()
      //   .title('Viewing Room')
      //   .icon(MdPerson)
      //   .schemaType('viewingRoom')
      //   .child(S.documentTypeList('viewingRoom').title('Viewing Room')),
      // S.listItem()
      //   .title('Galleries')
      //   .icon(MdPerson)
      //   .schemaType('gallery')
      //   .child(S.documentTypeList('gallery').title('Galleries')),
      // S.listItem()
      //   .title('Exhibitions')
      //   .icon(MdPerson)
      //   .schemaType('exhibition')
      //   .child(S.documentTypeList('exhibition').title('Exhibitions')),
      // S.listItem()
      //   .title('Jobs')
      //   .icon(MdPerson)
      //   .schemaType('job')
      //   .child(S.documentTypeList('job').title('Jobs')),
      // S.listItem()
      //   .title('Fairs')
      //   .icon(MdPerson)
      //   .schemaType('fair')
      //   .child(S.documentTypeList('fair').title('Fairs')),
      // S.divider(),
      S.listItem()
        .title('Categories')
        .icon(MdLocalOffer)
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      S.divider(),
      S.listItem()
        .title('Partners')
        .icon(MdPeople)
        .schemaType('partner')
        .child(S.documentTypeList('partner').title('Partners')),
      S.divider(),
      S.listItem()
        .title('Pages')
        .icon(MdFolder)
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
      // S.divider(),
      // S.listItem()
      //   .title('Staff')
      //   .icon(MdSettings)
      //   .child(S.editor().id('staff').schemaType('staff').documentId('staff')),

      // `S.documentTypeListItems()` returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above.
      ...S.documentTypeListItems().filter(
        listItem =>
          ![
            'category',
            'home',
            'about',
            'checkout',
            'homes',
            'howItWorksPage',
            'partner',
            'page',
            'rnd',
            // 'viewHomes',
            // 'artist',
            // 'gallery',
            // 'author',
            // 'viewingRoom',
            // 'fair',
            // 'exhibition',
            // 'job',
            'menus',
            'post',
            'siteSettings',
            'homePage',
            'cities',
            'property',
            'propertyType',
            'aboutPage',
            'contactPage',
            'legalPage',
            'newsLetter'
            // 'staff',
          ].includes(listItem.getId())
      )
    ])
