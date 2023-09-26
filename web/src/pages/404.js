import React, { useEffect, useState } from "react";
import Layout from "../containers/layout";
import SEO from "../components/seo";

const NotFoundPage = () => {
  useEffect(() => {
    const chunks = window.location.pathname.split("/");
  }, []);

  return (
    <>
      {isRnd === undefined ? null : (
        <Layout rnd={false}>
          <SEO title="404: Not found" />
          <p className="mt-24">You just hit a page that isn&#39;t real.</p>
        </Layout>
      )}
    </>
  );
};

export default NotFoundPage;
