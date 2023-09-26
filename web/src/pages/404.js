import React, { useEffect, useState } from "react";
import Layout from "../containers/layout";
import SEO from "../components/seo";

const NotFoundPage = () => {
  const [isRnd, setIsRnd] = useState(undefined);

  useEffect(() => {
    const chunks = window.location.pathname.split("/");
    if (chunks.length > 1 && chunks[1] === "homes") {
      setIsRnd(false);
    } else {
      setIsRnd(true);
    }
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
