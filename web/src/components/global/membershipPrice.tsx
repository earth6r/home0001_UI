import React from "react";

const MembershipPrice = ({ discount }) =>
  discount ? (
    <>
      <s>$300</s> $200
    </>
  ) : (
    <>$300</>
  );

export default MembershipPrice;
