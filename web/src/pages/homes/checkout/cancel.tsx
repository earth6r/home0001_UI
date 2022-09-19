import * as React from "react";
import { Link } from "gatsby";
import Container from "../../../components/container";
import SEO from "../../../components/seo";
import Layout from "../../../containers/layout";

export default () =>{

    if(typeof window != `undefined`){
    	//window.location.href = '/homes/checkout/membership'
    }

return (
  <Layout>
    <SEO title={"error"} description={"error"} keywords={[]} />
    <Container>
      <div className="standard-text">
        <h1>Your payment was cancelled.</h1>
        <p>
          If you'd like to start the checkout process over again,{" "}
          <Link to="/homes/checkout/membership">click here</Link> to return to the checkout page.
        </p>
      </div>
    </Container>
  </Layout>
)}
