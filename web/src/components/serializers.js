import React from "react";
import Figure from "./Figure";
import PopoverModule from "./popover-module";
import MapModule from "./mapModule";
import CircleButton from "./global/circleButton";
// import { InternalLink } from "./global/internalLink";
import { PageLink } from "./link";

const serializers = {
  types: {
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    image: ({node}) => {
      return (
        <img src={node.asset.url} className={`${node.fullwidth ? "w-full" : "w-6/12"} my-3`}/>
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
            <span className="earth">E</span>
          )}
        </React.Fragment>
      );
    },
    mainImage: Figure,
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
              <CircleButton title={children} url={mark.reference} color={mark.color}></CircleButton>  
            );
          }else if(mark.reference._type == "checkout"){
            return (
              <CircleButton title={children} url={mark.reference} color={mark.color}></CircleButton> 
            );
          }else{
            return (
              <CircleButton title={children} url={mark.reference} color={mark.color}></CircleButton> 
            );
          }
          
        } else {
          return <></>;
        }
      
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
    partner: ({ mark, children }) => <div>partner</div>,
    internalLink: ({ mark, children }) => {
      
      if (mark) {
        
        if (mark.reference && mark.reference.content) {
          if(mark.reference._type == "home"){
            return (
            <PageLink
              title={mark.reference.content.main.title}
              to={`/home/${mark.reference.content.main.slug.current}`}
            >
              {children}
            </PageLink>
          );
          }else if(mark.reference._type == "checkout"){
            return (
            <PageLink
              title={mark.reference.content.main.title}
              to={`/checkout/${mark.reference.content.main.slug.current}`}
            >
              {children}
            </PageLink>
          );
          }else{
            return (
            <PageLink
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
      } else {
        return <></>;
      }
    },
  },
};

export default serializers;
