import React from "react";
import { graphql } from "gatsby";

import SEO from "../../components/seo";
import Container from "../../components/redesign/Container";
import Layout from "../../containers/layout";

import { StandardText } from "../../components/global/standardText";

export const query = graphql`
  {
    allSanityLegalPage {
      nodes {
        title
        _rawDescription(resolveReferences: { maxDepth: 10 })
      }
    }
  }
`;

const LegalPageRedesign = ({ data }) => {
  const content = data.allSanityLegalPage.nodes[0];

  return (
    <Layout showPopupNewsletter={true} rnd={false} homes>
      <SEO title={content?.title ?? "Legal"} />
      <Container>
        <div className="text-mobile-body md:text-desktop-body md:grid md:grid-cols-3 pr-mobile-menu md:pr-desktop-menu mb-10 md:mb-8">
          <div className="md:col-start-2 md:col-span-1 normal-case mb-5">
            THE SOURCE OF THE DISPLAYED DATA IS EITHER THE PROPERTY OWNER OR PUBLIC RECORD PROVIDED
            BY NON-GOVERNMENTAL THIRD PARTIES. IT IS BELIEVED TO BE RELIABLE BUT NOT GUARANTEED.
            THIS INFORMATION IS PROVIDED EXCLUSIVELY FOR CONSUMERS' PERSONAL, NON-COMMERCIAL USE.
            <p className="text-sm mt-5 mb-5">
              651 N. BROAD ST., SUITE 201, MIDDLETOWN, DE, 19709 ©2023 NEW EELAM, INC DBA EARTH. ALL
              MATERIAL PRESENTED HEREIN IS INTENDED FOR INFORMATION PURPOSES ONLY. WHILE, THIS
              INFORMATION IS BELIEVED TO BE CORRECT, IT IS REPRESENTED SUBJECT TO ERRORS, OMISSIONS,
              CHANGES OR WITHDRAWAL WITHOUT NOTIVE. ALL PROPERTY INFORMATION, INCLUDING, BUT NOT
              LIMITED TO SQUARE FOOTAGE, ROOM COUNT, NUMBER OF BEDROOMS AND THE SCHOOL DISTRICT IN
              PROPERTY LISTINGS SHOULD BE VERIFIED BY YOUR OWN ATTORNEY, ARCHITECT OR ZONING EXPORT.
              EQUAL HOUSING OPPORTUNITY. CalBRE#XXXXXX.
            </p>
            EARTH COMMITMENT TO FAIR HOUSING LAWS, STANDARD OPERATING PROCEDURES, AND REASONABLE
            ACCOMMODATIONS.
          </div>
          <div className="md:col-start-2 md:col-span-1">
            <StandardText data={content._rawDescription} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default LegalPageRedesign;
