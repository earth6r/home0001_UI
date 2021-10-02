import React, { useRef, useState } from "react";
import { StaticQuery, graphql } from "gatsby";
import Container from "./container";
import GraphQLErrorList from "./graphql-error-list";
import SEO from "./seo";
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";
import PortableText from "./portableText";
import { PageLink } from "./link";
import GridRow from "./grid/grid-row";
import { RichTable } from "./global/richTable";
import Figure from "./Figure";
import { Header } from "./global/header";
import PaymentContext from "../lib/payment-context";
import MembershipPrice from "./global/membershipPrice";
import CheckoutCreate from "./checkout-create";
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

export const query = graphql`
  query DepositQuery {
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
    <div className="discount-container">
      <div className=""> $100 USD / 0.002 BTC / 0.03 ETH</div>
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
    <div id='spots-remaining-count' class="pt-0">
      {depositCounter}
    </div>


    <Accordion className="max-w-2xl my-8 w-full deposit-accordion" allowToggle allowMultiple>
      <AccordionItem
      defaultIsOpen={false}
      className="border-none relative block accordion max-w-2xl">
        {({ isExpanded }) => (
          <>
            <AccordionHeader className=" relative py-6 border-none">
              <div className="m-0 -mt-1/4em md:mt-0">{"What's included?"}</div>
              <div className="accordion-icon right-0 absolute pr-1em pt-5">
                {isExpanded ? 
                  <span id='thin-minus' className="mb-1"></span>
                  : 
                  <svg width="22" height="21" viewBox="0 0 22 21" fill="none">
                  <path d="M10.7243 0V10.5M10.7243 21V10.5M10.7243 10.5H21.1322M10.7243 10.5H0.316406" stroke="black"/>
                  </svg>
                }
              </div>
            </AccordionHeader>
            <AccordionPanel className="whats-included-accordion pb-1em">
              <PortableText blocks={whatsIncluded} />
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>

    <div id='deposit-text-span' className="leading-7 md:leading-8 xl:leading-9">
      <span> Reservation Deposit:<br/></span> 
      <DiscountNotice codes={codes} color={color} discountCode={discountCode} />
    </div>

    <div className="" id='refundable-text-span'>
        Fully refundable any time, for any reason. <span onClick={handleRefund} id='question-trigger'>?</span>
    </div>

    {unitTitle &&
      <p className="mb-0">Reserve unit {unitTitle}</p>
    }
    <p></p>

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
      : <div></div>}
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

const DepositBlock = (props) => {
	const {depositPage} = props
  return(
    <StaticQuery
      query={query}
      render={data => {
      	  let sku = "MEMB001";
		  const whatsIncluded = data.whatsIncluded.whatsIncluded
		  const depositCounter = data.depositCounter.depositCounter
		  const depositBlockImage = data.depositBlockImage.depositBlockImage
		  let bitPayID = process.env.GATSBY_BITPAY_MEMBERSHIP_ID_REGULAR_PRICE;
		  let bitPayIDDiscounted = process.env.GATSBY_BITPAY_MEMBERSHIP_ID_DISCOUNTED;
      	return(
         <Container className={`md:pl-20 home-deposit-module ${depositPage ? "" : " pb-4 px-2 mt-8 md:mb-0 home-deposit-module-scroll"}`}>
	        <div className="max-w-2xl md:inline-block md:mt-12 md:w-4/6 lg:w-3/6">
	        {depositPage &&
	        	<div className="pt-8"></div>
	        }
	        <CheckoutOptions>
	          <CheckoutActions unit={null}>
	            <PaymentContext.Consumer>
	              {({ discount, discountCode }) => {
	                return (
                    <>
                      <CheckoutDescription
                        unit={null}
                        color={null}
                        codes={null}
                        whatsIncluded={whatsIncluded}
                        depositCounter={depositCounter}
                        modules={[0]}
                        discount={null}
                        discountCode={null}
                      >
                        

                      </CheckoutDescription>
                      <CheckoutCreate
                          home={null}
                          unit={null}
                          sku={sku}
                          bitPayID={bitPayID}
                          discount={null}
                          codes={null}
                          discountCode={null}
                          stripePromise={stripePromise}
                        />
                      <CheckoutModules
                        unit={null}
                        modules={[0]}
                        discount={null}
                        discountCode={null}
                      >
                        

                      </CheckoutModules>

                    </>
	                )
	              }}
	            </PaymentContext.Consumer>
	          </CheckoutActions>
	        </CheckoutOptions>
	        </div>
	        <div className="w-3/6 max-w-3xl pl-2 mt-6 align-top hidden lg:inline-block relative">
            <Figure node={depositBlockImage}/>
          </div>
	      </Container>
      	)}}
      />
)


};

export default DepositBlock;
