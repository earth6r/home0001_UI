import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import CalendlyContact from "../components/CalendlyContact";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";
import DepositBlock from "../components/DepositBlock";

export const query = graphql`
  query PageQuery($id: String!) {
    page: sanityPage(id: { eq: $id }) {
      _rawContent(resolveReferences: { maxDepth: 20 })
      isrnd
    }
  }
`;

const PageTemplate = props => {
  const { data, errors } = props;
  const page = data && data.page;
  const {
    main: { modules, slug, title },
    meta
  } = page._rawContent;
  const isrnd = page.isrnd;

  return (
    <Layout showPopupNewsletter={true} rnd={isrnd}>
      <SEO title={title} />

      {page._rawContent.main.title == "Contact" && !isrnd ? (
        <Container>
          <div className="flex flex-wrap w-full">
            {RenderModules([modules[0], modules[1]])}
            <CalendlyContact />
            {RenderModules(modules.slice(2, modules.length))}
          </div>
        </Container>
      ) : (
        <>
          <Container>
            <div className="flex flex-wrap w-full">{RenderModules(modules)}</div>
          </Container>
          {slug?.current === "homes/how-it-works" && <DepositBlock />}
        </>
      )}
    </Layout>
  );
};

export default PageTemplate;
