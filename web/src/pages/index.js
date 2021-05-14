import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
} from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";
import PaymentContext from "../lib/payment-context";
import MembershipPrice from "../components/global/membershipPrice";
import CheckoutCreate from "../components/checkout-create";
import { loadStripe } from "@stripe/stripe-js";
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
    allSanityLanding {
      edges {
        node {
          _rawContent(resolveReferences: { maxDepth: 20 })
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
      <div className="">$100</div>
      
    </div>
    );

};

const ValueAdded = ({ discount, codes, discountCode, unitTitle, color }) => {

  return(
  <>
    <h1 className="membership-deposit mb-2">Membership Deposit: {" "}
    <DiscountNotice codes={codes} color={color} discountCode={discountCode} />
    <br />
    </h1>
    {unitTitle &&
      <p className="mb-0">Reserve unit {unitTitle}</p>
    }
    <p>


    Fully refundable any time, for any reason.
  </p>
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

const CheckoutDescription = ({ unit,codes, modules, children,color, discount, discountCode }) => {
  const [head, ...rest] = modules;
 
  if (unit) {

    return (
      <>
        <div className="flex flex-wrap w-full standard-text">
          {RenderModules([head])}

          <div className="w-full relative z-20" style={{ marginLeft: "-.04em" }}>
            
            <ValueAdded codes={codes} color={color} unitTitle={unit.title} discount={discount} discountCode={discountCode} />
            
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
   
          <ValueAdded codes={codes} discount={discount} color={color} discountCode={discountCode} />
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
const CollectivePage = (props) => {
  const { data, errors } = props;
  let sku = "MEMB001";
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
    <Layout blackHeader={false} blackFooter={title == "Landing" ? true : false} showPopupNewsletter={true}>
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
        <Container className="pb-4 mt-8 home-deposit-module home-deposit-module-scroll md:mb-0">
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
                  modules={modules}
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
                  modules={modules}
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

      </Container>
    }
    </Layout>
  );
};

export default CollectivePage;
