import React, { useState, useEffect }  from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
} from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import PortableText from "../components/portableText";
import SEO from "../components/seo";
import DepositBlock from "../components/DepositBlock"
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";
import PaymentContext from "../lib/payment-context";
import MembershipPrice from "../components/global/membershipPrice";
import CheckoutCreate from "../components/checkout-create";
import { loadStripe } from "@stripe/stripe-js";
import Figure from "../components/Figure";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  AccordionButton,
  Modal,
  Collapse,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/core";
// import { InlineWidget } from "react-calendly";

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query CollectivePageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    depositCounter:  sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      depositCounter 
    }
    whatsIncluded:  sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      whatsIncluded {
        _key
        _rawChildren
        _type
        style
        children {
          _key
          _type
          text
          marks
        }
      }
    }
    depositBlockImage:  sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      depositBlockImage {
        _key
        _rawAsset
        _rawCrop
        _rawHotspot
        _type
        asset{
          assetId
          url
          _id
        }
        crop{
          bottom
          left
          right
          top
        }
        hotspot{
          height
          width
          x
          y
        }
      }
    }
    allSanityLanding {
      edges {
        node {
          _rawContent(resolveReferences: { maxDepth: 20 })
        }
      }
    }
  }

`;

// const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);
// const Unavailable = () => (
//   <div className="w-full relative z-20 pt-1em pb-1em">
//     <p>That unit is currently unavailable. Please select another unit</p>
//   </div>
// );

// const DiscountNotice = ({ discountCode, color, codes }) => {
  
//   return (
//     <div className="discount-container mb-1">
//       <div className="">$100 USD</div>
      
//     </div>
//     );

// };

// const ValueAdded = ({ discount,whatsIncluded, depositCounter, codes, discountCode, unitTitle, color }) => {
// const [showRefund, setShowRefund] = useState(0);
// const handleRefund = () => {
//   if(showRefund){
//     setShowRefund(0) 
//   } else{ 
//     setShowRefund(1)
//   }
// }
//   return(
//   <>
//     <h1 className="membership-deposit mb-2">Hold your spot.
//     <br />
//     </h1>
  
//     <div id='spots-remaining-count'>
//    <span> Hold yout spot:</span> {depositCounter}
//     </div>




//       <Accordion className="max-w-2xl my-20 w-full deposit-accordion" allowToggle allowMultiple>
  
//               <AccordionItem

//               defaultIsOpen={false}
//               className="border-none relative block accordion max-w-2xl"
//             >
//               {({ isExpanded }) => (
//                 <>
//                   <AccordionHeader className=" relative py-6 border-none">
//                     <h2 className="m-0 -mt-1/4em md:mt-0">{"What's included?"}</h2>
//                     <div
                      
//                       className="accordion-icon right-0 absolute pr-1em"
//                     >
//                       {isExpanded ? 
//                        <span id='thin-minus'></span>
//                         : 
//                         <svg width="22" height="21" viewBox="0 0 22 21" fill="none">
//                         <path d="M10.7243 0V10.5M10.7243 21V10.5M10.7243 10.5H21.1322M10.7243 10.5H0.316406" stroke="white"/>
//                         </svg>
//                       }
//                     </div>
//                   </AccordionHeader>
//                   <AccordionPanel className="pb-1em">
//                     <PortableText blocks={whatsIncluded} />
//                   </AccordionPanel>
//                 </>
//               )}
//             </AccordionItem>
//         </Accordion>




//  <div id='deposit-text-span'>
//    <span> Membership Deposit:</span> <DiscountNotice codes={codes} color={color} discountCode={discountCode} />
//     </div>

//      <div className="mb-8" id='refundable-text-span'>
//         Fully refundable any time, for any reason. <span onClick={handleRefund} id='question-trigger'>?</span>
//     </div>
//     {unitTitle &&
//       <p className="mb-0">Reserve unit {unitTitle}</p>
//     }
//     <p>


//   </p>
//   {showRefund ?
//      <>
//         <div className="refund-popup rounded-md  w-full md:max-w-md fixed md:display-block py-4 md:m-auto px-8 bg-white">  
//           <button onClick={handleRefund} aria-label="Close" type="button" className="refund-close">
//           <svg viewBox="0 0 24 24" focusable="false" role="presentation" aria-hidden="true"><path fill="currentColor" d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"></path></svg></button>
//           <div className="mb-0 pt-0">
//             <p className="text-black">If you change your mind for any reason, just email us and we'll refund your deposit within 14 days of your request, no questions asked. </p>
//           </div>
//         </div>
//         <div className="refund-popup-overlay" onClick={handleRefund}></div>
//         </>


//   : ""}
//   </>
// )};

// const CheckoutOptions = ({ /*ssr, */ children }) => {
//   // if (ssr) return null;
//   return <>{children}</>;
// };

// const CheckoutActions = ({ unit, children }) => {
//   if (unit && unit.sold) return <Unavailable />;
//   return <>{children}</>;
// };

// const CheckoutDescription = ({ unit,whatsIncluded, depositCounter, codes, modules, children,color, discount, discountCode }) => {
//   const [head, ...rest] = modules;
 
//   if (unit) {

//     return (
//       <>
//         <div className="flex flex-wrap w-full standard-text">
//           {RenderModules([head])}

//           <div className="w-full relative z-20" style={{ marginLeft: "-.04em" }}>
            
//             <ValueAdded whatsIncluded={whatsIncluded} depositCounter={depositCounter} codes={codes} color={color} unitTitle={unit.title} discount={discount} discountCode={discountCode} />
            
//           </div>
          
//         </div>
        
//         {children}
//       </>
//     );
//   }

//   return (
//     <>
//       <div className="flex flex-wrap w-full standard-text">
//         {RenderModules([head])}

//         <div className="w-full relative z-20" style={{ marginLeft: "-.04em" }}>
   
//           <ValueAdded whatsIncluded={whatsIncluded} depositCounter={depositCounter} codes={codes} discount={discount} color={color} discountCode={discountCode} />
//         </div>
        
//       </div>
      
//       {children}
//     </>
//   );
// };

// const CheckoutModules = ({ unit, modules, children, discount, discountCode }) => {
//   const [head, ...rest] = modules;

//   if (unit) {
//     return (
//       <>
//         <div className="flex flex-wrap w-full standard-text">
//           {RenderModules(rest)}
//         </div>
//         {children}
//       </>
//     );
//   }

//   return (
//     <>
//       <div className="flex flex-wrap w-full standard-text">
        

       

//       </div>
//       {children}
//     </>
//   );
// };

const CollectivePage = (props) => {
  const { data, errors } = props;
  let sku = "MEMB001";
  const whatsIncluded = data.whatsIncluded.whatsIncluded
  const depositCounter = data.depositCounter.depositCounter
  const depositBlockImage = data.depositBlockImage.depositBlockImage
  let bitPayID = process.env.GATSBY_BITPAY_MEMBERSHIP_ID_REGULAR_PRICE;
  let bitPayIDDiscounted = process.env.GATSBY_BITPAY_MEMBERSHIP_ID_DISCOUNTED;
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }
  let currentLanding;
  data.allSanityLanding.edges.forEach((landing)=>{
    if(landing.node._rawContent.main.title == "Landing"){
      currentLanding = landing;
    }
  })
  const site = (data || {}).site;
  const {
    main: { modules, slug, title },
    meta,
  } = currentLanding.node._rawContent;

  

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }
  let myTitle = title + " | ";
  if(title == "Landing"){
    myTitle = ""
  }

    
  return (
    <Layout blackHeader={false} blackFooter={false} showPopupNewsletter={true}>
      <SEO
        title={myTitle}
        description={site.description}
        keywords={site.keywords}
        image={meta.openImage}
      />
      <Container className="">
        <div className="flex flex-wrap">{RenderModules(modules)}</div>
      </Container>
      { title == "Landing" &&
        <DepositBlock></DepositBlock>
    }
    </Layout>
  );
};

export default CollectivePage;
