import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { graphql, Link } from "gatsby";
import Container from "../components/container";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";
import CheckoutCreate from "../components/checkout-create";
import GridRow from "../components/grid/grid-row";
import PortableText from "../components/portableText";
import DepositBlock from "../components/DepositBlock";
import PaymentContext from "../lib/payment-context";
import Figure from "../components/Figure";
import MembershipPrice from "../components/global/membershipPrice";
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
  useDisclosure
} from "@chakra-ui/core";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

export const query = graphql`
  query CheckoutAndHomes($id: String!) {
    checkout: sanityCheckout(id: { eq: $id }) {
      _rawGdpr(resolveReferences: { maxDepth: 10 })
      _rawContent(resolveReferences: { maxDepth: 20 })
    }
    strikeColor: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      strikeColor
    }
    depositCounter: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      depositCounter
    }
    whatsIncluded: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
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
    depositBlockImage: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      depositBlockImage {
        _key
        _rawAsset
        _rawCrop
        _rawHotspot
        _type
        asset {
          assetId
          url
          _id
        }
        crop {
          bottom
          left
          right
          top
        }
        hotspot {
          height
          width
          x
          y
        }
      }
    }
    discountCodes: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      discountCodes
    }
    homes: allSanityHome {
      edges {
        node {
          units {
            stripeSKU
            sold
            text {
              _rawChildren
            }
            title
            bedrooms
            bitPayID
            bitPayIDDiscounted
            price
            _rawFloorPlan
            _rawFloorPlanCaption
            _rawText
            _type
            _key
          }
          unitsSubtitle
          unitsTitle
        }
      }
    }
  }
`;

const Unavailable = () => (
  <div className="w-full relative z-20 pt-1em pb-1em">
    <p>That unit is currently unavailable. Please select another unit</p>
  </div>
);

const DiscountNotice = ({ discountCode, color, codes }) => {
  let hasCode = false;
  let discount = false;

  if (typeof window != `undefined`) {
    discount = window.location.href.split("discount=")[1];
  }

  for (var i = codes.length - 1; i >= 0; i--) {
    if (discount == codes[i]) {
      hasCode = true;
    }
  }
  if (discountCode !== "balaji" && !hasCode)
    return (
      <div className="discount-container mb-1 mt-1">
        <div className="">$100 USD</div>
      </div>
    );
  return (
    <div className="discount-container mb-1">
      <div className="">$100 USD</div>
    </div>
  );
};

const ValueAdded = ({
  discount,
  whatsIncluded,
  depositCounter,
  codes,
  discountCode,
  unitTitle,
  color
}) => {
  const [showRefund, setShowRefund] = useState(0);
  const handleRefund = () => {
    if (showRefund) {
      setShowRefund(0);
    } else {
      setShowRefund(1);
    }
  };
  return (
    <>
      <h1 className="membership-deposit mb-2">
        Hold your spot.
        <br />
      </h1>

      <div id="spots-remaining-count">
        <span> Spots remaining:</span> {depositCounter}
      </div>

      <Accordion className="max-w-2xl my-20 w-full deposit-accordion" allowToggle allowMultiple>
        <AccordionItem
          defaultIsOpen={false}
          className="border-none relative block accordion max-w-2xl"
        >
          {({ isExpanded }) => (
            <>
              <AccordionHeader className=" relative h-2em  py-6 md:pt-1/4em border-none">
                <h2 className="m-0 -mt-1/4em md:mt-0">{"What's included?"}</h2>
                <div className="accordion-icon right-0 absolute pr-1em">
                  {isExpanded ? (
                    <span id="thin-minus"></span>
                  ) : (
                    <svg width="22" height="21" viewBox="0 0 22 21" fill="none">
                      <path
                        d="M10.7243 0V10.5M10.7243 21V10.5M10.7243 10.5H21.1322M10.7243 10.5H0.316406"
                        stroke="white"
                      />
                    </svg>
                  )}
                </div>
              </AccordionHeader>
              <AccordionPanel className="pb-1em">
                <PortableText blocks={whatsIncluded} />
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>

      <div id="deposit-text-span">
        <span> Membership Deposit:</span>{" "}
        <DiscountNotice codes={codes} color={color} discountCode={discountCode} />
      </div>

      <div className="mb-8" id="refundable-text-span">
        Fully refundable any time, for any reason.{" "}
        <span onClick={handleRefund} id="question-trigger">
          ?
        </span>
      </div>
      {unitTitle && <p className="mb-0">Reserve unit {unitTitle}</p>}
      <p></p>
      {showRefund ? (
        <div className="rounded-lg p-5 white-bg absolute" id="refund-message">
          <span
            className="absolute inline-block right-0 mr-1"
            onClick={handleRefund}
            id="close-refund"
          >
            <svg width="22" height="21" viewBox="0 0 22 21" fill="none">
              <path
                d="M10.7243 0V10.5M10.7243 21V10.5M10.7243 10.5H21.1322M10.7243 10.5H0.316406"
                stroke="white"
              />
            </svg>
          </span>
          <p className="text-black">
            If you change your mind for any reason, just email us and we'll refund your deposit
            within 14 days of your request, no questions asked.{" "}
          </p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const CheckoutOptions = ({ /*ssr, */ children }) => {
  // if (ssr) return null;
  return <>{children}</>;
};

const CheckoutActions = ({ unit, children }) => {
  if (unit && unit.sold) return <Unavailable />;
  return <>{children}</>;
};

const CheckoutDescription = ({
  unit,
  codes,
  depositCounter,
  whatsIncluded,
  modules,
  children,
  color,
  discount,
  discountCode
}) => {
  const [head, ...rest] = modules;

  if (unit) {
    return (
      <>
        <div className="flex flex-wrap w-full standard-text">
          {RenderModules([head])}

          <div className="w-full relative z-20" style={{ marginLeft: "-.04em" }}>
            <ValueAdded
              whatsIncluded={whatsIncluded}
              depositCounter={depositCounter}
              codes={codes}
              color={color}
              unitTitle={unit.title}
              discount={discount}
              discountCode={discountCode}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap w-full standard-text">
        {RenderModules([head])}

        <div className="w-full relative z-20" style={{ marginLeft: "-.04em" }}>
          <ValueAdded
            whatsIncluded={whatsIncluded}
            depositCounter={depositCounter}
            codes={codes}
            discount={discount}
            color={color}
            discountCode={discountCode}
          />
        </div>
      </div>
    </>
  );
};

const CheckoutModules = ({ unit, modules, children, discount, discountCode }) => {
  const [head, ...rest] = modules;

  if (unit) {
    return (
      <>
        <div className="flex flex-wrap w-full standard-text"></div>
        {children}
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap w-full standard-text"></div>
      {children}
    </>
  );
};

const CheckoutTemplate = props => {
  const { data, errors } = props;
  const page = data && data.checkout;
  const color = data.strikeColor.strikeColor;
  const whatsIncluded = data.whatsIncluded.whatsIncluded;
  const depositCounter = data.depositCounter.depositCounter;
  const depositBlockImage = data.depositBlockImage.depositBlockImage;
  const discountCodes = data.discountCodes.discountCodes;
  const ssr = typeof window === "undefined";
  const {
    main: { modules, slug },
    meta
  } = page._rawContent;
  const { _rawGdpr } = data.checkout;

  let home;
  let unit;
  let sku;
  let bitPayID;
  let bitPayIDDiscounted;

  if (!ssr) {
    const searchParams = new URLSearchParams(window.location.search);

    sku = searchParams.get("sku");
    bitPayID = searchParams.get("bitPayID");

    const homes = (data.homes.edges || []).map(({ node }) => node);

    if (sku) {
      // Select the requested unit based on query string params,
      // since routes aren't set up for specific units. If there is
      // no unit, or the unit is unavailable, the checkout renders
      // the default membership item
      home = homes.find(({ units }) => {
        unit = units.find(unit => unit.stripeSKU === sku);
        return unit;
      });

      bitPayIDDiscounted = unit.bitPayIDDiscounted;
    }

    // Set default membership item
    if (!sku || !home || !unit) {
      sku = "MEMB001";
      bitPayID = process.env.GATSBY_BITPAY_MEMBERSHIP_ID_REGULAR_PRICE;
      bitPayIDDiscounted = process.env.GATSBY_BITPAY_MEMBERSHIP_ID_DISCOUNTED;
    }
  }

  return (
    <Layout blackHeader={false} blackFooter={false} showPopupNewsletter={false} isCheckout={true}>
      <SEO
        title={"Home0001 Membership"}
        description={"Join the Home0001 collective"}
        keywords={["Home0001", "Membership"]}
      />
      <DepositBlock depositPage={true}></DepositBlock>
    </Layout>
  );
};

export default CheckoutTemplate;
