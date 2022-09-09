import React from "react";
import Figure from "./Figure";
import PopoverModule from "./popover-module";
import CurrencyTranslator from "./currencyTranslator";
import MapModule from "./mapModule";
import CircleButton from "./global/circleButton";
// import { InternalLink } from "./global/internalLink";
import { PageLink } from "./link";
import PdfReader from "./global/pdfReader";

import ReactHtmlParser from "react-html-parser";
import ContactModal from './contactModal';

const serializers = {
  types: {
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    image: ({node}) => {
      return (
        <>
        <div className={`${node.fullwidth ? "w-full" : "w-6/12"} my-3 inline-block`}><Figure node={node} altText={node.alt} /></div>
        <span className="block image-caption normal-case text-mobileCaption md:text-desktopCaption relative">{node.captionText}</span>
        </>
        )
    },
    priceBreakdownLine: ({node}) => {
      return (
        <div className={`${node.border ? "border-price" : ""} price-breakdown-line`}>
        <span className="w-price inline-block price-before relative">{node.left}</span>
        <span className="w-price-1 inline-block text-right relative">{node.right}</span>
        </div>
        )
    },
    iframe: ({node}) => {
      return (
        <>
        <div className="internal-iframe">
          {ReactHtmlParser(node.iframeCode)}
        </div>
        <span className="block image-caption normal-case text-mobileCaption md:text-desktopCaption relative">{node.iframeCaption}</span>
        </>
        )
    },
    pdf: ({node}) => {
      
     
          return(
          <>
           <PdfReader file={node.asset.url} />
        <span className="block image-caption normal-case text-mobileCaption md:text-desktopCaption relative">{node.iframeCaption}</span>
        </>
          )
      
      
    },
    partnerReference: ({ node }) => {

      return (
        <React.Fragment>
          {node.partner.name && node.partner.name !== "Earth" ? (
            <PopoverModule
              logo={node.partner.logo}
              text={node.partner.name}
              content={node.partner.bio}
            />
          ) : (
            <span className="earth-svg m-0 mr-1">
{/* <svg className="m-0" viewBox="0 0 45 11" fill="none">
<path d="M0 0H7.4747V1.25196H1.52952V4.65937H7.2752V5.91134H1.52952V9.68014H7.621V10.9321H0V0Z" fill="black"/>
<path d="M12.4756 0H14.4574L18.7799 10.9321H17.1174L15.8672 7.67957H11.0259L9.78899 10.9321H8.12646L12.4756 0ZM15.415 6.45342L13.4465 1.29068L11.4914 6.45342H15.415Z" fill="black"/>
<path d="M19.897 0H24.5653C26.9993 0 28.3027 1.07127 28.3027 2.86532C28.3027 4.67228 27.0658 5.33053 26.454 5.43378C27.4648 5.61448 28.2362 6.15657 28.2362 7.52469V9.21549C28.2362 9.77048 28.316 10.3255 28.9012 10.9321H27.1589C26.7333 10.4416 26.6801 9.89955 26.6801 9.40909V7.76992C26.6801 6.47924 25.9486 6.15657 24.7116 6.15657H21.4132V10.9192H19.897V0ZM24.6185 4.9046C26.5338 4.9046 26.7599 3.5881 26.7599 2.95567C26.7599 1.94893 26.0949 1.25196 24.5121 1.25196H21.4132V4.9046H24.6185Z" fill="black"/>
<path d="M32.8912 1.25196H29.3135V0H38.0251V1.25196H34.434V10.9321H32.8912V1.25196Z" fill="black"/>
<path d="M44.8217 10.9321H43.2523V5.89843H37.2539V4.64646H43.2523V0H44.8217V10.9321Z" fill="black"/>
</svg> */}
                      </span>
          )}
        </React.Fragment>
      );
    },
    mainImage: Figure,
    articleImage: ({node}) => (
      <div className="article-section-image">
        {node.caption ? (
          <span className="article-image-caption">{node.caption}</span>
        ) : null}
        <Figure node={node} />
      </div>
    )
  },
  marks: {
    image: ({mark,children}) => {
      return(
        <img className="my-3" src={mark.asset.url} />
        )
    },
    buttonLink: ({ mark, children }) => {
      return (
        <button className="box-menu">
          <a href={mark.href}>{children}</a>
        </button>
      );
    },
    circleLink: ({ mark, children }) => {

        if (mark.reference) {
          if(mark.reference._type == "home"){
            return (
              <CircleButton linkHome={mark.homeLink} linkRnd={mark.rndLink} linkHome={mark.homeLink} linkRnd={mark.rndLink} title={children} url={mark.reference} color={mark.color}></CircleButton>  
            );
          }else if(mark.reference._type == "checkout"){
            return (
              <CircleButton linkHome={mark.homeLink} linkRnd={mark.rndLink} title={children} url={mark.reference} color={mark.color}></CircleButton> 
            );
          }else{
            return (
              <CircleButton linkHome={mark.homeLink} linkRnd={mark.rndLink} title={children} url={mark.reference} color={mark.color}></CircleButton> 
            );
          }
          
        }else if(mark.homeLink || mark.rndLink){
          return (
              <CircleButton linkHome={mark.homeLink} linkRnd={mark.rndLink} title={children} url={mark.reference} color={mark.color}></CircleButton> 
            );
        } else {
          return <></>;
        }
      
    },
    currencyTranslatorUSDBTC:({ mark }) => {
      return (
        <CurrencyTranslator
          currencyFrom={'usd'}
          currencyTo={'btc'}
          amountUSD={mark.amountUSD}
          decimalPlaces={mark.decimalPlaces}
        />
      )
    },
    currencyTranslatorUSDETH:({ mark }) => {
      return (
        <CurrencyTranslator
          currencyFrom={'usd'}
          currencyTo={'eth'}
          amountUSD={mark.amountUSD}
          decimalPlaces={mark.decimalPlaces}
        />
      )
    },
    mapLink:({ mark, children }) => {
      return (
           <MapModule
              text={children}
              lat={mark.lat}
              long={mark.long}
            />
      )
    },
    contactPopup:({ mark, children }) => {
      return (
        <>
          <ContactModal
            title={mark.title}
            subtitle={mark.subtitle}
          >
            {children}
          </ContactModal>
        </>
      )
    },
    partner: ({ mark, children }) => <div>partner</div>,
    internalLink: ({ mark, children }) => {
      
      if (mark) {
        
        if (mark.reference && mark.reference.content) {
          if(mark.reference._type == "home"){
            return (
            <PageLink
              className="internal-link"
              title={mark.reference.content.main.title}
              to={`/home/${mark.reference.content.main.slug.current}`}
            >
              {children}
            </PageLink>
          );
          }else if(mark.reference._type == "checkout"){
            return (
            <PageLink
              className="internal-link"
              title={mark.reference.content.main.title}
              to={`/checkout/${mark.reference.content.main.slug.current}`}
            >
              {children}
            </PageLink>
          );
          }else{
            return (
            <PageLink
              className="internal-link"
              title={mark.reference.content.main.title}
              to={`/${mark.reference.content.main.slug.current}`}
            >
              {children}
            </PageLink>
          );
          }
          
        } else {
          return <></>;
        }
      } else if(mark.homeLink){
        return (
            <PageLink
              className="internal-link"
              title=""
              to={`/collective`}
            >
              {children}
            </PageLink>
          );
      }else if(mark.rndLink){
        return (
            <PageLink
              className="internal-link"
              title=""
              to={`/`}
            >
              {children}
            </PageLink>
          );
      }else {
        return <></>;
      }
    },
  },
};

export default serializers;
