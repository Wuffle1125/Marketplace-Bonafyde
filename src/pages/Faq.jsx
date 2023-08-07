import React, { useEffect, useState } from "react";
import CommonSection from "../components/ui/Common-section/CommonSection";

const Faq = () => {
  return (
    <div>
      <CommonSection title={"FAQ"} />
      <section>
        <div
          style={{
            fontSize: "30px",
            color: "white",
          }}
        >
          FAQ
        </div>
      </section>
    </div>
  );
};

export default Faq;
