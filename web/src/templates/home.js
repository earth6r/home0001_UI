import React, { useRef, useState } from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";
import PortableText from "../components/portableText";
import { PageLink } from "../components/link";
import GridRow from "../components/grid/grid-row";
import { RichTable } from "../components/global/richTable";
import Figure from "../components/Figure";
import { Header } from "../components/global/header";
import  DepositBlock  from "../components/DepositBlock";
import PaymentContext from "../lib/payment-context";
import MembershipPrice from "../components/global/membershipPrice";
import CheckoutCreate from "../components/checkout-create";
import { loadStripe } from "@stripe/stripe-js";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
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
  query HomeQuery($id: String!) {
 
    page: sanityHome(id: { eq: $id }) {
      _rawContent(resolveReferences: { maxDepth: 20 })
      _rawSpecSheet(resolveReferences: { maxDepth: 10 })
      _rawUnits(resolveReferences: { maxDepth: 10 })
      _rawHomeModules(resolveReferences: { maxDepth: 10 })
      unitsSubtitle
      unitsTitle
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
  }
`;
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);
const Unavailable = () => (
  <div className="w-full relative z-20 pt-1em pb-1em">
    <p>That unit is currently unavailable. Please select another unit</p>
  </div>
);

const DiscountNotice = ({ discountCode, color, codes }) => {
  
  return (
    <div className="discount-container mb-1">
      <div className="">$100 USD</div>
      
    </div>
    );

};

const ValueAdded = ({ discount,whatsIncluded, depositCounter, codes, discountCode, unitTitle, color }) => {
const [showRefund, setShowRefund] = useState(0);
const handleRefund = () => {
  if(showRefund){
    setShowRefund(0) 
  } else{ 
    setShowRefund(1)
  }
}
  return(
  <>
    <h1 className="membership-deposit mb-2">Hold your spot.
    <br />
    </h1>
  
    <div id='spots-remaining-count'>
   <span> Spots remaining:</span> {depositCounter}
    </div>




      <Accordion className="max-w-2xl my-20 w-full deposit-accordion" allowToggle allowMultiple>
  
              <AccordionItem

              defaultIsOpen={false}
              className="border-none relative block accordion max-w-2xl"
            >
              {({ isExpanded }) => (
                <>
                  <AccordionHeader className=" relative py-6 border-none">
                    <h2 className="m-0 -mt-1/4em md:mt-0">{"What's included?"}</h2>
                    <div
                      
                      className="accordion-icon right-0 absolute pr-1em"
                    >
                      {isExpanded ? 
                       <span id='thin-minus'></span>
                        : 
                        <svg width="22" height="21" viewBox="0 0 22 21" fill="none">
                        <path d="M10.7243 0V10.5M10.7243 21V10.5M10.7243 10.5H21.1322M10.7243 10.5H0.316406" stroke="white"/>
                        </svg>
                      }
                    </div>
                  </AccordionHeader>
                  <AccordionPanel className="pb-1em">
                    <PortableText blocks={whatsIncluded} />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
        </Accordion>




 <div id='deposit-text-span'>
   <span> Membership Deposit:</span> <DiscountNotice codes={codes} color={color} discountCode={discountCode} />
    </div>

     <div className="mb-8" id='refundable-text-span'>
        Fully refundable any time, for any reason. <span onClick={handleRefund} id='question-trigger'>?</span>
    </div>
    {unitTitle &&
      <p className="mb-0">Reserve unit {unitTitle}</p>
    }
    <p>


  </p>
  {showRefund ?
     <>
        <div className="refund-popup rounded-md  w-full md:max-w-md fixed md:display-block py-4 md:m-auto px-8 bg-white">  
          <button onClick={handleRefund} aria-label="Close" type="button" className="refund-close">
          <svg viewBox="0 0 24 24" focusable="false" role="presentation" aria-hidden="true"><path fill="currentColor" d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"></path></svg></button>
          <div className="mb-0 pt-0">
            <p className="text-black">If you change your mind for any reason, just email us and we'll refund your deposit within 14 days of your request, no questions asked. </p>
          </div>
        </div>
        <div className="refund-popup-overlay" onClick={handleRefund}></div>
        </>


  : ""}
  </>
)};

const CheckoutOptions = ({ /*ssr, */ children }) => {
  // if (ssr) return null;
  return <>{children}</>;
};

const CheckoutActions = ({ unit, children }) => {
  if (unit && unit.sold) return <Unavailable />;
  return <>{children}</>;
};

const CheckoutDescription = ({ unit,whatsIncluded, depositCounter, codes, modules, children,color, discount, discountCode }) => {
  const [head, ...rest] = modules;
 
  if (unit) {

    return (
      <>
        <div className="flex flex-wrap w-full standard-text">
          {RenderModules([head])}

          <div className="w-full relative z-20" style={{ marginLeft: "-.04em" }}>
            
            <ValueAdded whatsIncluded={whatsIncluded} depositCounter={depositCounter} codes={codes} color={color} unitTitle={unit.title} discount={discount} discountCode={discountCode} />
            
          </div>
          
        </div>
        
        {children}
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap w-full standard-text">
        {RenderModules([head])}

        <div className="w-full relative z-20" style={{ marginLeft: "-.04em" }}>
   
          <ValueAdded whatsIncluded={whatsIncluded} depositCounter={depositCounter} codes={codes} discount={discount} color={color} discountCode={discountCode} />
        </div>
        
      </div>
      
      {children}
    </>
  );
};

const CheckoutModules = ({ unit, modules, children, discount, discountCode }) => {
  const [head, ...rest] = modules;

  if (unit) {
    return (
      <>
        <div className="flex flex-wrap w-full standard-text">
          {RenderModules(rest)}
        </div>
        {children}
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap w-full standard-text">
        

       

      </div>
      {children}
    </>
  );
};
const HomeTemplate = (props) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef();
  const { data, errors } = props;
 
  let bitPayID = process.env.GATSBY_BITPAY_MEMBERSHIP_ID_REGULAR_PRICE;
  let bitPayIDDiscounted = process.env.GATSBY_BITPAY_MEMBERSHIP_ID_DISCOUNTED;
  const page = data && data.page;
  const {
    main: { modules, slug, title },
    meta,
  } = page._rawContent;
  const homeModules = page._rawHomeModules;
  const specs = page._rawSpecSheet;
  const units = page._rawUnits;
  const unitsTitle = page.unitsTitle;
  const unitsSubtitle = page.unitsSubtitle;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  return (
    <Layout blackFooter={false} showPopupNewsletter={true} isHome={slug.current}>
      <SEO
        title={title}
      />
      <Container className="flex flex-col">
        <div className="flex flex-wrap w-full ">{RenderModules(modules, specs)}</div>
        <>{unitsTitle && unitsSubtitle && <Header title={unitsTitle} number={unitsSubtitle} />}</>

        <Accordion allowMultiple={false} className="max-w-4xl w-full">
          {units &&
            units.map((item) => {
              return (
                <React.Fragment key={item._key}>
                  <AccordionItem
                    defaultIsOpen={false}
                    className={`${
                      item.sold == 1 ? "pointer-events-none" : ""
                    } border-none relative block box accordion accordion-home rounded-md mb-1em`}
                  >
                    {({ isExpanded }) => (
                      <>
                        <AccordionHeader
                          style={{ paddingTop: "0.35em" }}
                          className={`${item.sold == 1 ? "opacity-25" : ""} ${
                            isExpanded ? "text-black" : "text-black"
                          } relative flex h-2em  pl-1/2em border-none`}
                        >
                          {item.unit && (
                            <span className="w-1/4 text-left m-0 text-mobileNav md:mt-0 md:pt-0 homes-accordion-header-main">
                              <span>Type </span>
                              {item.unit}
                            </span>
                          )}
                          {item.bedrooms && (
                            <span className="w-1/6 text-left ft m-0  text-mobileNav md:text-base  md:mt-1 md:pt-0 homes-accordion-header-small">
                              {item.bedrooms}
                            </span>
                          )}
                          {item.price && (
                            <span 
                            style={{ paddingTop: "0.4em" }}
                            className="w-1/2 text-left text-mobileNav md:text-base m-0  md:mt-1 md:pt-0 homes-accordion-header-small">
                              {item.price}
                            </span>
                          )}
                          {/* {item.sold == 1 ? (
                            <span className="w-1/6 text-left md:left-0 md:relative text-mobileNav md:text-base md:mt-1 md:pt-0 homes-accordion-header-small">
                              Sold
                            </span>
                          ) : (
                            <span className="w-1/4 text-left md:left-0 md:relative text-mobileNav md:text-base -mt-1/4em md:mt-1 md:pt-0 homes-accordion-header-small">
                              Coming Soon
                            </span>
                          )} */}

                          {!item.sold && (
                            <div
                              style={{ marginTop: "-0.1em" }}
                              className="right-0 absolute pr-3 md:pr-1em md:mt-1 homes-accordion-header-plus"
                            >
                              {isExpanded ? "–" : "+"}
                            </div>
                          )}
                        </AccordionHeader>
                        <AccordionPanel className="pb-1em">
                          <div>
                            {item.text && (
                              <div className="md:inline-block big-text align-top text-desktopCaptionSpecial md:w-4/12">
                                <PortableText blocks={item.text} />
                              </div>
                            )}
                            {item.floorPlan && (
                              <div className={`${item.floorPlanMobile ? "hidden" : "inline-block"} mb-0 mt-8 md:mt-0 text-left md:text-right floor-plan md:inline-block md:w-8/12`}>
                                <Figure className="" node={item.floorPlan} />

                              </div>
                            )}
                            {item.floorPlanMobile && (
                              <div className="mb-0 mt-8 md:mt-0 text-left md:text-right floor-plan inline-block md:hidden md:w-8/12">
                                <Figure className="" node={item.floorPlanMobile} />

                              </div>
                            )}
                            {item.floorPlanCaption && (
                              <div className="mb-1em text-left md:text-right px-2 floor-plan-cap text-desktopCaptionSpecial mt-0">
                                <PortableText blocks={item.floorPlanCaption} />
                              </div>
                            )}
                            {item.sold !== 1 && (
                              <PageLink
                                className="box mt-2em box-black rounded-md w-full block text-center leading-none h-2em flex items-center justify-center text-mobileBody md:text-desktopBody "
                                to={`/checkout/membership`}
                              >
                                Hold your spot
                              </PageLink>
                            )}
                          </div>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                </React.Fragment>
              );
            })}
        </Accordion>

        {homeModules && (
          <div className="pt-1em flex flex-wrap w-full">
            <GridRow />
            {RenderModules(homeModules, specs)}
          </div>
        )}
      </Container>
      <DepositBlock></DepositBlock>
    </Layout>
  );
};

export default HomeTemplate;
